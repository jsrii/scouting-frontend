import UserNameAvatar from "../UsrNameAvatar";
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Modal,
  Slider,
} from "@nextui-org/react";
import Tune from "@mui/icons-material/Tune";
import GroupAdd from "@mui/icons-material/GroupAdd";
import { useMediaQuery } from "@mui/material";
import ModalIconButton from "../ModalIconButton";
import NameHeader from "../NameHeader";
import TeamTable from "../TeamTable";
import ModalButton from "../ModalButton";
import { TagInput } from "../TagInput";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import TeamStats from "../TeamStats";
import TeamName from "../TeamName";
import { useState } from "react";
import MobileAccountModal from "../MobileAccountModal";
import FileUploader from "../FileUploader";
import { toast } from "sonner";
import CreateTeamButton from "../CreateTeamButton";
import axios from "axios";
import { useDisclosure } from "@nextui-org/react";
import SaveTeamButton from "../SaveTeamButton";
import TableSelector from "../TableSelector";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Cookies from "universal-cookie";

const queryParameters = new URLSearchParams(window.location.search);

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const signOut = useSignOut();
  const cookies = new Cookies();

  const [teamStats, setTeamStats] = useState({
    epa: 0,
    rank: 0,
    wins: 0,
    losses: 0,
    teamName: "",
    teamNumber: "",
  });

  const [teamData, setTeamData] = useState({
    id: -1,
    teamNum: "",
    ab1: -1,
    ab2: -1,
    ab3: -1,
    strengths: [] as string[],
    weaknesses: [] as string[],
    botImage: "",
    institution: "",
  });

  const handleStrengthTagsChange = (newTags: string[]) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      strengths: newTags,
    }));
    console.log("Updated tags:", teamData.strengths);
  };

  const handleWeaknessTagsChange = (newTags: string[]) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      weaknesses: newTags,
    }));
    console.log("Updated tags:", teamData.weaknesses);
  };

  const handleAb1Change = (num: number) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      ab1: num,
    }));
  };

  const handleAb2Change = (num: number) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      ab2: num,
    }));
  };

  const handleAb3Change = (num: number) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      ab3: num,
    }));
  };

  const handleBotImageURl = (botImageURL: string) => {
    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      botImage: botImageURL,
    }));
    console.log(teamData.botImage);
  };

  async function deleteTeam(id: number) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/deleteteam`, {
        headers: {
          "event-name": queryParameters.get("eventname"),
          "api-key": `${import.meta.env.VITE_BACKEND_API_KEY}`,
          "entry-to-delete": id,
        },
      });
      console.log(res);
      window.location.reload();
      toast.success("Successfully Deleted Team!");
    } catch (error) {
      toast.error("Error Deleting Team: " + error);
    }
  }

  function editTeam(id: number) {
    editModal(id);
    toast.success("Modal is: " + isOpen);
  }

  async function editModal(id: number) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getteam`, {
        headers: {
          "event-name": queryParameters.get("eventname"),
          "api-key": `${import.meta.env.VITE_BACKEND_API_KEY}`,
          "team-id": id,
        },
      });
      setTeamData({
        id: res.data.id,
        teamNum: res.data.teamNum,
        ab1: res.data.ab1,
        ab2: res.data.ab2,
        ab3: res.data.ab3,
        strengths: JSON.parse(res.data.strengths),
        weaknesses: JSON.parse(res.data.weaknesses),
        botImage: res.data.botImage,
        institution: res.data.institution,
      });
      onOpen();

      setTeamStats((prevTeamData) => ({
        ...prevTeamData,
        teamName: res.data.institution,
        teamNumber: res.data.teamNum,
      }));

      toast.success("Successfully got Team!");

      const statRes = await axios.get(
        "https://api.statbotics.io/v3/team_event/" +
          res.data.teamNum +
          "/" +
          queryParameters.get("eventname")
      );

      setTeamStats((prevTeamData) => ({
        ...prevTeamData,
        epa: statRes.data.epa.breakdown.total_points,
        rank: statRes.data.record.qual.rank,
        wins: statRes.data.record.qual.wins,
        losses: statRes.data.record.qual.losses,
        teamName: statRes.data.team_name,
        teamNumber: statRes.data.team,
      }));
    } catch (error) {
      toast.error("Error getting Team: " + error);
    }
  }

  function eventChanger(key: React.ChangeEvent<HTMLSelectElement>) {
    queryParameters.set("eventname", key.target.value);
    window.history.replaceState(null, "", "?" + queryParameters.toString());
    window.location.reload();
  }

  const sideBar = () => {
    const desktopView = useMediaQuery("(min-width:1100px)");

    if (desktopView) {
      return (
        <div className="p-4 bg-[#262626]">
          <div className="p-3 h-full rounded-lg gap-2 none" id="sideBar">
            <UserNameAvatar avatarURL={cookies.get("_auth_state").avatarUrl} />
            <Divider className="my-4" />
            <div className="sideBarButtons flex flex-col gap-3">
              <ModalIconButton
                gradientStart="black"
                gradientEnd="dark-grey"
                iconName={<Tune />}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-4xl">
                        Settings
                      </ModalHeader>
                      <ModalBody className="flex flex-col gap-2">
                        <TableSelector
                          eventChanger={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            eventChanger(e);
                          }}
                        />
                        <Accordion isCompact>
                          <AccordionItem
                            key="1"
                            aria-label="Ability 1"
                            title="Ability 1"
                            className="text-sm"
                          >
                            {"blah blah blah blah blah blah."}
                          </AccordionItem>
                          <AccordionItem
                            key="2"
                            aria-label="Ability 2"
                            title="Ability 2"
                            className="text-sm"
                          >
                            {"blah blah blah blah blah blah."}
                          </AccordionItem>
                          <AccordionItem
                            key="3"
                            aria-label="Ability 3"
                            title="Ability 3"
                            className="text-sm"
                          >
                            {"blah blah blah blah blah blah."}
                          </AccordionItem>
                        </Accordion>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          onPress={() => {
                            signOut();
                            window.location.reload();
                          }}
                        >
                          Log Out
                        </Button>
                        <Button color="default" onPress={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </ModalIconButton>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="bg-[#262626] pe-4"></div>;
    }
  };

  const condensedHeaderView = () => {
    const desktopView = useMediaQuery("(min-width:1100px)");

    if (desktopView) {
      return <NameHeader>{cookies.get("_auth_state").name}</NameHeader>;
    } else {
      return <MobileAccountModal />;
    }
  };

  const handleComplete = (otpValue: string) => {
    let parsedOtpValue = otpValue.startsWith("0")
      ? otpValue.toString().substring(1)
      : otpValue;
    console.log("This is the parsed ver: " + parsedOtpValue);
    fetch(
      "https://api.statbotics.io/v3/team_event/" +
        parsedOtpValue +
        "/" +
        queryParameters.get("eventname")
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response reported as not ok!!!");
        }
        return response.json();
      })
      .then((data) =>
        setTeamStats({
          ...data,
          epa: data.epa.breakdown.total_points,
          rank: data.record.qual.rank,
          wins: data.record.qual.wins,
          losses: data.record.qual.losses,
          teamName: data.team_name,
        })
      )
      .catch((error) => {
        toast.error(error + " Invalid Team Name!");
      });

    setTeamData((prevTeamData) => ({
      ...prevTeamData,
      teamNum: parsedOtpValue,
    }));
  };
  return (
    <div className="flex h-screen font-sans">
      {sideBar()}
      <div className=" bg-[#262626] w-full pr-4 pt-4 pb-4 ">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-7xl">
                  <h1 className="flex gap-5">
                    Team
                    <InputOTP
                      maxLength={4}
                      onComplete={handleComplete}
                      value={`${teamData.teamNum}`}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </h1>
                  <TeamName teamName={teamStats.teamName} />
                </ModalHeader>
                <ModalBody>
                  <Divider className="mb-3" />
                  <div className="flex w-full h-5 items-center justify-evenly text-small my-3">
                    <TeamStats
                      epa={teamStats.epa}
                      rank={teamStats.rank}
                      wins={teamStats.wins}
                      losses={teamStats.losses}
                    />
                  </div>
                  <Divider className="my-3" />
                  <div className="flex flex-col gap-6 w-full">
                    <Slider
                      size="sm"
                      step={1}
                      color="foreground"
                      label="Ability 1"
                      showSteps={true}
                      maxValue={10}
                      minValue={0}
                      value={teamData.ab1 == -1 ? 0 : teamData.ab1}
                      getValue={(abilityValue) => `${abilityValue}/10`}
                      onChange={(value: number | number[]) =>
                        handleAb1Change(Array.isArray(value) ? value[0] : value)
                      }
                    />
                    <Slider
                      size="sm"
                      step={1}
                      color="foreground"
                      label="Ability 2"
                      showSteps={true}
                      maxValue={10}
                      minValue={0}
                      value={teamData.ab2 == -1 ? 0 : teamData.ab2}
                      getValue={(abilityValue) => `${abilityValue}/10`}
                      onChange={(value: number | number[]) =>
                        handleAb2Change(Array.isArray(value) ? value[0] : value)
                      }
                    />
                    <Slider
                      size="sm"
                      step={1}
                      color="foreground"
                      label="Ability 3"
                      showSteps={true}
                      maxValue={10}
                      minValue={0}
                      value={teamData.ab3 == -1 ? 0 : teamData.ab3}
                      getValue={(abilityValue) => `${abilityValue}/10`}
                      onChange={(value: number | number[]) =>
                        handleAb3Change(Array.isArray(value) ? value[0] : value)
                      }
                    />
                  </div>
                  <Divider className="my-3" />
                  <div className="flex gap-3">
                    <div className="flex flex-col w-4/6 gap-2">
                      <TagInput
                        inputLabel={"Strengths"}
                        inputPlaceholder={"Add Strength"}
                        onTagsChange={handleStrengthTagsChange}
                        loadTags={teamData.strengths}
                      />
                      <TagInput
                        inputLabel={"Weaknesses"}
                        inputPlaceholder={"Add Weakness"}
                        onTagsChange={handleWeaknessTagsChange}
                        loadTags={teamData.weaknesses}
                      />
                    </div>
                    <div className="flex flex-col w-2/6 fileUP">
                      <FileUploader
                        imageUrl={teamData.botImage}
                        handleBotImageURL={handleBotImageURl}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <SaveTeamButton onPressFunction={onClose} data={teamData} />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="TeamContainer bg-background shadow-3xl p-10 rounded-lg">
          {condensedHeaderView()}
          <div className="grid justify-items-stretch mb-2">
            <ModalButton icon={<GroupAdd />} buttonContent={"New Team"}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-7xl">
                      <h1 className="flex gap-5">
                        Team
                        <InputOTP maxLength={4} onComplete={handleComplete}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </h1>
                      <TeamName teamName={teamStats.teamName} />
                    </ModalHeader>
                    <ModalBody>
                      <Divider className="mb-3" />
                      <div className="flex w-full h-5 items-center justify-evenly text-small my-3">
                        <TeamStats
                          epa={teamStats.epa}
                          rank={teamStats.rank}
                          wins={teamStats.wins}
                          losses={teamStats.losses}
                        />
                      </div>
                      <Divider className="my-3" />
                      <div className="flex flex-col gap-6 w-full">
                        <Slider
                          size="sm"
                          step={1}
                          color="foreground"
                          label="Ability 1"
                          showSteps={true}
                          maxValue={10}
                          minValue={0}
                          defaultValue={0}
                          getValue={(abilityValue) => `${abilityValue}/10`}
                          onChange={(value: number | number[]) =>
                            handleAb1Change(
                              Array.isArray(value) ? value[0] : value
                            )
                          }
                        />
                        <Slider
                          size="sm"
                          step={1}
                          color="foreground"
                          label="Ability 2"
                          showSteps={true}
                          maxValue={10}
                          minValue={0}
                          defaultValue={0}
                          getValue={(abilityValue) => `${abilityValue}/10`}
                          onChange={(value: number | number[]) =>
                            handleAb2Change(
                              Array.isArray(value) ? value[0] : value
                            )
                          }
                        />
                        <Slider
                          size="sm"
                          step={1}
                          color="foreground"
                          label="Ability 3"
                          showSteps={true}
                          maxValue={10}
                          minValue={0}
                          defaultValue={0}
                          getValue={(abilityValue) => `${abilityValue}/10`}
                          onChange={(value: number | number[]) =>
                            handleAb3Change(
                              Array.isArray(value) ? value[0] : value
                            )
                          }
                        />
                      </div>
                      <Divider className="my-3" />
                      <div className="flex gap-3">
                        <div className="flex flex-col w-4/6 gap-2">
                          <TagInput
                            inputLabel={"Strengths"}
                            inputPlaceholder={"Add Strength"}
                            onTagsChange={handleStrengthTagsChange}
                            loadTags={[]}
                          />
                          <TagInput
                            inputLabel={"Weaknesses"}
                            inputPlaceholder={"Add Weakness"}
                            onTagsChange={handleWeaknessTagsChange}
                            loadTags={[]}
                          />
                        </div>
                        <div className="flex flex-col w-2/6 fileUP">
                          <FileUploader
                            imageUrl={""}
                            handleBotImageURL={handleBotImageURl}
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <CreateTeamButton
                        onPressFunction={onClose}
                        data={teamData}
                      />
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </ModalButton>
          </div>
          <TeamTable deleteFunction={deleteTeam} editFunction={editTeam} />
        </div>
      </div>
    </div>
  );
}

export default App;
