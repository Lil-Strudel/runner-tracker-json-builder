import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@radix-ui/react-select";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface SelectFieldProps {
  label?: string;
  helperText?: string;
  className?: string;
}

function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  className,
  children,
  ...props
}: React.PropsWithChildren<
  SelectFieldProps & Omit<ControllerProps<TFieldValues, TName>, "render">
>) {
  return (
    <div className={className}>
      <FormField
        {...props}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                {children}
              </Select>
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default SelectField;
