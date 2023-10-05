import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
}

function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  placeholder,
  ...props
}: TextFieldProps & Omit<ControllerProps<TFieldValues, TName>, "render">) {
  return (
    <div className="text-left">
      <FormField
        {...props}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...(placeholder ? { placeholder: placeholder } : {})}
                {...field}
              />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default TextField;
