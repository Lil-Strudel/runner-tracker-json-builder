import { FormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray, useWatch, useFormContext } from "react-hook-form";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import TextField from "../fields/text-field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StationsProps {
  control: Control<FormValues>;
}
function Stations({ control }: StationsProps) {
  const stationsField = useFieldArray({
    control,
    name: "stations",
  });

  const fields = stationsField.fields;
  const startStation = useWatch({ control, name: "startStation" });
  const finishStation = useWatch({ control, name: "finishStation" });
  const { setValue } = useFormContext();

  const order = useRef(fields.map((_, index) => index));

  const handleDeleteStation = (index: number) => {
    const stationNumber = fields[index].stationNumber;
    if (startStation === stationNumber) setValue("startStation", undefined);
    if (finishStation === stationNumber) setValue("finishStation", undefined);
    stationsField.remove(index);
  };

  const handleStartStationChange = (stationNumber: number, checked: boolean) => {
    if (checked) {
      setValue("startStation", stationNumber);
    } else {
      setValue("startStation", undefined);
    }
  };

  const handleFinishStationChange = (stationNumber: number, checked: boolean) => {
    if (checked) {
      setValue("finishStation", stationNumber);
    } else {
      setValue("finishStation", undefined);
    }
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
             <div className="flex justify-between w-full items-center">
               <div className="flex items-center gap-4">
                 <h1 className="text-2xl sm:text-md">Station {i + 1}</h1>
                 <div className="flex items-center gap-2">
                   <Checkbox
                     id={`start-station-${i}`}
                     checked={startStation === field.stationNumber}
                     onCheckedChange={(checked) =>
                       handleStartStationChange(field.stationNumber, checked as boolean)
                     }
                   />
                   <Label htmlFor={`start-station-${i}`} className="cursor-default">
                     Start
                   </Label>
                 </div>
                 <div className="flex items-center gap-2">
                   <Checkbox
                     id={`finish-station-${i}`}
                     checked={finishStation === field.stationNumber}
                     onCheckedChange={(checked) =>
                       handleFinishStationChange(field.stationNumber, checked as boolean)
                     }
                   />
                   <Label htmlFor={`finish-station-${i}`} className="cursor-default">
                     Finish
                   </Label>
                 </div>
               </div>
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
