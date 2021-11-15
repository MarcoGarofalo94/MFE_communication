import useWindowSize from "@utils/hooks/useWindowSize";
import Navigation from "@components-app/Navigation/Navigation";
import NavigationMenu from "@components-app/NavigationMenu/NavigationMenu";
import MainContent from "@components-app/MainContent/MainContent";
import React from "react";

import AvTimerIcon from "@material-ui/icons/AvTimer";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PieChartIcon from "@material-ui/icons/PieChart";
import TableChartIcon from "@material-ui/icons/TableChart";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { EntryType } from "@components-app/NavigationMenuItem/NavigationMenuItem";
import {useAppDispatch, useAppSelector} from "@store-app/hooks";
import {setSelectedPage} from "@store-app/reducers/page";
import {Typography} from "@material-ui/core";
import {cssVariables} from "@models/cssvar";

import LcnTable from "@components-app/LcnTable/LcnTable";
import TunersManager from "@components-app/TunersManager/TunersManager";
import {pageInfos} from "@models/pageinfos";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [width, height] = useWindowSize();
  const { selectedPage } = useAppSelector((state) => state.page);
  let form = <LcnTable />;

  switch (selectedPage) {
    case "LCN_TABLE":
      form = <LcnTable />;
      break;
    case "TUNERS_MANAGER":
      form = <TunersManager />;
      break;
    default:
      form = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorMainText,
              margin: "2em auto",
              fontSize: "calc(12px + 1vw)",
            }}
          >
            Select an option from the{" "}
            <strong
              style={{
                textDecoration: "underline",
                color: cssVariables.colorPrimaryElement,
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(true)}
            >
              sidebar
            </strong>{" "}
            to start.
          </Typography>
        </div>
      );
  }


  const dispatch = useAppDispatch();
  const entries: EntryType[] = [
    {
      id: "0",
      labelText: pageInfos.LcnTableTitle,
      labelIcon: TableChartIcon,
      color: "#000000",
      bgColor: "#71C6FF",
      children: [],
      action: () => dispatch(setSelectedPage("LCN_TABLE")),
    },
    {
      id: "1",
      labelText: "Sorteggio",
      labelIcon: TableChartIcon,
      color: "#000000",
      bgColor: "#71C6FF",
      children: [],
      action: () => dispatch(setSelectedPage("LCN_DRAWER")),
    },
    {
      id: "2",
      labelText: pageInfos.TunersManagerTitle,
      labelIcon: TableChartIcon,
      color: "#000000",
      bgColor: "#71C6FF",
      children: [],
      action: () => dispatch(setSelectedPage("TUNERS_MANAGER")),
    },
    {
      id: "3",
      labelText: "Emittenti da registrare",
      labelIcon: TableChartIcon,
      color: "#000000",
      bgColor: "#71C6FF",
      children: [],
      action: () => dispatch(setSelectedPage("LCN_SELECTOR")),
    },
    {
      id: "4",
      labelText: "Sistema di registrazione",
      labelIcon: TableChartIcon,
      color: "#000000",
      bgColor: "#71C6FF",
      children: [],
      action: () => dispatch(setSelectedPage("RECORD_SYSTEM_MANAGER")),
    }
  ];

  return (
    <div id="app">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen}>
        <NavigationMenu entries={entries} isOpen={isOpen} />
      </Navigation>

      <MainContent>
        <main
          id="main-content1"
          style={{
            transform: `translateX(${isOpen && width > 1023 ? 260 : 0}px)`,
            transition: "transform .35s ease-in-out",
          }}
        >
          {form}
        </main>
      </MainContent>
    </div>
  );
};

export default App;