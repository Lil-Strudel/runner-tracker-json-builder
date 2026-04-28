import { useContext } from "react";
import { Globe } from "lucide-react";
import { AppContext } from "@/AppContext";
import FileUploader from "./file-uploader";
import StartFromScratchButton from "./start-from-scratch-button";

function WelcomePage() {
  const { setAppState } = useContext(AppContext);

  return (
    <section className="relative py-14 flex flex-col">
      <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
        <div className="max-w-xl md:mx-auto">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Hey JJ and Ray
          </h3>
          <p className="mt-3 text-gray-600">
            Here is a little tool I threw together to help out generating the
            json files for TRacer
          </p>
        </div>
        <div className="flex gap-3 flex-col items-center justify-center mt-4">
          <StartFromScratchButton />
          <p>or</p>
          <FileUploader />
        </div>
      </div>
      <button
        onClick={() => setAppState({ mode: "import-live", initialValues: null })}
        className="absolute bottom-4 right-4 p-2 text-gray-300 hover:text-gray-500 transition-colors"
        title="Import from live site"
      >
        <Globe size={18} />
      </button>
    </section>
  );
}

export default WelcomePage;
