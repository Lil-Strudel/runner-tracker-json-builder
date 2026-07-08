import FileUploader from "./file-uploader";
import StartFromScratchButton from "./start-from-scratch-button";

function HomePage() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
        <div>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Build your TRacer event file
          </h1>
          <p className="mt-4 text-muted-foreground">
            TRacer helps race-day volunteers track runners safely — logging
            bib times and DNFs at aid stations and sending them straight to
            race control over radio, no relay delays, just a phone and a
            radio.
          </p>
          <p className="mt-3 text-muted-foreground">
            This tool builds the JSON event file TRacer imports, so your
            stations, races, and participants are ready to go before race
            morning — no manual entry required.
          </p>
        </div>

        <div className="flex gap-3 flex-col items-center justify-center">
          <StartFromScratchButton />
          <p className="text-muted-foreground">or</p>
          <FileUploader />
        </div>

        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          This started as a favor for a friend, JJ, getting ready for race
          day — it grew into something a few more race organizers found handy
          too.
        </p>
      </div>
    </section>
  );
}

export default HomePage;
