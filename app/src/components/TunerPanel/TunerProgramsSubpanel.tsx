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
import TunerPanel from "@components-app/TunerPanel/TunerPanel";

interface TunerProgramsSubpanelProps {
  name: string;
  currentTuner: TunerStatus;
}

interface ProgramRow {
  item: Program;
}

const ProgramRow: React.FC<ProgramRow> = ({
  item
}) => {

  const program = item as Program;

  return (
    <div className={commonClasses.Row} style={
      {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderBottom: "1px solid " + cssVariables.colorBorderDark,
        paddingBottom: "6px",
        paddingTop: "6px"
      }
    }>
      <p style={{ width: "30%"}}>
        <span>{program.pid}</span>
      </p>
      <p style={{ width: "30%"}}>
        <span>{program.pid}</span>
      </p>
      <p style={{ width: "30%"}}>
        <span>{program.pname}</span>
      </p>
    </div>
  );
};


const TunerProgramsSubpanel: React.FC<TunerProgramsSubpanelProps> = ({
  name,
  currentTuner
}) => {
  const currentPrograms = currentTuner.programs as Program[];


  return (
    <div className={classes.PanelWrapper}>
      <div className={commonClasses.Container} style={
        {
          border: "1px solid " + cssVariables.colorBorderDark,
          borderRadius: "8px",
          padding: "8px",
          display: "flex",
          flexDirection: "column"
        }
      }>
        <div className={commonClasses.Row} style={
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderBottom: "1px solid " + cssVariables.colorBorderDark,
            paddingBottom: "6px"
          }
        }>
          <p style={{ width: "30%"}}>
            <strong>LCN</strong>
          </p>
          <p style={{ width: "30%"}}>
            <strong>PID</strong>
          </p>
          <p style={{ width: "30%"}}>
            <strong>Name</strong>
          </p>
        </div>
        <div className={commonClasses.Container} style={{height: "229px", marginTop: "8px", overflowY: "scroll"}}>
          <div className={commonClasses.Row} style={{height: "auto"}}>
            {(Object.keys(currentPrograms).length ?
              Object.entries(currentPrograms).map((prog: [string, Program], i) => {
                return (
                  <ProgramRow item={prog[1]}/>
                );
              }) : "")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TunerProgramsSubpanel;
