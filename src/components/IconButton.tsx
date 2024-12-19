import { ReactNode } from "react";
import { Button } from "@nextui-org/react";

interface IconButtonProps {
  icon: ReactNode;
  children: ReactNode;
  executeFunction: Function;
}

function IconButton({ children, icon, executeFunction }: IconButtonProps) {
  return (
    <Button
      isIconOnly
      color="default"
      className="text-white w-14 h-14 hover:shadow-lg "
      aria-label="Like"
      variant="light"
      startContent={icon}
      onClick={() => executeFunction()}
    >
      {children}
    </Button>
  );
}

export default IconButton;
