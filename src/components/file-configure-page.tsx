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
import usePreventRefresh from "@/hooks/usePreventRefresh";
import { saveObjectAsFile } from "@/lib/utils";

interface FileConfigurePageProps {
  initialValues: FormValues;
}
function FileConfigurePageContent(props: FileConfigurePageProps) {
  // usePreventRefresh();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormValidator),
    defaultValues: props.initialValues,
  });

  const convertFormToRace = ({
    date,
    time,
    ...values
  }: FormValues): RaceEvent => {
    return { ...values, startDate: "" };
  };

  const onSubmit = (values: FormValues) => {
    const raceEvent = convertFormToRace(values);

    console.log({ values, raceEvent });

    saveObjectAsFile("runner-tracker.json", raceEvent);
  };

  form.register;

  return (
    <section className="py-14 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
            <div className="max-w-xl md:mx-auto">
              <Tabs defaultValue="general">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="stations">Stations</TabsTrigger>
                  <TabsTrigger value="races">Races</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>
                <Button type="submit" className="ml-4">
                  Export File
                </Button>
                <div className="bg-muted rounded-md p-4 my-4">
                  <TabsContent value="general">
                    <General control={form.control} />
                  </TabsContent>
                  <TabsContent value="stations">
                    <Stations control={form.control} register={form.register} />
                  </TabsContent>
                  <TabsContent value="races">
                    <Races />
                  </TabsContent>
                  <TabsContent value="participants">
                    <Participants />
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
