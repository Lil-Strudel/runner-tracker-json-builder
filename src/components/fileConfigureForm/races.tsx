import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import TextField from "../fields/text-field";
import RaceStationField from "../fields/race-station-field";
import { cn } from "@/lib/utils";

interface RacesProps {
  control: Control<FormValues>;
}
function Races({ control }: RacesProps) {
  const racesField = useFieldArray({
    control,
    name: "races",
  });

  const fields = racesField.fields;

  const handleDeleteRace = (index: number) => {
    racesField.remove(index);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "flex flex-col items-start gap-4 bg-white border p-4 rounded-md",
              index === fields.length - 1 && "mb-4",
            )}
          >
            <div className="w-full flex justify-between">
              <h1 className="text-2xl">Race {index + 1}</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteRace(index)}
              >
                <Trash2 className="h-4 w-4 opacity-50" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <TextField
                name={`races.${index}.name`}
                label="Name"
                placeholder="Name"
              />
              <TextField
                name={`races.${index}.distance`}
                label="Distance (miles)"
                placeholder="Distance (miles)"
              />
            </div>
            <RaceStationField raceIndex={index} control={control} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center mx-auto w-fit ">
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
