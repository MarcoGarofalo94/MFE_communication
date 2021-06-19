import classes from "./Navigation.module.css";

import React from "react";
import useWindowSize from "@utils/hooks/useWindowSize";
import { Backdrop, Box, IconButton } from "@material-ui/core";

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (open: any) => any;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen,setIsOpen,children }) => {

  const [width, height] = useWindowSize();
  React.useEffect(() => {
    if (width <= 1360) {
      setIsOpen(false);
    } 
  }, [width]);

  React.useEffect(() => {
    const nav = document.getElementById(
      "app-navigation-react"
    ) as HTMLDivElement;
    nav!.addEventListener("touchstart", handleTouchStart, false);
    nav!.addEventListener("touchmove", handleTouchMove, false);

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
          setIsOpen(false);
          console.log("left");
        } else {
          setIsOpen(true);
          console.log("right");
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
    <>
      <Box
        boxShadow={2}
        borderRadius={"0 16px 0 0"}
        id="app-navigation-react"
        className={classes["app-navigation-react"]}
        style={{
          transform: `translateX(${isOpen ? 0 : -260}px)`,
          height: "100%",
        }}
      >
        <IconButton
          className={["icon-menu", classes.NavToggleButton].join(" ")}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />

        {children}
      </Box>
      {width < 1023 && (
        <Backdrop
          style={{ zIndex: 1049 }}
          open={isOpen}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
