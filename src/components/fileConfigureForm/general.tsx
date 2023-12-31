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
      <DatePicker control={control} name="date" label="Start Date" />
      <TextField
        control={control}
        name="time"
        label="Start Time"
        inputProps={{ type: "time" }}
      />
    </div>
  );
}

export default General;
