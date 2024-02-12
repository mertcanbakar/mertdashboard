/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

function DialogForm({
  dialogOpen,
  setDialogOpen,
  buttonName,
  processType,
  click,
  disabled,
  modalTitle,
  modalSize = "600px",
  isActive,
  saveClick,
  editClick,
  deleteClick,
  cancelClick,
  saveButton = true,
  isClosingOk,
  setIsClosingOk,
  children,
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    if (dialogOpen === false) setDialogOpen(true);
    else setOpen(true);

    if (setIsClosingOk) setIsClosingOk(false);

    if (click) click();
    setScroll(scrollType);
  };

  const handleClose = () => {
    if (dialogOpen) {
      setDialogOpen(false);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isClosingOk) handleClose();
  }, [isClosingOk]);

  let buttonContent;
  switch (buttonName) {
    case "edit":
      buttonContent = (
        <IconButton
          color="primary"
          onClick={handleClickOpen("paper")}
          disabled={disabled}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      );
      break;
    default:
      buttonContent = (
        <Button
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={handleClickOpen("paper")}
        >
          {t(buttonName)}
        </Button>
      );
      break;
  }

  return (
    <>
      {buttonContent}

      <Dialog
        open={dialogOpen ?? open}
        // onClose={handleClose}
        scroll={scroll}
        fullWidth
        sx={{ "& .MuiPaper-root": { maxWidth: modalSize } }}
      >
        <Grid container justify="space-between" alignItems="center">
          <DialogTitle style={{ width: `${isActive ? "80%" : "100%"}` }}>
            {t(modalTitle)}
          </DialogTitle>
        </Grid>
        <DialogContent dividers={scroll === "paper"}>{children}</DialogContent>

        <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
          <Button
            id="dialogFormCancelButton"
            sx={{ color: theme.palette.grey[500] }}
            onClick={() => {
              handleClose();

              if (
                processType !== "edit" &&
                processType !== "delete" &&
                processType !== "newAdd"
              )
                cancelClick && cancelClick();
            }}
          >
            {t("cancel")}
          </Button>
          {saveButton && (
            <Button
              variant="contained"
              size="small"
              className={classNames({
                "bg-green-600 hover:bg-green-700": processType === "new",
                "bg-blue-600 hover:bg-blue-700": processType === "edit",
                "bg-red-600 hover:bg-red-700": processType === "delete",
              })}
              onClick={() => {
                if (processType === "edit") {
                  editClick();
                } else if (processType === "delete") {
                  deleteClick();
                } else {
                  saveClick();
                }

                if (isClosingOk === undefined) handleClose();
              }}
            >
              {processType === "edit"
                ? t("update")
                : processType === "delete"
                ? t("delete")
                : t("save")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogForm;
