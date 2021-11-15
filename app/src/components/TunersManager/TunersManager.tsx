import classes from "./TunersManager.module.css";
import commonClasses from "../../../common/css/common.module.css";
import React from "react";
import {Button, css, ThemeProvider, Typography} from "@mui/material";
import {ncTheme} from "@ts/nctheme";
import InfoTitle from "@components-app/InfoTitle/InfoTitle";
import {pageInfos} from "@models/pageinfos";
import {cssVariables} from "@models/cssvar";
import TunerPanel from "@components-app/TunerPanel/TunerPanel";
import {useAppDispatch, useAppSelector} from "@store-app/hooks";
import {fetchRemuxProgram} from "@store-app/actions/remux";
import {callResetTunersStatus, fetchTunersStatus} from "@store-app/actions/tunerStatus";
import SyncIcon from "@mui/icons-material/Sync";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {callResetTunersConfigChanged, fetchTunersConfig, setTunersConfig} from "@store-app/actions/tunersConfig";

let isInit = false;
//let test = false;

const TunersManager = () => {

  const dispatch = useAppDispatch();

  const { error, isLoading, tuners } = useAppSelector((state) => state.tunerStatus);

  const { changed, config } = useAppSelector((state) => state.tunersConfig);

  const [ waitForTunersUpdateTime, setWaitForTunersUpdateTime ] = React.useState(false);

  const isTunerConfigChanged = () => {
    if(changed == {} as TunersConfigChangedState)
      return false;
    let res = false;
    Object.entries(changed).forEach((item:[string, TunerConfig | false], index) => {
      if(item[1] !== false) {
        res = true;
        return;
      }
    })
    return res;
  }

  const saveTunersConfiguration = () => {
    setWaitForTunersUpdateTime(true);
    dispatch(callResetTunersStatus());
    //console.log(waitForTunersUpdateTime);
    //dispatch(resetTunersStatus());
    //console.log(waitForTunersUpdateTime);
    dispatch(fetchTunersConfig());
    let conf = { ...config };
    Object.entries(changed).forEach((item:[string, TunerConfig | false], index) => {
      if(item[1] !== false) {
        conf[item[0]] = item[1];
      }
    })
    dispatch(setTunersConfig(conf));
    const refreshTimeout = setTimeout(() => {
      isInit = false;
      dispatch(callResetTunersConfigChanged());
      setWaitForTunersUpdateTime(false);
    }, 15000);
  }

  React.useEffect(() => {
    console.log("TEST!?");
    const interval = setInterval(() => {
      console.log("TEST!");
      if(!waitForTunersUpdateTime) {
        dispatch(fetchTunersStatus());
      }
    }, 5000);
    if(!waitForTunersUpdateTime && !isInit) {
      console.log("TEST!!");
      dispatch(fetchTunersStatus());
      isInit = true;
    }
    return () => clearInterval(interval);
  }, [waitForTunersUpdateTime]);

  return (
    <ThemeProvider theme={ncTheme}>
      <div className={commonClasses.PageContainer}>
        <div className={commonClasses.PageHead}>
          <InfoTitle
            title={pageInfos.TunersManagerTitle}
            info={pageInfos.TunersManagerInfo} />
          {isTunerConfigChanged() ?
            <div id={"saveContainer"} className={commonClasses.Wrapper + " " + commonClasses.FlexRight}>
              <Typography
                className={commonClasses.FlexCenterVertical}
                component="p"
                style={{
                  color: cssVariables.colorTextLighter,
                  fontSize: "14px",
                  paddingRight: "16px",
                  maxWidth: "300px"
                }}>
                {waitForTunersUpdateTime ? "In attesa dell'applicazione delle modifiche." : "Alcuni parametri sono cambiati. Clicca su 'Salva' per confermare le modifiche."}
              </Typography>
              <Button disabled={waitForTunersUpdateTime}
                      className={commonClasses.SaveButton + " " + commonClasses.FlexCenterVertical}
                      variant={"outlined"}
                      onClick={saveTunersConfiguration} >
                {"Salva"}
              </Button>
            </div>
            : ""
          }
        </div>
        <div className={commonClasses.Container} style={{overflowY: "scroll", flex: 1, marginTop: "8px", paddingRight: "6px"}}>
          <div className={commonClasses.Row}>
            {(
              (Object.keys(tuners).length) ?
              Object.entries(tuners).map((tuner: [string, TunerStatus], i) => {
                return (
                  <TunerPanel key={tuner[0]} name={tuner[0]} currentTuner={tuner[1]} />
                );
              }) : (isLoading || waitForTunersUpdateTime ?
                <div className={commonClasses.Row} style={{paddingLeft: "12px", paddingTop: "6px"}}>
                  <div className={classes.LoadingContainer}>
                    <SyncIcon className={classes.RefreshIcon}/>
                    <Typography
                      component="h2"
                      variant="h5"
                      style={{
                        color: cssVariables.colorTextLighter,
                        fontSize: "calc(12px + 0.6vw)",
                        fontWeight: "bold"
                      }}>
                      {"In attesa delle informazioni sui ricevitori."}
                    </Typography>
                  </div>
                </div>
                  : (error ?
                <div className={commonClasses.Row} style={{paddingLeft: "12px", paddingTop: "6px"}}>
                  <div className={classes.LoadingContainer}>
                    <ErrorOutlineIcon htmlColor={cssVariables.colorError} className={classes.ErrorIcon}/>
                    <Typography
                      component="h2"
                      variant="h5"
                      style={{
                        color: cssVariables.colorTextLighter,
                        fontSize: "calc(12px + 0.6vw)",
                        fontWeight: "bold"
                      }}>
                      {"Non è stato possibile ottenere le informazioni sui ricevitori. Verrà effettuato un altro tentativo tra 5 secondi."}
                    </Typography>
                  </div>
                </div>
                : ""))
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default TunersManager;