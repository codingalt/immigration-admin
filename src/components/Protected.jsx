import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery } from "../services/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setNotiCount, setUserData } from "../services/redux/userSlice";
import io from "socket.io-client";
import MainContext from "./Context/MainContext";
import { useMemo } from "react";
import { toastSuccess } from "./Toast";
import { useGetNotificationCountAdminQuery, useGetNotificationCountCaseWorkerQuery } from "../services/api/applicationApi";
const ENDPOINT = import.meta.env.VITE_IMG_URI;
var socket, selectedChatCompare;

const Protected = ({ Component }) => {
  const { user } = useSelector((state) => state.user);
  const [getData, setGetData] = useState();
  const [getData2, setGetData2] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(null);
  const { data, isSuccess, isLoading } = useAuthQuery();

  console.log(data?.data);

  const {
    data: countData,
    refetch: refetchCount,
    isLoading: isLoadingCount,
  } = useGetNotificationCountAdminQuery();

  const {
    data: countWorker,
    refetch: refetchCountWorker,
    isLoading: isLoadingCountWorker,
  } = useGetNotificationCountCaseWorkerQuery();

  useEffect(()=>{
    if(countData){
      dispatch(setNotiCount(countData.count));
    }
  },[countData]);

  useEffect(() => {
    if (countWorker && user?.isCaseWorker) {
      dispatch(setNotiCount(countWorker.count));
    }
  }, [countWorker,user]);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (data) {
      socket.emit("setup", data?.data);
      socket.on("connected", () => {});
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      socket.emit("setup", data?.data?._id);
      socket.emit("join chat", data?.data?._id);
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      setShow(false);
      !isLoading && navigate("/");
    } else {
      dispatch(setUserData(data));
      setShow(true);
    }
  }, [data, isLoading, isSuccess]);

    useMemo(() => {
      if (getData) {
        toastSuccess("New Phase Request from client");
      }
    }, [getData]);

  useEffect(() => {
    socket?.on("phase data received", async (request) => {
      if (request) {
        console.log("Noti count app: protected", request);
        setGetData(request?.result);
        !isLoadingCount && refetchCount();
      }
    });
  });

  useEffect(() => {
    socket?.on("caseworker noti received", async (request) => {
      if (request) {
        console.log("Noti count app: protected (Case Worker)", request);
        setGetData2(request?.result);
        !isLoadingCountWorker && refetchCountWorker();
      }
    });
  });

  return (
    show && (
      <MainContext.Provider value={{ socket }}>
        <Component
          getData={getData}
          setGetData={setGetData}
          getData2={getData2}
          setGetData2={setGetData2}
        />
      </MainContext.Provider>
    )
  );
};

export default Protected;
