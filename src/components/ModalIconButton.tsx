import {
  Modal,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalButtonProps {
  gradientStart: string;
  gradientEnd: string;
  iconName: ReactNode;
  children: ReactNode;
}

export default function ModalButton({
  children,
  iconName,
}: ModalButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        color="default"
        size="lg"
        className="w-14 h-14 text-white hover:shadow-lg text-3xl"
        aria-label="Like"
        variant="light"
        onPress={onOpen}
      >
        {iconName}
      </Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        {children}
      </Modal>
    </>
  );
}
