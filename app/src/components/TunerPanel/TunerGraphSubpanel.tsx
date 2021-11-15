import classes from "./TunerPanel.module.css";
import commonClasses from "../../../common/css/common.module.css";
import React from "react";
import { cssVariables } from "@models/cssvar";
import { ncTheme } from "@ts/nctheme";
import { pageInfos } from "@models/pageinfos";
import {
  Button, css,
  FormControl, Input,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";

interface TunerGraphSubpanelProps {
  name: string;
  currentTuner: TunerStatus;
  type: number;
}

const TunerGraphSubpanel: React.FC<TunerGraphSubpanelProps> = ({
  name,
  currentTuner,
  type
}) => {
  const id =  currentTuner.configuration?.tunerIndex != undefined && parseInt(currentTuner.configuration.tunerIndex.toString()) + 1;


  return (
    <div className={classes.PanelWrapper}>
      <div className={commonClasses.Container} style={{border: "1px solid " + cssVariables.colorBorderDark, borderRadius: "8px", padding: "8px", overflow: "hidden"}}>

        <iframe src={"/apps/videoviewer/test?id=" + id + "&type=" + type + "&theme=light"} frameBorder="0" scrolling={"no"} sandbox={"allow-same-origin allow-scripts allow-forms allow-top-navigation"} style={{
          width: "calc(100% + 48px)",
          height: "calc(100% + 34px)",
          marginLeft: "-21px",
          marginTop: "-21px",
          overflow: "hidden",
          paddingRight: "6px"
        }}></iframe>
      </div>
    </div>
  );
};

export default TunerGraphSubpanel;
