import TextField from "../fields/text-field";
import DatePicker from "../fields/date-picker";
import TimePicker from "../fields/time-picker";
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
        placeholder="Slug"
        label="Slug"
      />
      <DatePicker control={control} name="date" label="Start Date" />
      <TimePicker control={control} name="time" label="Start Time" />
    </div>
  );
}

export default General;
