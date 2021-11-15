import classes from "./TunerPanel.module.css";
import commonClasses from "../../../common/css/common.module.css";
import React from "react";
import { cssVariables } from "@models/cssvar";
import { ncTheme } from "@ts/nctheme";
import { pageInfos } from "@models/pageinfos";
import {
  Button,
  FormControl, Input,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@store-app/hooks";
import {toggleTunersConfigChanged} from "@store-app/actions/tunersConfig";

interface TunerConfigStatusSubpanelProps {
  name: string;
  currentTuner: TunerStatus;
}

const TunerConfigStatusSubpanel: React.FC<TunerConfigStatusSubpanelProps> = ({
  name,
  currentTuner
}) => {
  const TunerSignalType = [
    {
      display: "DVB-T",
      key: "qamfreq_t",
      value: 0,
    },
    {
      display: "DVB-T2",
      key: "qamfreq_t2",
      value: 1
    },
    {
      display: "DVB-C",
      key: "qamfreq_c",
      value: 2
    }
  ];
  const [currentTunerSignalType, setCurrentTunerSignalType] = React.useState(
    (currentTuner.configuration && currentTuner.configuration.t2_tuner_signal_type) ?? TunerSignalType[1].value
  );
  const [currentTunerFrequency, setCurrentTunerFrequency] = React.useState(
    currentTuner.configuration && currentTuner.configuration[TunerSignalType[currentTunerSignalType].key]
  );
  const dispatch = useAppDispatch();
  const { changed } = useAppSelector((state) => state.tunersConfig);

  const isTunerSignalTypeChanged = () => {
    if(currentTuner.configuration) {
      return currentTunerSignalType != currentTuner.configuration.t2_tuner_signal_type;
    }
    return false;
  }

  const isTunerFrequencyChanged = () => {
    if(currentTuner.configuration) {
      return currentTunerFrequency != currentTuner.configuration[TunerSignalType[currentTunerSignalType].key];
    }
    return false;
  }

  React.useEffect(()=> {
    if(isTunerSignalTypeChanged() || isTunerFrequencyChanged()) {
      const currentConf = { ...currentTuner.configuration };
      currentConf.t2_tuner_signal_type = currentTunerSignalType;
      currentConf[TunerSignalType[currentTunerSignalType].key] = currentTunerFrequency;
      dispatch(toggleTunersConfigChanged(name, currentConf));
    } else
      dispatch(toggleTunersConfigChanged(name, false));
  }, [currentTunerSignalType, currentTunerFrequency]);

  return (
      <div className={classes.PanelWrapper} style={{paddingTop: "12px"}}>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontWeight: isTunerSignalTypeChanged() ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            {isTunerSignalTypeChanged() ? "Tipologia di segnale (*)" : "Tipologia di segnale"}
          </Typography>
          <Select
            value={currentTunerSignalType}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e) => {
              setCurrentTunerSignalType(parseInt(e.target.value.toString()));
              if(currentTuner.configuration)
                setCurrentTunerFrequency(currentTuner.configuration[TunerSignalType[parseInt(e.target.value.toString())].key]);
            }}
            autoWidth
            sx={{
              marginLeft: "auto",
              width: "100px",
              boxShadow: isTunerSignalTypeChanged() ? '0 0 0 0.2rem rgba(0,123,255,.5)' : '',
            }}
          >
            <MenuItem value={TunerSignalType[0].value}>{TunerSignalType[0].display}</MenuItem>
            <MenuItem value={TunerSignalType[1].value}>{TunerSignalType[1].display}</MenuItem>
            <MenuItem value={TunerSignalType[2].value}>{TunerSignalType[2].display}</MenuItem>
          </Select>
        </div>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "8px"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontWeight: isTunerFrequencyChanged() ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            {isTunerFrequencyChanged() ? "Frequenza (KHz) (*)" : "Frequenza (KHz)"}
          </Typography>
          <Input
            inputProps={{ "aria-label": "Without label" }}
            onKeyDown={(e) => {
              if (e.key == "e" || e.key == "E" || e.key == "+" || e.key == "-" || e.key == "." || e.key == ",")
                e.preventDefault();
            }}
            disableUnderline
            type={"number"}
            value={currentTunerFrequency}
            onChange={(e) => {
              setCurrentTunerFrequency(e.target.value);
            }}
            sx={{
              marginLeft: "auto",
              width: "100px",
              borderRadius: isTunerFrequencyChanged() ? '4px' : '',
              boxShadow: isTunerFrequencyChanged() ? '0 0 0 0.2rem rgba(0,123,255,.5)' : '',
            }} />
        </div>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "14px"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
            }}
          >
            {"Bit Error Rate (BER)"}
          </Typography>
          <Typography
            className={commonClasses.Inline}
            component="p"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "auto"
            }}
            >
            {currentTuner.BER}
          </Typography>
        </div>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
            }}
          >
            {"Signal To Noise Ratio (SNR)"}
          </Typography>
          <Typography
            className={commonClasses.Inline}
            component="p"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "auto"
            }}
          >
            {currentTuner.Eb}
          </Typography>
        </div>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
            }}
          >
            {"Strength"}
          </Typography>
          <Typography
            className={commonClasses.Inline}
            component="p"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "auto"
            }}
          >
            {currentTuner.Strength}
          </Typography>
        </div>
        <div className={commonClasses.Row} style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px"}}>
          <Typography
            className={commonClasses.Inline}
            component="h2"
            variant="h5"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
            }}
          >
            {"Quality"}
          </Typography>
          <Typography
            className={commonClasses.Inline}
            component="p"
            style={{
              color: cssVariables.colorTextLighter,
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "auto"
            }}
          >
            {currentTuner.bitrates?.quality}
          </Typography>
        </div>
      </div>
  );
};

export default TunerConfigStatusSubpanel;
