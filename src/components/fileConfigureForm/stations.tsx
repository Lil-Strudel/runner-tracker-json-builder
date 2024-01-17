import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import TextField from "../fields/text-field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface StationsProps {
  control: Control<FormValues>;
}
function Stations({ control }: StationsProps) {
  const stationsField = useFieldArray({
    control,
    name: "stations",
  });

  const fields = stationsField.fields;

  const order = useRef(fields.map((_, index) => index));

  const handleDeleteStation = (index: number) => {
    stationsField.remove(index);
  };

  return (
    <div>
      <Alert variant="info">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Leave distance blank if it is different between races
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-4 my-4">
        {fields.map((field, i) => (
          <div key={field.id} className="bg-white rounded-md border w-full p-4">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl sm:text-md">Station {i + 1}</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteStation(i)}
              >
                <Trash2 className="h-4 w-4 opacity-50" />
              </Button>
            </div>
            <div className="flex flex-col items-start h-full w-full gap-4 sm:flex-row sm:items-center">
              <TextField
                control={control}
                name={`stations.${i}.name`}
                placeholder="Name"
                label="Name"
              />
              <TextField
                control={control}
                name={`stations.${i}.distance`}
                placeholder="Distance (miles)"
                label="Distance (miles)"
              />
              <TextField
                control={control}
                name={`stations.${i}.stationNumberDisplayed`}
                placeholder="Display Override"
                label="Display Override"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center mx-auto w-fit">
        <Button
          onClick={() => {
            stationsField.append({
              name: "",
              stationNumber: stationsField.fields.length,
            });
            order.current = [...order.current, order.current.length];
          }}
        >
          Add Station
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Stations;
