import { useContext } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/AppContext";

function StartFromScratchButton() {
  const { setAppState } = useContext(AppContext);

  const handleClick = () => {
    setAppState({
      mode: "configure",
      initialValues: {
        name: "",
        slug: "",
        date: new Date(),
        time: "",
        races: [],
        stations: [],
        participants: [],
      },
    });
  };

  return <Button onClick={handleClick}>Start From Scratch</Button>;
}

export default StartFromScratchButton;
