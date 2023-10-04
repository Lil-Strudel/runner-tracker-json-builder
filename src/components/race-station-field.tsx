import React from "react";
import { useFieldArray } from "react-hook-form";
import TextField from "./text-field";
import { Button } from "./ui/button";

interface RaceStationFieldProps {
  name: string;
  control: any;
  register: any;
}
function RaceStationsField({ name, control, register }: RaceStationFieldProps) {
  const stationsField = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <div className="flex gap-4">
        <h1 className="text-2xl">Stations</h1>
        <Button
          type="button"
          onClick={() =>
            stationsField.append({
              name: "",
              stationNumber: stationsField.fields.length,
            })
          }
        >
          Add Station
        </Button>
      </div>
      {stationsField.fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex gap-4">
            <h1 className="text-2xl">Station {index + 1}</h1>
            <Button onClick={() => stationsField.remove(index)}>Delete</Button>
          </div>
          <TextField
            {...register(`${name}.${index}.stationNumber` as const)}
            label="Station Number"
          />
          <TextField
            {...register(`${name}.${index}.distance` as const)}
            label="Distance"
          />
        </div>
      ))}
    </div>
  );
}

export default RaceStationsField;
