import { FormValues } from "@/types";
import { Control, useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import TextField from "./text-field";
import { Input } from "../ui/input";

interface RaceStationFieldProps {
  raceIndex: number;
  control: Control<FormValues>;
}
function RaceStationField({ raceIndex, control }: RaceStationFieldProps) {
  const stations = useWatch({
    control,
    name: "stations",
  });

  return (
    <div className="w-full">
      <FormField
        control={control}
        name={`races.${raceIndex}.stations`}
        render={({ field }) => (
          <div className="flex flex-col items-start">
            <p className="text-sm">Stations</p>
            <div className="flex flex-col gap-4 mt-2 w-full">
              {stations.map((station, index) => {
                const stationIndex = field.value.findIndex(
                  (selectedStation) =>
                    selectedStation.stationNumber === station.stationNumber,
                );

                const stationSelected = stationIndex !== -1;
                const stationHasDistance =
                  station.distance !== undefined &&
                  String(station.distance).trim() !== "";

                return (
                  <div key={index} className="flex flex-row gap-4 w-full">
                    <FormItem className="flex flex-row items-center space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={stationSelected}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange(
                                [
                                  ...field.value,
                                  {
                                    stationNumber: station.stationNumber,
                                    distance: "",
                                  },
                                ].sort(
                                  (a, b) => a.stationNumber - b.stationNumber,
                                ),
                              );
                            } else {
                              field.onChange(
                                [...field.value].filter(
                                  (selectedStation) =>
                                    selectedStation.stationNumber !==
                                    station.stationNumber,
                                ),
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="ml-2">{station.name}</FormLabel>
                    </FormItem>
                    <div>
                      {stationSelected && !stationHasDistance && (
                        <TextField
                          name={`races.${raceIndex}.stations.${stationIndex}.distance`}
                          placeholder="Distance"
                        />
                      )}

                      {stationSelected && stationHasDistance && (
                        <Input value={station.distance} disabled />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default RaceStationField;
