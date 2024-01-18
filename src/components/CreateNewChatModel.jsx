import React, { useMemo } from 'react'
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Box } from '@mui/material';
import Divider from "@mui/material/Divider";
import { useCreateChatMutation } from '../services/api/chatApi';
import { toastError } from './Toast';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from 'react-redux';

const CreateNewChatModel = ({
  setNewChatModel,
  newChatModel,
  caseworkers,
  handleChatClick,
  refetch,
}) => {
  const [createChat, res] = useCreateChatMutation();
  const { isLoading, error, isSuccess, data } = res;
  const { user } = useSelector((state) => state.user);
  const handleClose = () => {
    setNewChatModel(false);
  };

  useMemo(() => {
    if (isSuccess) {
      console.log("Success", data?.chat);
      handleChatClick(data?.chat);
      setNewChatModel(false);
      refetch();
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError(
        error?.data?.message ? error.data.message : "Something went wrong"
      );
    }
  }, [error]);

  const handleCreateChat = async (item) => {
    await createChat({ receiverId: item.userId });
  };

  return (
    <>
      <Dialog onClose={handleClose} open={newChatModel}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Select User</DialogTitle>
        <Divider light />
        <List sx={{ p: 1.4, pb: 2.9, minWidth: "390px" }}>
          {caseworkers?.caseWorker?.map((item) => (
            item.userId != user?._id &&
            <ListItem
              disableGutters
              key={item._id}
              onClick={() => handleCreateChat(item)}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {item?.name?.slice(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <ListItemText primary={item.name} />
                  <ListItemText
                    sx={{ mt: -0.4, fontSize: ".8rem" }}
                    secondary={item.email}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default CreateNewChatModel