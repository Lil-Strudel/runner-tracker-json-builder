import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import TextField from "../fields/text-field";
import RaceStationField from "../fields/race-station-field";

interface RacesProps {
  control: Control<FormValues>;
}
function Races({ control }: RacesProps) {
  const racesField = useFieldArray({
    control,
    name: "races",
  });

  const fields = racesField.fields;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col items-start gap-4 bg-white border p-4 rounded-md"
          >
            <h1 className="text-2xl">Race {index + 1}</h1>
            <div className="grid grid-cols-2 gap-4 w-full">
              <TextField
                name={`races.${index}.name`}
                label="Name"
                placeholder="Name"
              />
              <TextField
                name={`races.${index}.distance`}
                label="Distance"
                placeholder="Distance"
              />
            </div>
            <RaceStationField raceIndex={index} control={control} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center mx-auto w-fit mt-4">
        <Button
          onClick={() => {
            racesField.append({
              name: "",
              distance: "" as unknown as number,
              stations: [],
            });
          }}
        >
          Add Race
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Races;
