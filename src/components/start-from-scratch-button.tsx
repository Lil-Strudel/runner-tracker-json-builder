import { useContext } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/AppContext";
import { set } from "date-fns";

function StartFromScratchButton() {
  const { setAppState } = useContext(AppContext);

  const handleClick = () => {
    setAppState({
      mode: "configure",
      initialValues: {
        date: set(new Date(), {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }),
        races: [],
        stations: [],
        participants: [],
      },
    });
  };

  return <Button onClick={handleClick}>Start From Scratch</Button>;
}

export default StartFromScratchButton;
