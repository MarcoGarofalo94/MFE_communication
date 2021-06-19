import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Portal } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "5rem auto 0 auto",
      maxHeight: "calc(100vh - 30px)",
      overflowY: "auto",
    },
    paper: {
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const CustomModal = ({ children, isOpen, handleClose }) => {
  const classes = useStyles();

  const portal = document.getElementById("portal");

  return (
    <Portal container={portal}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isOpen}>
            <div className={classes.paper}>{children}</div>
          </Fade>
        </Modal>
      </div>
    </Portal>
  );
};

export default CustomModal;
