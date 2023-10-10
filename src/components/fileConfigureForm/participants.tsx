import { CSVParticipant, FormValues, Participant } from "@/types";
import ParticipantTable from "./participants/participant-table";
import { Control, useController } from "react-hook-form";
import ParticipantFileUpload from "../fields/participant-file-upload";
import { produce } from "immer";
import { Button } from "../ui/button";
import Papa from "papaparse";
import { saveObjectAsFile } from "@/lib/utils";

interface ParticipantsProps {
  control: Control<FormValues>;
}
function Participants({ control }: ParticipantsProps) {
  const participantsField = useController({
    control,
    name: "participants",
  });

  const handleParticipantUpload = (participants: Participant[]) => {
    const currentParticipants = participantsField.field.value;
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

    participantsField.field.onChange(newParticipants);
  };

  const handleCSVDownload = () => {
    const values = participantsField.field.value.map<CSVParticipant>(
      (participant) => ({
        Bib: participant.bibNumber,
        "First Name": participant.firstName,
        "Last Name": participant.lastName,
        Gender: participant.gender,
        Age: 1,
        "Race Name": participant.raceName,
      }),
    );

    if (values.length === 0) {
      values.push({
        "First Name": "",
        "Last Name": "",
        Age: 0,
        Bib: 0,
        Gender: "",
        "Race Name": "",
      });
    }

    const csvString = Papa.unparse(participantsField.field.value);

    saveObjectAsFile("participants", "csv", csvString);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <ParticipantFileUpload onUpload={handleParticipantUpload} />
      <Button className="w-fit" onClick={handleCSVDownload}>
        Download CSV
      </Button>
      <ParticipantTable participantsField={participantsField} />
    </div>
  );
}

export default Participants;
