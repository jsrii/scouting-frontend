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
import TableSelector from "./TableSelector";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Cookies from "universal-cookie";
import { Accordion, AccordionItem } from "@heroui/accordion";

const queryParameters = new URLSearchParams(window.location.search);

function eventChanger(key: React.ChangeEvent<HTMLSelectElement>) {
  queryParameters.set("eventname", key.target.value);
  window.history.replaceState(null, "", "?" + queryParameters.toString());
  window.location.reload();
}

export default function MobileAccountModal() {
  const cookies = new Cookies();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const signOut = useSignOut();
  const defaultContent =
    "blah blah blah blah blah blah blah blah .";
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
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-4xl">
                Settings
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <TableSelector
                  eventChanger={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Ability 2"
                    title="Ability 2"
                    className="text-sm"
                  >
                    {defaultContent}
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Ability 3"
                    title="Ability 3"
                    className="text-sm"
                  >
                    {defaultContent}
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
      </Modal>
    </>
  );
}
