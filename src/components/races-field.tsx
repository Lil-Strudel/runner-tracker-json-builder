import React from "react";
import { Control, FieldValues, UseFormRegister, useFieldArray, useForm } from "react-hook-form";

const FIELD_NAME = "races";
interface RaceFieldProps {
    control: Control<FieldValues, any>,
    register: UseFormRegister<FieldValues>
}
function RacesField(props: RaceFieldProps) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      props.control,
      name: FIELD_NAME,
    }
  );
  console.log(fields);
  return (
    <div>
      {fields.map((field, index) => (
        <input
          key={field.id} // important to include key with field's id
          {...register(`${FIELD_NAME}.${index}.name`)}
        />
      ))}
    </div>
  );
}

export default RacesField;
