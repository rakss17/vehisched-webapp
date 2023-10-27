import { useEffect } from "react";
import { toast } from "react-toastify";

const serverSideUrl = "localhost:8000"

export function NotificationApprovalScheduleReminderWebsocket(userName: any) {
  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://${serverSideUrl}/ws/notification/approval_schedule-reminder/?requester_name=${userName}`
    );

    newSocket.onopen = (event) => {
      console.log(
        "Notification approval and schedule reminder connection opened"
      );
      newSocket.send(
        JSON.stringify({
          action: ["approve", "reminder"],
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
      } else if (
        data.type === "schedule.reminder" &&
        data.message != "Notification message goes here"
      ) {
        toast.info(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
    };

    newSocket.onclose = (event) => {
      console.log(
        "Notification approval and schedule reminder connection closed"
      );
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return null;
}

export function NotificationCreatedCancelWebsocket() {
  const newSocket = new WebSocket(
    `ws://${serverSideUrl}/ws/notification/created_cancel/`
  );

  newSocket.onopen = (event) => {
    console.log("Notification created and cancel WebSocket connection opened");
    newSocket.send(
      JSON.stringify({
        action: ["created", "canceled"],
      })
    );
  };

  newSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (
      data.type === "notify.request_created" &&
      data.status === "Created" &&
      data.message != "Notification message goes here for created"
    ) {
      console.log("createad", data);
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
      });
    } else if (
      data.type === "notify.request_canceled" &&
      data.message != "Notification message goes here for canceled"
    ) {
      console.log("canceled", data);
      toast.info(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
      });
    }
  };

  newSocket.onclose = (event) => {
    console.log("Notification created and cancel WebSocket connection closed");
  };

  return () => {
    newSocket.close();
  };
}
