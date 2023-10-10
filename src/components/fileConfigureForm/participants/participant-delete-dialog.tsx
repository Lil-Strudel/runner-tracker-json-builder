import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";

interface ParticipantDeleteDialogProps {
  dialogProps?: AlertDialogProps;
  bibNumber: number;
  firstName: string;
  lastName: string;
  onDelete: () => void;
}
function ParticipantDeleteDialog({
  dialogProps,
  bibNumber,
  firstName,
  lastName,
  onDelete,
}: ParticipantDeleteDialogProps) {
  return (
    <AlertDialog {...dialogProps}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Participant{" "}
            <b>
              #{bibNumber} {firstName} {lastName}{" "}
            </b>{" "}
            will be <b>deleted</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ParticipantDeleteDialog;
