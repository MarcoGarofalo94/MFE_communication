import classes from "./InfoTitle.module.css";
import React from "react";
import {Typography} from "@material-ui/core";
import {cssVariables} from "@models/cssvar";
import InfoIcon from '@mui/icons-material/Info';
import {IconButton} from "@mui/material";

interface InfoTitleProps {
  title: string;
  info: string;
}

const InfoTitle: React.FC<InfoTitleProps> = ({
  title,
  info
}) => {

  return (
    <div style={{ display: "flex", flexFlow: "row", width: "auto", alignItems: "center"}}>
      <Typography
        component="h2"
        variant="h5"
        style={{
          color: cssVariables.colorTextLighter,
          fontSize: "calc(12px + 0.6vw)",
          fontWeight: "bold"
        }}>
        {title}
      </Typography>
      <IconButton className={classes.IconButton} disableRipple={true} disableFocusRipple={true}>
        <InfoIcon style={{ color: cssVariables.colorTextLighter, fontSize: "calc(10px + 0.8vw)"}}/>
      </IconButton>
    </div>
  );
}

export default InfoTitle;