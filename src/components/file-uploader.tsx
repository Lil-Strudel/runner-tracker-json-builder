import { AppContext } from "@/AppContext";
import { FormValidator, FormValues, File, FileValidator } from "@/types";
import { format } from "date-fns";
import React, { useContext } from "react";
import { z } from "zod";

function FileUploader() {
  const { setAppState } = useContext(AppContext);

  const transformFileToForm = (values: File): FormValues => {
    const formValues: FormValues = {
      ...values,
      startTime: values.startDate
        ? format(values.startDate, "HH:mm:ss")
        : undefined,
      endTime: values.endDate ? format(values.endDate, "HH:mm:ss") : undefined,
    };

    return FormValidator.parse(formValues);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const fileReader = new FileReader();

    const handleFileRead = () => {
      try {
        const parsedContent = JSON.parse(fileReader.result as string);

        const fileData = FileValidator.parse(parsedContent);

        const initialValues = transformFileToForm(fileData);

        initialValues.fileName = event.target?.files?.[0]?.name.replace(
          ".json",
          "",
        );

        setAppState({
          mode: "configure",
          initialValues: initialValues,
        });
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
        htmlFor="start-dropzone-file"
        className="p-4 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
          id="start-dropzone-file"
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default FileUploader;
