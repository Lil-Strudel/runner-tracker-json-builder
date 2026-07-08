import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function StartFromScratchButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/build", {
      state: {
        races: [],
        stations: [],
        participants: [],
      },
    });
  };

  return <Button onClick={handleClick}>Start From Scratch</Button>;
}

export default StartFromScratchButton;
