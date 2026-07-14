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
        name="settings.skipTimeIn"
        label="Skip Time In"
        helperText="Stations only collect Time Out. Finish still collects Time In."
      />
      <SwitchField
        control={control}
        name="settings.skipTimeOut"
        label="Skip Time Out"
        helperText="Stations only collect Time In. Finish still collects Time Out."
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
