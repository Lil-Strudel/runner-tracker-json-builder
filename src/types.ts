import { z } from "zod";

export const StationValidator = z.object({
  name: z.string().optional(),
  stationNumber: z.coerce.number(),
  stationNumberDisplayed: z.string().optional(),
  distance: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().optional(),
  ),
});
export type Station = z.infer<typeof StationValidator>;

export const RaceValidator = z.object({
  name: z.string().min(1, "Required"),
  distance: z.coerce.number().optional(),
  stations: z.array(StationValidator),
});
export type Race = z.infer<typeof RaceValidator>;

export const EntryValidator = z.object({
  timeIn: z.coerce.date().nullable(),
  timeOut: z.coerce.date().nullable(),
});
export type Entry = z.infer<typeof EntryValidator>;

export const ParticipantValidator = z.object({
  bibNumber: z.coerce.number(),
  age: z.string().optional(),
  dnfReason: z.string().optional(),
  dnfStation: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().optional(),
  ),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  home: z.string().optional(),
  note: z.string().optional(),
  sex: z.union([z.literal("M"), z.literal("F")]).optional(),
  team: z.string().optional(),
  raceName: z.string().optional(),
  entrys: z.record(z.number(), EntryValidator).optional(),
});
export type Participant = z.infer<typeof ParticipantValidator>;

export const CSVParticipantValidator = z.object({
  Bib: z.coerce.number(),
  "First Name": z.string().optional(),
  "Last Name": z.string().optional(),
  Home: z.string().optional(),
  Note: z.string().optional(),
  Team: z.string().optional(),
  "Race Name": z.string().optional(),
  Age: z.coerce.number().optional(),
  Sex: z.union([z.literal("M"), z.literal("F"), z.literal("")]).optional(),
  "Age Group": z.string().optional(),
});
export type CSVParticipant = z.infer<typeof CSVParticipantValidator>;

export const EventValidator = z.object({
  name: z.string().min(1, "Required"),
  slug: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
export type Event = z.infer<typeof EventValidator>;

export const FileValidator = EventValidator.and(
  z.object({
    stations: z.array(StationValidator),
    races: z.array(RaceValidator).optional(),
    participants: z.array(ParticipantValidator),
  }),
);
export type File = z.infer<typeof FileValidator>;

export const FormValidator = FileValidator.and(
  z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
);
export type FormValues = z.infer<typeof FormValidator>;
