import { useContext } from "react";
import { AppContext } from "@/AppContext";
import { File, FormValidator, FormValues } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import General from "./fileConfigureForm/general";
import Stations from "./fileConfigureForm/stations";
import Participants from "./fileConfigureForm/participants";
import Races from "./fileConfigureForm/races";
import usePreventRefresh from "@/hooks/usePreventRefresh";
import { saveObjectAsFile } from "@/lib/utils";
import { set } from "date-fns";
import FileName from "./fields/file-name";

interface FileConfigurePageProps {
  initialValues: Partial<FormValues>;
}
function FileConfigurePageContent(props: FileConfigurePageProps) {
  usePreventRefresh();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormValidator),
    defaultValues: props.initialValues,
  });

  const convertFormToFile = ({
    startTime,
    endTime,
    startDate,
    endDate,
    races,
    stations,
    participants,
    ...values
  }: FormValues): File => {
    let actualStartDate, actualEndDate;
    if (startDate && startTime) {
      const [hours, min] = startTime.split(":");
      actualStartDate = set(startDate, {
        hours: Number(hours),
        minutes: Number(min),
      });
    } else if (startDate) {
      actualStartDate = startDate;
    }

    if (endDate && endTime) {
      const [hours, min] = endTime.split(":");
      actualStartDate = set(endDate, {
        hours: Number(hours),
        minutes: Number(min),
      });
    } else if (endDate) {
      actualEndDate = endDate;
    }

    const sortedRaces = (races || []).map((race) => ({
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
      ...(actualStartDate ? { startDate: actualStartDate } : {}),
      ...(actualEndDate ? { endDate: actualEndDate } : {}),
      races: sortedRaces,
      stations: sortedStations,
      participants: sortedParticipants,
    };
  };

  const onSubmit = (values: FormValues) => {
    const raceEvent = convertFormToFile(values);

    saveObjectAsFile(values.fileName || "runner-tracker", "json", raceEvent);
  };

  return (
    <section className="py-4 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-screen-lg mx-auto">
            <FileName />
            <Tabs defaultValue="general">
              <div className="flex flex-col gap-4 justify-center align-center my-4 sm:flex-row">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="stations">Stations</TabsTrigger>
                  <TabsTrigger value="races">Races</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>
                <Button type="submit">Export File</Button>
              </div>
              <div className="bg-muted rounded-md p-4">
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
