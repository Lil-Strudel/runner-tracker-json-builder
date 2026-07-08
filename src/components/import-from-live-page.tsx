import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { saveObjectAsFile } from "@/lib/utils";

function parseInput(input: string): { baseUrl: string; slug: string } {
  try {
    const url = new URL(input);
    const slug = url.pathname.split("/").filter(Boolean).pop() ?? input;
    return { baseUrl: `${url.protocol}//${url.hostname}`, slug };
  } catch {
    return { baseUrl: "https://trackmyracer.live", slug: input.trim() };
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

interface ApiEvent {
  _id: string;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
}

interface ApiStation {
  _id: string;
  name: string;
  stationNumber: number;
  stationNumberDisplayed?: string;
  distance: number;
}

interface ApiRace {
  _id: string;
  name: string;
  stationsPopulated: ApiStation[];
}

interface ApiParticipant {
  _id: string;
  bibNumber: number;
  firstName?: string;
  lastName?: string;
  dnfReason?: string;
  dnfStation?: number | null;
  raceId: string;
}

interface ApiEntry {
  _id: string;
  participantId: string;
  stationId: string;
  timeIn: string | null;
  timeOut: string | null;
}

async function buildOutput(baseUrl: string, slug: string) {
  const event = await fetchJson<ApiEvent>(
    `${baseUrl}/api/v1/events/${slug}`
  );

  const [races, participants, entries] = await Promise.all([
    fetchJson<ApiRace[]>(`${baseUrl}/api/v1/events/${event._id}/races`),
    fetchJson<ApiParticipant[]>(`${baseUrl}/api/v1/events/${event._id}/participants`),
    fetchJson<ApiEntry[]>(`${baseUrl}/api/v1/events/${event._id}/entries`),
  ]);

  // Deduplicate stations by _id, using first occurrence
  const seenStationIds = new Set<string>();
  const deduplicatedStations: ApiStation[] = [];
  for (const race of races) {
    for (const s of race.stationsPopulated) {
      if (!seenStationIds.has(s._id)) {
        seenStationIds.add(s._id);
        deduplicatedStations.push(s);
      }
    }
  }

  const mappedStations = deduplicatedStations.map((s) => ({
    stationNumber: s.stationNumber,
    name: s.name,
    distance: s.distance,
    ...(s.stationNumberDisplayed
      ? { stationNumberDisplayed: s.stationNumberDisplayed }
      : {}),
  }));

  const mappedRaces = races.map((race) => ({
    name: race.name,
    stations: race.stationsPopulated.map((s) => ({
      stationNumber: s.stationNumber,
      name: s.name,
      distance: s.distance,
      ...(s.stationNumberDisplayed
        ? { stationNumberDisplayed: s.stationNumberDisplayed }
        : {}),
    })),
  }));

  // Build raceId → raceName lookup
  const raceNameById: Record<string, string> = {};
  for (const race of races) {
    raceNameById[race._id] = race.name;
  }

  // Build stationId → stationNumber lookup
  const stationNumberById: Record<string, number> = {};
  for (const race of races) {
    for (const s of race.stationsPopulated) {
      stationNumberById[s._id] = s.stationNumber;
    }
  }

  // Group entries by participantId
  const entriesByParticipantId: Record<
    string,
    Record<number, { timeIn: string | null; timeOut: string | null }>
  > = {};
  for (const entry of entries) {
    const stationNumber = stationNumberById[entry.stationId];
    if (stationNumber === undefined) continue;
    if (!entriesByParticipantId[entry.participantId]) {
      entriesByParticipantId[entry.participantId] = {};
    }
    entriesByParticipantId[entry.participantId][stationNumber] = {
      timeIn: entry.timeIn,
      timeOut: entry.timeOut,
    };
  }

  const mappedParticipants = participants.map((p) => ({
    bibNumber: p.bibNumber,
    firstName: p.firstName,
    lastName: p.lastName,
    ...(p.dnfReason ? { dnfReason: p.dnfReason } : {}),
    ...(p.dnfStation != null ? { dnfStation: p.dnfStation } : {}),
    raceName: raceNameById[p.raceId],
    ...(entriesByParticipantId[p._id]
      ? { entrys: entriesByParticipantId[p._id] }
      : {}),
  }));

  return {
    name: event.name,
    slug: event.slug,
    startDate: event.startDate,
    endDate: event.endDate,
    stations: mappedStations,
    races: mappedRaces,
    participants: mappedParticipants,
    entries,
  };
}

function ImportFromLivePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const { baseUrl, slug } = parseInput(input);
      const output = await buildOutput(baseUrl, slug);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      saveObjectAsFile(`${slug}_${timestamp}`, "json", output);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-14 flex flex-col">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="max-w-xl">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl mb-2">
            Import from Live Site
          </h3>
          <p className="text-gray-600 mb-6">
            Enter a slug or full URL to download the event JSON.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SFER26  or  https://trackmyracer.live/events/SFER26"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="self-start px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Fetching…" : "Download JSON"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
              Download started.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ImportFromLivePage;
