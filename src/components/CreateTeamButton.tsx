import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";

interface CreateTeamButtonProps {
  onPressFunction: Function;
  data: object;
}

const queryParameters = new URLSearchParams(window.location.search);

const createTeam = async (data: object) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/createteam`, {
      headers: {
        "event-name": queryParameters.get("eventname"),
        "api-key": `${import.meta.env.VITE_BACKEND_API_KEY}`,
      },
      body: data,
    });
    console.log(res);
    window.location.reload();
  } catch (error) {
    toast.error("Error Creating Team! " + error);
  }
};

function CreateTeamButton({ onPressFunction, data }: CreateTeamButtonProps) {
  return (
    <Button
      color="default"
      onPress={() => {
        onPressFunction();
        console.log(data);
        createTeam(data);
      }}
    >
      Save Team Data
    </Button>
  );
}

export default CreateTeamButton;
