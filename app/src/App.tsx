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

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [width, height] = useWindowSize();

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
          Main Content
        </main>
      </MainContent>
      {/* <RightSideBar>Side Bar</RightSideBar> */}
    </div>
  );
};

export default App;

const entries: EntryType[] = [
  {
    id: "0",
    labelText: "Entry 0",
    labelIcon: TableChartIcon,
    color: "#000000",
    bgColor: "#69f0ae",
    children: [
      {
        id: "0-1",
        labelText: "Item 0-1",
        labelIcon: ChromeReaderModeIcon,
        action: () => console.log("item 0-1"),
      },
    ],
  },
  {
    id: "1",
    labelText: "Entry 1",
    labelIcon: TableChartIcon,
    color: "#000000",
    bgColor: "#69f0ae",
    children: [
      {
        id: "1-0",
        labelText: "Item 1-0",
        labelIcon: ChromeReaderModeIcon,
        action: () => console.log("item 1-0"),
      },
    ],
  },
  {
    id: "2",
    labelText: "Entry 2",
    labelIcon: TableChartIcon,
    color: "#000000",
    bgColor: "#69f0ae",
    children: [
      {
        id: "2-0",
        labelText: "Item 2-0",
        labelIcon: ChromeReaderModeIcon,
        action: () => console.log("item 2-0"),
      },
      {
        id: "2-1",
        labelText: "Item 2-1",
        labelIcon: ChromeReaderModeIcon,
        action: () => console.log("item 2-1"),
        children: [
          {
            id: "2-1-0",
            labelText: "Item 2-1-0",
            labelIcon: ChromeReaderModeIcon,
            action: () => console.log("item 2-1-0"),
          },
        ],
      },
    ],
  },
];
