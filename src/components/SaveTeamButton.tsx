import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";

interface CreateTeamButtonProps {
  onPressFunction: Function;
  data: object;
}

const queryParameters = new URLSearchParams(window.location.search);

const updateTeam = async (data: object) => {
  console.log(data);
  try {
    const res = await axios.post("http://192.168.1.40:7777/updateteam", {
      headers: {
        "event-name": queryParameters.get("eventname"),
        "api-key": "97feee36-7fd0-46ab-a80e-8b8e24fc7a2e",
      },
      body: data,
    });
    console.log(res);
    window.location.reload();
  } catch (error) {
    toast.error("Error updating Team! " + error);
  }
};

function CreateTeamButton({ onPressFunction, data }: CreateTeamButtonProps) {
  return (
    <Button
      color="default"
      onPress={() => {
        onPressFunction();
        console.log(data);
        updateTeam(data);
      }}
    >
      Save Team Data
    </Button>
  );
}

export default CreateTeamButton;
