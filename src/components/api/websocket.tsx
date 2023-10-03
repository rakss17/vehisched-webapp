import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export function VehicleAvailableWebsocket(setVehiclesData: any) {
  const newSocket = new WebSocket("ws://localhost:8000/ws/vehicle/available/");

  newSocket.onopen = (event) => {
    console.log("WebSocket connection opened");
    newSocket.send(
      JSON.stringify({
        action: "fetch_available_vehicles",
      })
    );
  };

  newSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received WebSocket message:", data);
    if (data.type === "available.vehicles") {
      setVehiclesData(data.data);
    } else if (data.type === "status.update") {
      console.log("Received status update:", data.message);
      const plateNumber = data.data.plate_number;
      if (data.message.includes("added")) {
        setVehiclesData((prevVehicles: any) => [...prevVehicles, data.data]);
      } else if (data.message.includes("removed")) {
        setVehiclesData((prevVehicles: any) =>
          prevVehicles.filter(
            (vehicle: any) => vehicle.plate_number !== plateNumber
          )
        );
      }
    }
  };

  newSocket.onclose = (event) => {
    console.log("WebSocket connection closed");
  };

  return () => {
    newSocket.close();
  };
}

export function RequestApproveWebsocket(userName: any) {
  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://localhost:8000/ws/request/approve/?requester_name=${userName}`
    );

    newSocket.onopen = (event) => {
      console.log("Request WebSocket connection opened");
      newSocket.send(
        JSON.stringify({
          action: "approve",
        })
      );
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "approve.notification" &&
        data.status === "Approved" &&
        data.message != "Notification message goes here"
      ) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return null;
}

export function NotificationWebsocket() {
  const newSocket = new WebSocket(
    "ws://localhost:8000/ws/notification/created/"
  );

  newSocket.onopen = (event) => {
    console.log("Notification WebSocket connection opened");
    newSocket.send(
      JSON.stringify({
        action: "created",
      })
    );
  };

  newSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (
      data.type === "notify.request_created" &&
      data.message != "Notification message goes here"
    ) {
      console.log("createad", data);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };

  newSocket.onclose = (event) => {
    console.log("WebSocket connection closed");
  };

  return () => {
    newSocket.close();
  };
}
