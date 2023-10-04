import { AppContext } from "@/AppContext";
import { RaceEventValidator } from "@/types";
import React, { useContext } from "react";
import { z } from "zod";

function FileUploader() {
  const { setAppState } = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const fileReader = new FileReader();

    const handleFileRead = () => {
      try {
        const parsedContent = JSON.parse(fileReader.result as string);

        const raceEvent = RaceEventValidator.parse(parsedContent);

        setAppState({ mode: "configure", initialValues: raceEvent });
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
    <div>
      <input type="file" accept=".json" onChange={handleChange} />
    </div>
  );
}

export default FileUploader;
