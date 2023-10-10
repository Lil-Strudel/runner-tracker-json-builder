import TextField from "@/components/fields/text-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Participant, ParticipantValidator } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { useForm } from "react-hook-form";

interface ParticipantEditDialogProps {
  participant: Participant;
  onEdit: (participant: Participant) => void;
  dialogProps?: DialogProps;
}
function ParticipantEditDialog({
  participant,
  onEdit,
  dialogProps,
}: ParticipantEditDialogProps) {
  const form = useForm<Participant>({
    resolver: zodResolver(ParticipantValidator),
    defaultValues: participant,
  });

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
          <DialogTitle>
            Edit #{participant.bibNumber} {participant.firstName}{" "}
            {participant.lastName}{" "}
          </DialogTitle>
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
            <TextField control={form.control} name="age" label="Age" />
            <TextField control={form.control} name="gender" label="Gender" />
            <TextField
              control={form.control}
              name="raceName"
              label="Race Name"
            />
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantEditDialog;
