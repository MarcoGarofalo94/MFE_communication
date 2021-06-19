import { Box, IconButton } from "@material-ui/core";
import  useWindowSize  from "@utils/hooks/useWindowSize";
import React from "react";

import classes from "./RightSideBar.module.css";

interface RightSideBarProps {}

const RightSideBar: React.FC<RightSideBarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [width, height] = useWindowSize();
  React.useEffect(() => {
    if (width <= 1023) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [width]);

  React.useEffect(() => {
    const sidebar = document.getElementById("app-sidebar") as HTMLDivElement;
    sidebar!.addEventListener("touchstart", handleTouchStart, false);
    sidebar!.addEventListener("touchmove", handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
      return (
        evt.touches || // browser API
        evt.originalEvent.touches
      ); // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown! - xUp;
      var yDiff = yDown! - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          setIsOpen(true);
          //console.log("left");
        } else {
          setIsOpen(false);
          //console.log("right");
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
        } else {
          /* down swipe */
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }, []);
  return (
    <Box
    boxShadow={2}
    color="primary.main"
      className={classes["app-sidebar"]}
      id="app-sidebar"
      style={{ transform: `translateX(${isOpen ? 0 : 260}px)`, height: "100%" }}
    >
      <IconButton
        className={["icon-menu", classes.NavToggleButton].join(" ")}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {children}
    </Box>
  );
};

export default RightSideBar;