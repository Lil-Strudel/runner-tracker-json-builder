import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ParticipantDeleteDialog from "./participant-delete-dialog";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { FormValues, Participant } from "@/types";
import { Control, UseControllerReturn } from "react-hook-form";
import ParticipantEditDialog from "./participant-edit-dialog";

interface ParticipantTableActionsCellProps {
  control: Control<FormValues>;
  row: Row<Participant>;
  participantsField: UseControllerReturn<FormValues, "participants">;
}

function ParticipantTableActionsCell({
  control,
  row,
  participantsField,
}: ParticipantTableActionsCellProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit Participant
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete Participant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ParticipantEditDialog
        mode="edit"
        control={control}
        participant={row.original}
        onEdit={(values) => {
          const newParticipants = [...participantsField.field.value];

          newParticipants[row.index] = values;

          participantsField.field.onChange(newParticipants);
        }}
        dialogProps={{ open: editOpen, onOpenChange: setEditOpen }}
      />
      <ParticipantDeleteDialog
        bibNumber={row.getValue("bibNumber")}
        firstName={row.getValue("firstName")}
        lastName={row.getValue("lastName")}
        onDelete={() => {
          const newParticipants = [...participantsField.field.value];

          newParticipants.splice(row.index, 1);

          setTimeout(() => {
            participantsField.field.onChange(newParticipants);
          }, 200);
        }}
        dialogProps={{
          open: deleteOpen,
          onOpenChange: setDeleteOpen,
        }}
      />
    </>
  );
}

export default ParticipantTableActionsCell;
