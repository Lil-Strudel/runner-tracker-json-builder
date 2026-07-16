import SwitchField from "../fields/switch-field";
import { Control } from "react-hook-form";
import { FormValues } from "@/types";

interface SettingsProps {
  control: Control<FormValues>;
}
function Settings({ control }: SettingsProps) {
  return (
    <div className="flex flex-col gap-4">
      <SwitchField
        control={control}
        name="settings.singleTimeMode"
        label="Single Time Mode"
        helperText="Stations only collect a single time instead of separate Time In and Time Out. Finish still collects both."
      />
      <SwitchField
        control={control}
        name="settings.includeSecondsWithTime"
        label="Include Seconds With Time"
        helperText="Display times with seconds instead of just hours and minutes."
      />
    </div>
  );
}

export default Settings;
