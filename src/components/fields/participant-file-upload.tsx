import { z } from "zod";

import Papa from "papaparse";
import { CSVParticipantValidator, Participant } from "@/types";

interface ParticipantFileUploadProps {
  onUpload: (participants: Participant[]) => void;
}
function ParticipantFileUpload({ onUpload }: ParticipantFileUploadProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const fileReader = new FileReader();

    const handleFileRead = () => {
      try {
        const fileContents = fileReader.result as string;

        const { data: records } = Papa.parse(fileContents, {
          header: true,
          skipEmptyLines: true,
        });

        const results = z.array(CSVParticipantValidator).parse(records);

        const formattedResults = results.map<Participant>((result) => {
          let ageFromGroup: string | undefined;
          let sexFromGroup: "M" | "F" | undefined;

          if (result["Age Group"]) {
            if (result["Age Group"].charAt(0) === "M") {
              sexFromGroup = "M";
              ageFromGroup = result["Age Group"].slice(1);
            } else if (result["Age Group"].charAt(0) === "F") {
              sexFromGroup = "F";
              ageFromGroup = result["Age Group"].slice(1);
            } else {
              ageFromGroup = result["Age Group"];
            }
          }

          const age = result.Age ? String(result.Age) : ageFromGroup;
          const sex = result.Sex ? result.Sex : sexFromGroup;

          return {
            bibNumber: result.Bib,
            ...(result["First Name"]
              ? { firstName: result["First Name"] }
              : {}),
            ...(result["Last Name"] ? { lastName: result["Last Name"] } : {}),
            ...(age ? { age } : {}),
            ...(sex ? { sex } : {}),
            ...(result["Race Name"] ? { raceName: result["Race Name"] } : {}),
            ...(result.Note ? { note: result.Note } : {}),
            ...(result.Home ? { home: result.Home } : {}),
            ...(result.Team ? { team: result.Team } : {}),
          };
        });

        onUpload(formattedResults);
      } catch (err) {
        if (err instanceof z.ZodError) {
          alert(JSON.stringify(err.issues));
        } else {
          alert("Invalid JSON file");
        }
      }
    };

    fileReader.onloadend = handleFileRead;

    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default ParticipantFileUpload;
