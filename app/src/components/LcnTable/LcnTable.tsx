import classes from "./LcnTable.module.css";
import commonClasses from "../../../common/css/common.module.css";
import React from "react";
import {cssVariables} from "@models/cssvar";
import {ncTheme} from "@ts/nctheme";
import {pageInfos} from "@models/pageinfos";
import InfoTitle from "@components-app/InfoTitle/InfoTitle";
import {Button, ThemeProvider, Typography} from "@mui/material";


const LcnTable = () => {

  return (
    <ThemeProvider theme={ncTheme}>
      <div className={commonClasses.PageContainer}>
        <div className={commonClasses.PageHead}>
          <InfoTitle
            title={pageInfos.LcnTableTitle}
            info={pageInfos.LcnTableInfo} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LcnTable;