import { useContext } from "react";
import { AppContext } from "@/AppContext";
import { RaceEvent, RaceEventValidator } from "@/types";
import { Button } from "./ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import TextField from "./text-field";
import RaceStationsField from "./race-station-field";

interface FileConfigurePageProps {
  initialValues: RaceEvent;
}
function FileConfigurePageContent(props: FileConfigurePageProps) {
  const form = useForm<RaceEvent>({
    resolver: zodResolver(RaceEventValidator),
    defaultValues: props.initialValues,
  });

  const racesField = useFieldArray({
    name: "races",
    control: form.control,
  });

  const stationsField = useFieldArray({
    name: "stations",
    control: form.control,
  });

  const participantsField = useFieldArray({
    name: "participants",
    control: form.control,
  });

  const onSubmit = (values: RaceEvent) => {
    const fileName = "runner-tracker";
    const json = JSON.stringify(values, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TextField control={form.control} name="name" label="Name" />
          <TextField control={form.control} name="slug" label="Slug" />
          <TextField
            control={form.control}
            name="startDate"
            label="Start Date"
          />
          <div className="flex gap-4">
            <h1 className="text-6xl">Stations</h1>
            <Button
              type="button"
              onClick={() =>
                stationsField.append({
                  name: "",
                  stationNumber: stationsField.fields.length,
                })
              }
            >
              Add Station
            </Button>
          </div>
          {stationsField.fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-4">
                <h1 className="text-2xl">Station {index + 1}</h1>
                <Button onClick={() => stationsField.remove(index)}>
                  Delete
                </Button>
              </div>
              <div className="columns-2">
                <TextField
                  label="Name"
                  {...form.register(`stations.${index}.name`)}
                />
                <TextField
                  label="Distance"
                  {...form.register(`stations.${index}.distance`)}
                />
                <TextField
                  label="Station Number"
                  {...form.register(`stations.${index}.stationNumber`)}
                />
                <TextField
                  label="Station Number Displayed"
                  {...form.register(`stations.${index}.stationNumberDisplayed`)}
                />
              </div>
            </div>
          ))}
          <div className="flex gap-4">
            <h1 className="text-6xl">Races</h1>
            <Button
              type="button"
              onClick={() =>
                racesField.append({
                  name: "",
                  distance: 0,
                  stations: [],
                })
              }
            >
              Add Race
            </Button>
          </div>
          {racesField.fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-4">
                <h1 className="text-2xl">Race {index + 1}</h1>
                <Button onClick={() => racesField.remove(index)}>Delete</Button>
              </div>
              <div className="columns-2">
                <TextField
                  label="Name"
                  {...form.register(`races.${index}.name`)}
                />
                <TextField
                  label="Distance"
                  {...form.register(`races.${index}.distance`)}
                />
              </div>
              <RaceStationsField
                name={`races.${index}.stations`}
                control={form.control}
                register={form.register}
              />
            </div>
          ))}
          <div className="flex gap-4">
            <h1 className="text-6xl">Participants</h1>
            <Button
              type="button"
              onClick={() =>
                participantsField.append({
                  firstName: "",
                  lastName: "",
                  age: "",
                  gender: "M",
                  bibNumber: 0,
                  raceName: "",
                })
              }
            >
              Add Participant
            </Button>
          </div>
          {participantsField.fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-4">
                <h1 className="text-2xl">Participant {index + 1}</h1>
                <Button onClick={() => participantsField.remove(index)}>
                  Delete
                </Button>
              </div>
              <div className="columns-2">
                <TextField
                  label="First Name"
                  {...form.register(`participants.${index}.firstName`)}
                />
                <TextField
                  label="Last Name"
                  {...form.register(`participants.${index}.lastName`)}
                />
                <TextField
                  label="Age"
                  {...form.register(`participants.${index}.age`)}
                />
                <TextField
                  label="Gender"
                  {...form.register(`participants.${index}.gender`)}
                />
                <TextField
                  label="Bib #"
                  {...form.register(`participants.${index}.bibNumber`)}
                />
                <TextField
                  label="Race"
                  {...form.register(`participants.${index}.raceName`)}
                />
              </div>
            </div>
          ))}
          <Button type="submit">Save File</Button>
        </form>
      </Form>
    </div>
  );
}

function FileConfigurePage() {
  const { appState } = useContext(AppContext);

  if (appState.mode !== "configure")
    return <div>Something went wrong. Please refresh.</div>;

  return <FileConfigurePageContent initialValues={appState.initialValues} />;
}

export default FileConfigurePage;
