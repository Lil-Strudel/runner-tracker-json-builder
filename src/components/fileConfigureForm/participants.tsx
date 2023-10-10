import { FormValues, Participant } from "@/types";
import ParticipantTable from "./participants/participant-table";
import { Control, useController } from "react-hook-form";
import ParticipantFileUpload from "../fields/participant-file-upload";
import { produce } from "immer";

interface ParticipantsProps {
  control: Control<FormValues>;
}
function Participants({ control }: ParticipantsProps) {
  const participantField = useController({
    control,
    name: "participants",
  });

  const handleParticipantUpload = (participants: Participant[]) => {
    const currentParticipants = participantField.field.value;
    const newParticipants = produce(
      currentParticipants,
      (currentParticipants) => {
        participants.forEach((participant) => {
          const alreadyExistingParticipant = currentParticipants.findIndex(
            (currentParticipant) =>
              currentParticipant.bibNumber === participant.bibNumber,
          );

          // if it doesnt find it
          if (alreadyExistingParticipant === -1) {
            currentParticipants.push(participant);
          }

          // if it does find it
          if (alreadyExistingParticipant !== -1) {
            currentParticipants[alreadyExistingParticipant] = participant;
          }
        });
      },
    );

    participantField.field.onChange(newParticipants);
  };

  return (
    <div>
      <ParticipantFileUpload onUpload={handleParticipantUpload} />
      <ParticipantTable participantsField={participantField} />
    </div>
  );
}

export default Participants;
