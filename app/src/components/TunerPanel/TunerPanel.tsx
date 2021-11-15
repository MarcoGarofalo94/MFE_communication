import classes from "./TunerPanel.module.css";
import commonClasses from "../../../common/css/common.module.css";
import React from "react";
import {cssVariables} from "@models/cssvar";
import {ncTheme} from "@ts/nctheme";
import {pageInfos} from "@models/pageinfos";
import {Button, ThemeProvider, Typography} from "@mui/material";
import TunerConfigStatusSubpanel from "@components-app/TunerPanel/TunerConfigStatusSubpanel";
import TunerProgramsSubpanel from "@components-app/TunerPanel/TunerProgramsSubpanel";
import TunerGraphSubpanel from "@components-app/TunerPanel/TunerGraphSubpanel";
import SyncIcon from '@mui/icons-material/Sync';
import {useAppSelector} from "@store-app/hooks";

interface TunerPanelProps {
  name: string,
  currentTuner: TunerStatus
}

const TunerPanel: React.FC<TunerPanelProps> = ({name, currentTuner}) => {

  const { error, isLoading, tuners } = useAppSelector((state) => state.tunerStatus);

  return (
    <ThemeProvider theme={ncTheme}>
      <div className={classes.PanelContainer}  style={{marginBottom: "8px", position:"relative", float:"left", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        <div className={commonClasses.Row} style={{paddingLeft: "6px"}}>
          <div
            className={currentTuner.lock == 1 ? classes.CircleStatusOK + " " + commonClasses.Inline : classes.CircleStatusError + " " + commonClasses.Inline}
          />
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "16px",
              fontWeight: "bold",
              marginLeft: "8px",
              marginTop: "-1px",
            }}
          >
            {name}
          </Typography>
          <SyncIcon className={classes.RefreshIcon} style={{ visibility: isLoading ? "visible" : "hidden" }}/>
        </div>
        <div className={commonClasses.Container} style={{display: "flex", flexDirection: "row", flexWrap: "wrap", maxHeight: "408px", justifyContent: "center"}}>
          <TunerConfigStatusSubpanel name={name} currentTuner={currentTuner} />
          <TunerProgramsSubpanel name={name} currentTuner={currentTuner}/>
          <TunerGraphSubpanel name={name} currentTuner={currentTuner} type={1} />
          <TunerGraphSubpanel name={name} currentTuner={currentTuner} type={0}/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default TunerPanel;