import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface SwitchFieldProps {
  label?: string;
  helperText?: string;
  className?: string;
}

function SwitchField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  className,
  ...props
}: SwitchFieldProps & Omit<ControllerProps<TFieldValues, TName>, "render">) {
  return (
    <div className={className}>
      <FormField
        {...props}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            {label && <FormLabel className="cursor-default">{label}</FormLabel>}
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default SwitchField;
