import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";

function Home() {
  const desktopView = useMediaQuery("(min-width:800px)");

  if (desktopView) {
    return <DesktopApp />;
  } else {
    return <MobileApp />;
  }
};

export { Home };
