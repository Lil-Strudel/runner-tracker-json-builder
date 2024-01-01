import { CSVParticipant, FormValues, Participant } from "@/types";
import ParticipantTable from "./participants/participant-table";
import { Control, useController } from "react-hook-form";
import ParticipantFileUpload from "../fields/participant-file-upload";
import { produce } from "immer";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import Papa from "papaparse";
import { saveObjectAsFile } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface ParticipantsProps {
  control: Control<FormValues>;
}
function Participants({ control }: ParticipantsProps) {
  const participantsField = useController({
    control,
    name: "participants",
  });

  const [uploadBehavior, setUploadBehavior] = useState<"update" | "override">(
    "update",
  );

  const handleParticipantUpload = (participants: Participant[]) => {
    if (uploadBehavior === "update") {
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
    }

    if (uploadBehavior === "override") {
      participantsField.field.onChange(participants);
    }
  };

  const handleCSVDownload = () => {
    const values = participantsField.field.value.map<CSVParticipant>(
      (participant) => ({
        Bib: participant.bibNumber,
        "First Name": participant.firstName,
        "Last Name": participant.lastName,
        Gender: participant.gender,
        Age: Number(participant.age.split("-")[0].replace(/\D/g, "")),
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

    const csvString = Papa.unparse(values);

    saveObjectAsFile("participants", "csv", csvString);
  };

  const handleBehaviorChange = () => {
    if (uploadBehavior === "override") {
      setUploadBehavior("update");
    }
    if (uploadBehavior === "update") {
      setUploadBehavior("override");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <ParticipantFileUpload onUpload={handleParticipantUpload} />
      <div className="w-full flex justify-between flex-col gap-4 sm:flex-row">
        <div className="w-full flex items-center">
          <Switch
            id="csv-mode"
            checked={uploadBehavior === "override"}
            onCheckedChange={handleBehaviorChange}
          />
          <Label htmlFor="csv-mode">Overide all participants on upload</Label>
        </div>
        <Button className="w-full sm:w-[275px]" onClick={handleCSVDownload}>
          {participantsField.field.value.length === 0
            ? "Download Template CSV"
            : "Download Current CSV"}
        </Button>
      </div>
      <ParticipantTable
        control={control}
        participantsField={participantsField}
      />
    </div>
  );
}

export default Participants;
