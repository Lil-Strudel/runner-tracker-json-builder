import { z } from "zod";

export const StationReferenceValidator = z.object({
  stationNumber: z.coerce.number(),
  distance: z.coerce.number().optional(),
});
export type StationReference = z.infer<typeof StationReferenceValidator>;

export const RaceValidator = z.object({
  name: z.string(),
  distance: z.coerce.number(),
  stations: z.array(StationReferenceValidator),
});
export type Race = z.infer<typeof RaceValidator>;

export const StationValidator = z.object({
  name: z.string(),
  stationNumber: z.coerce.number(),
  distance: z.coerce.number().optional(),
  stationNumberDisplayed: z.string().optional(),
});
export type Station = z.infer<typeof StationValidator>;

export const ParticipantValidator = z.object({
  bibNumber: z.coerce.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.union([
    z.literal("M<20"),
    z.literal("M20-29"),
    z.literal("M30-39"),
    z.literal("M40-49"),
    z.literal("M50-59"),
    z.literal("M60-69"),
    z.literal("M70-79"),
    z.literal("M80-89"),
    z.literal("F<20"),
    z.literal("F20-29"),
    z.literal("F30-39"),
    z.literal("F40-49"),
    z.literal("F50-59"),
    z.literal("F60-69"),
    z.literal("F70-79"),
    z.literal("F80-89"),
    z.literal(""),
  ]),
  gender: z.union([z.literal("M"), z.literal("F"), z.literal("")]),
  raceName: z.string(),
});
export type Participant = z.infer<typeof ParticipantValidator>;

export const RaceEventValidator = z.object({
  name: z.string(),
  slug: z.string(),
  startDate: z.string(),
  stations: z.array(StationValidator),
  races: z.array(RaceValidator),
  participants: z.array(ParticipantValidator),
});
export type RaceEvent = z.infer<typeof RaceEventValidator>;

export const FormValidator = RaceEventValidator.omit({ startDate: true }).and(
  z.object({
    date: z.date(),
    time: z.string().optional(),
  }),
);

export type FormValues = z.infer<typeof FormValidator>;
