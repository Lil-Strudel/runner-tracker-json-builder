import SelectField from "@/components/fields/select-field";
import TextField from "@/components/fields/text-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues, Participant, ParticipantValidator } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { Control, useForm, useWatch } from "react-hook-form";

type ParticipantEditDialogProps = {
  control: Control<FormValues>;
  onEdit: (participant: Participant) => void;
  dialogProps?: DialogProps;
} & (
  | { mode: "edit"; participant: Participant }
  | { mode: "create"; participant?: never }
);
function ParticipantEditDialog({
  control,
  mode,
  participant,
  onEdit,
  dialogProps,
}: ParticipantEditDialogProps) {
  const form = useForm<Participant>({
    resolver: zodResolver(ParticipantValidator),
    defaultValues: participant ?? { age: "" },
  });

  const races = useWatch({
    control: control,
    name: "races",
  });

  const raceNames = (races || []).map((race) => race.name);

  const [ageAsNumber, setAgeAsNumber] = useState(false);

  useEffect(() => {
    if (participant?.age) {
      const numberAge = Number(participant.age);
      if (isNaN(numberAge)) {
        setAgeAsNumber(false);
      } else {
        setAgeAsNumber(true);
      }
    } else {
      setAgeAsNumber(false);
    }
  }, [participant]);

  const onSubmit = (values: Participant) => {
    setTimeout(() => {
      onEdit(values);
    }, 200);
    if (dialogProps?.onOpenChange) {
      dialogProps.onOpenChange(false);
    }
  };

  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>
          {mode === "create" && <DialogTitle>Add a Participant</DialogTitle>}
          {mode === "edit" && (
            <DialogTitle>
              Edit #{participant.bibNumber} {participant.firstName}{" "}
              {participant.lastName}
            </DialogTitle>
          )}
        </DialogHeader>
        <Form {...form}>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              control={form.control}
              name="firstName"
              label="First Name"
            />
            <TextField
              control={form.control}
              name="lastName"
              label="Last Name"
            />
            <TextField
              control={form.control}
              name="bibNumber"
              label="Bib Number"
            />
            <SelectField control={form.control} name="sex" label="Sex">
              <SelectTrigger>
                <SelectValue placeholder="Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
              </SelectContent>
            </SelectField>
            <div>
              {ageAsNumber && (
                <TextField control={form.control} name="age" label="Age" />
              )}
              {!ageAsNumber && (
                <SelectField
                  control={form.control}
                  name="age"
                  label="Age Group"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "<20",
                      "20-29",
                      "30-39",
                      "40-49",
                      "50-59",
                      "60-69",
                      "70-79",
                      "80-89",
                    ].map((ageGroup, index) => (
                      <SelectItem key={index} value={ageGroup}>
                        {ageGroup}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectField>
              )}
              <div className="items-top flex space-x-2 mt-2">
                <Checkbox
                  id="ageAsNumber"
                  checked={ageAsNumber}
                  onCheckedChange={(checked) => setAgeAsNumber(!!checked)}
                />
                <label
                  htmlFor="ageAsNumber"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use Exact Age
                </label>
              </div>
            </div>
            <TextField control={form.control} name="home" label="Home" />
            {raceNames.length > 0 && (
              <SelectField
                control={form.control}
                name="raceName"
                label="Race Name"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Race Name" />
                </SelectTrigger>
                <SelectContent>
                  {raceNames.map((raceName, index) => (
                    <SelectItem key={index} value={raceName}>
                      {raceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectField>
            )}
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantEditDialog;
