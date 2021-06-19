import React from "react";
import classes from "./MainContent.module.css";
interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className={classes["app-content"]} id="app-content">
      {children}
    </div>
  );
};

export default MainContent;
