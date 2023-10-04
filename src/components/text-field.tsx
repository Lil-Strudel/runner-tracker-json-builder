import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
}

function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  helperText,
  placeholder,
  ...props
}: TextFieldProps & Omit<ControllerProps<TFieldValues, TName>, "render">) {
  return (
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
  );
}

export default TextField;
