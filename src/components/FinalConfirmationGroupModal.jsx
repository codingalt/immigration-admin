import React, { useContext, useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { toastError, toastSuccess } from "./Toast";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { TiTick } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import pdfImg from "../assests/pdf-img.png";
import MainContext from "./Context/MainContext";
import Loader from "./Loader";
import { useFinalGroupConfirmationMutation } from "../services/api/companyClient";

const FinalConfirmationGroupModal = ({
  confirmationModal,
  setConfirmationModal,
  applicationId,
  userId,
}) => {
  const { socket } = useContext(MainContext);
  const [pdf, setPdf] = useState();
  const [description, setDescription] = useState();
  const pdfRef = useRef();
  const [finalConfirmationMutat, res] = useFinalGroupConfirmationMutation();
  const { isLoading, error, isSuccess } = res;

  const handleClose = () => {
    setConfirmationModal(false);
  };

  useMemo(() => {
    if (error) {
      toastError(
        error?.data?.message ? error?.data?.message : "Something went wrong"
      );
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      handleClose();
      toastSuccess("Response sent to client Successfully");
      setDescription(null);
      setPdf(null);
    }
  }, [isSuccess]);

  const openFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pdf = e.target.files[0];
      console.log(pdf);
      setPdf(pdf);
    }
  };

  const handleSubmit = async (approve) => {
    if (!description || !pdf) {
      toastError("Please provide the required details");
      return;
    }

    let formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("description", description);
    formData.append("isApprove", approve);
    formData.append("applicationId", applicationId);

    if (approve) {
      // Approve the application
      await finalConfirmationMutat({
        formData: formData,
        applicationId: applicationId,
      });

      socket.emit("phase notification", {
        userId: userId,
        applicationId: applicationId,
        phase: 5,
        phaseStatus: "approved",
        phaseSubmittedByClient: 4,
        finalConfirmation: "approved",
      });
    } else {
      // Decline the Application
      await finalConfirmationMutat({
        formData: formData,
        applicationId: applicationId,
      });

      socket.emit("phase notification", {
        userId: userId,
        applicationId: applicationId,
        phase: 5,
        phaseStatus: "rejected",
        phaseSubmittedByClient: 4,
        finalConfirmation: "rejected",
      });
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={confirmationModal} hideBackdrop>
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "transparent",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Final Confirmation</DialogTitle>
        <Divider light />
        <Box sx={{ p: 1.4, pb: 2.9, px: 3, minWidth: "540px" }}>
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              background: "rgba(93, 152, 46, 1)",
              margin: ".3rem auto",
            }}
          >
            <TiTick fontSize={"3.4rem"} />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "3.2rem",
              background:
                "linear-gradient(0deg, #E2E2E4, #E2E2E4),linear-gradient(0deg, #F7F7F7, #F7F7F7)",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              mt: 3,
              cursor: "pointer",
            }}
            onClick={() => pdfRef.current.click()}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <FiUpload fontSize={"1.3rem"} color="rgba(106, 108, 111, 1)" />
              <Typography color="rgba(119, 119, 119, 1)">
                {pdf?.name ? pdf.name.slice(0, 43) : "Upload PDF"}
              </Typography>
            </Box>
            <input
              ref={pdfRef}
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={(event) => openFile(event)}
              style={{ display: "none" }}
            />
            <Box sx={{ mt: 0.5 }}>
              <img src={pdfImg} alt="" />
            </Box>
          </Box>

          {/* Description  */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "12px",
              mt: 1.5,
            }}
          >
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                // background:
                //   "linear-gradient(0deg, #E2E2E4, #E2E2E4),linear-gradient(0deg, #F7F7F7, #F7F7F7)",
                height: "100%",
                width: "100%",
                borderRadius: "12px",
                padding: "15px 15px",
                outline: "none",
                border: "1px solid gray",
                background:
                  "linear-gradient(0deg, #E2E2E4, #E2E2E4),linear-gradient(0deg, #F7F7F7, #F7F7F7)",
              }}
              rows={9}
              cols={10}
              placeholder="Type Description"
            />
          </Box>

          {/* Buttons  */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 3,
              gap: "15px",
            }}
          >
            <Button
              disabled={isLoading}
              sx={{ px: 3, borderRadius: ".5rem", width: "8rem" }}
              variant="outlined"
              color="error"
              onClick={() => handleSubmit(false)}
            >
              {isLoading ? "Decline.." : "Decline"}
            </Button>
            <Button
              disabled={isLoading}
              sx={{
                width: "8rem",
                px: 4,
                py: 0.7,
                bgcolor: "#5D982E",
                borderRadius: ".5rem",
              }}
              variant="contained"
              color="success"
              onClick={() => handleSubmit(true)}
            >
              {isLoading ? "Approve.." : "Approve"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default FinalConfirmationGroupModal;
