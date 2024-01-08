import { z } from "zod";

export const StationReferenceValidator = z.object({
  stationNumber: z.coerce.number(),
  distance: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().optional(),
  ),
});
export type StationReference = z.infer<typeof StationReferenceValidator>;

export const RaceValidator = z.object({
  name: z.string().min(1, "Required"),
  distance: z.coerce.number().optional(),
  stations: z.array(StationReferenceValidator),
});
export type Race = z.infer<typeof RaceValidator>;

export const StationValidator = z.object({
  name: z.string().optional(),
  stationNumber: z.coerce.number(),
  stationNumberDisplayed: z.string().optional(),
  distance: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().optional(),
  ),
  raceId: z.string().optional(),
});
export type Station = z.infer<typeof StationValidator>;

export const ParticipantValidator = z.object({
  age: z.string().optional(),
  bibNumber: z.coerce.number(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  sex: z.union([z.literal("M"), z.literal("F")]).optional(),
  raceName: z.string().optional(),
  home: z.string().optional(),
});
export type Participant = z.infer<typeof ParticipantValidator>;

export const RaceEventValidator = z.object({
  name: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  startDate: z.string().min(1),
  stations: z.array(StationValidator),
  races: z.array(RaceValidator).optional(),
  participants: z.array(ParticipantValidator),
});
export type RaceEvent = z.infer<typeof RaceEventValidator>;

export const FormValidator = RaceEventValidator.omit({ startDate: true }).and(
  z.object({
    date: z.date(),
    time: z.string().min(1, "Required"),
  }),
);

export type FormValues = z.infer<typeof FormValidator>;

export const CSVParticipantValidator = z.object({
  Bib: z.coerce.number(),
  "First Name": z.string(),
  "Last Name": z.string(),
  Age: z.coerce.number(),
  Gender: z.union([z.literal("M"), z.literal("F"), z.literal("")]),
  "Race Name": z.string().optional(),
  home: z.string().optional(),
});
export type CSVParticipant = z.infer<typeof CSVParticipantValidator>;
