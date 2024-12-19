import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { Children, ReactNode } from "react";
import TableSelector from "./TableSelector";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Cookies from 'universal-cookie';

const queryParameters = new URLSearchParams(window.location.search);

function eventChanger(key: string) {
  console.log(key.target.value);
  queryParameters.set("eventname", key.target.value);
  window.history.replaceState(null, "", "?" + queryParameters.toString());
  window.location.reload();
}


export default function MobileAccountModal() {
  const cookies = new Cookies();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const signOut = useSignOut();

  return (
    <>
      <a
        className="flex items-center gap-2 w-36 px-4 py-3 rounded-lg hover:bg-foreground-200"
        href="#"
        onClick={onOpen}
      >
        <Avatar isBordered src={cookies.get("_auth_state").avatarUrl} />
        <h1 className="text-l">{cookies.get("_auth_state").name}</h1>
      </a>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-5xl">
                Settings
              </ModalHeader>
              <ModalBody>
                <TableSelector eventChanger={eventChanger} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={() => {
                  signOut();
                  window.location.reload();
                }
                }>
                  Log Out
                </Button>
                <Button color="default" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
