import { SnackbarMessage, useSnackbar, VariantType } from "notistack";
import React from "react";

interface NotifcationProps {
  message?: SnackbarMessage;
  variant?: VariantType;
  disposeError?: () => any;
}

const Notification: React.FC<NotifcationProps> = ({
  message,
  variant,
  disposeError,
}) => {
  React.useEffect(() => {
    if (disposeError) {
      disposeError();
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message ?? "Something went wrong", {
    variant: variant ?? "default",
    onExit: disposeError ?? (() => null),
  });
  return <></>;
};

export default Notification;

