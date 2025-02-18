import { Modal, Button, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalButtonProps {
  icon: ReactNode;
  buttonContent: string;
  children: ReactNode;
}

export default function ModalButton({
  children,
  icon,
  buttonContent,
}: ModalButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        className=" text-white flex gap-3 justify-self-end"
        aria-label="Like"
        startContent={icon}
        onPress={onOpen}
      >
        {buttonContent}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        {children}
      </Modal>
    </>
  );
}
