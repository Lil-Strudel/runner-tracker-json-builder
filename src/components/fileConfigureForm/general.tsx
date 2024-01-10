import TextField from "../fields/text-field";
import DatePicker from "../fields/date-picker";
import { Control } from "react-hook-form";
import { FormValues } from "@/types";

interface GeneralProps {
  control: Control<FormValues>;
}
function General({ control }: GeneralProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TextField
        control={control}
        name="name"
        placeholder="Name"
        label="Name"
      />
      <TextField
        control={control}
        name="slug"
        placeholder="URL Path"
        label="URL Path"
      />
      <DatePicker control={control} name="startDate" label="Start Date" />
      <TextField
        control={control}
        name="startTime"
        label="Start Time"
        inputProps={{ type: "time" }}
      />
      <DatePicker control={control} name="endDate" label="End Date" />
      <TextField
        control={control}
        name="endTime"
        label="End Time"
        inputProps={{ type: "time" }}
      />
    </div>
  );
}

export default General;
