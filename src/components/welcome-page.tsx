import React from "react";
import { Button } from "./ui/button";
import FileUploader from "./file-uploader";
import StartFromScratchButton from "./start-from-scratch-button";

function WelcomePage() {
  return (
    <div className="container mx-auto">
      <div className="mx-auto">
        <h1>Hey JJ and Ray</h1>
        <p>
          Check out the code on{" "}
          <a
            href="https://github.com/Lil-Strudel/runner-tracker-json-builder"
            target="_blank"
          >
            <Button>GitHub</Button>
          </a>
        </p>
      </div>
      <h2>To get started</h2>
      <StartFromScratchButton />
      <p>or</p>
      <FileUploader />
    </div>
  );
}

export default WelcomePage;
