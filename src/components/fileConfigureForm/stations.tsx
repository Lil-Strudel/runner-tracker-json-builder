import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray } from "react-hook-form";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import TextField from "../fields/text-field";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
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
          <div
            key={field.id}
            className="bg-white rounded-md border w-full p-4"
            children={
              <div className="flex items-center h-full w-full gap-4">
                <TextField
                  control={control}
                  name={`stations.${i}.name`}
                  placeholder="Name"
                />
                <TextField
                  control={control}
                  name={`stations.${i}.distance`}
                  placeholder="Distance (miles)"
                />
                <FormField
                  control={control}
                  name={`stations.${i}.stationNumberDisplayed`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value === " "}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? " " : "")
                          }
                        />
                      </FormControl>
                      <FormLabel className="ml-2">Hide Number</FormLabel>
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteStation(i)}
                >
                  <Trash2 className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            }
          />
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
