import { useContext } from "react";
import { AppContext } from "@/AppContext";
import { FormValidator, FormValues, RaceEvent } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import General from "./fileConfigureForm/general";
import Stations from "./fileConfigureForm/stations";
import Participants from "./fileConfigureForm/participants";
import Races from "./fileConfigureForm/races";
import { set } from "date-fns";
import usePreventRefresh from "@/hooks/usePreventRefresh";
import { saveObjectAsFile } from "@/lib/utils";

interface FileConfigurePageProps {
  initialValues: Partial<FormValues>;
}
function FileConfigurePageContent(props: FileConfigurePageProps) {
  usePreventRefresh();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormValidator),
    defaultValues: props.initialValues,
  });

  const convertFormToRace = ({
    date,
    time,
    races,
    stations,
    participants,
    ...values
  }: FormValues): RaceEvent => {
    const [hours, min] = time.split(":");
    const fullDate = set(date, {
      hours: Number(hours),
      minutes: Number(min),
    });

    const sortedRaces = races.map((race) => ({
      ...race,
      stations: race.stations.sort((a, b) => a.stationNumber - b.stationNumber),
    }));

    const sortedStations = stations.sort(
      (a, b) => a.stationNumber - b.stationNumber,
    );
    const sortedParticipants = participants.sort(
      (a, b) => a.bibNumber - b.bibNumber,
    );

    return {
      ...values,
      startDate: fullDate.toString(),
      races: sortedRaces,
      stations: sortedStations,
      participants: sortedParticipants,
    };
  };

  const onSubmit = (values: FormValues) => {
    const raceEvent = convertFormToRace(values);

    saveObjectAsFile("runner-tracker", "json", raceEvent);
  };

  return (
    <section className="py-14 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-xl md:mx-auto">
              <Tabs defaultValue="general">
                <div className="flex justify-center">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="stations">Stations</TabsTrigger>
                    <TabsTrigger value="races">Races</TabsTrigger>
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                  </TabsList>
                  <Button type="submit" className="ml-4">
                    Export File
                  </Button>
                </div>
                <div className="bg-muted rounded-md p-4 my-4">
                  <TabsContent value="general">
                    <General control={form.control} />
                  </TabsContent>
                  <TabsContent value="stations">
                    <Stations control={form.control} />
                  </TabsContent>
                  <TabsContent value="races">
                    <Races control={form.control} />
                  </TabsContent>
                  <TabsContent value="participants">
                    <Participants control={form.control} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

function FileConfigurePage() {
  const { appState } = useContext(AppContext);

  if (appState.mode !== "configure")
    return <div>Something went wrong. Please refresh.</div>;

  return <FileConfigurePageContent initialValues={appState.initialValues} />;
}

export default FileConfigurePage;
