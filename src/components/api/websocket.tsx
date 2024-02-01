import { useEffect } from "react";
import { toast } from "react-toastify";
import ToastContent from "../toastcontent/toastcontent";

const serverSideUrl = "vehisched-backend.keannu1.duckdns.org";

export function NotificationApprovalScheduleReminderWebsocket(userName: any) {
  useEffect(() => {
    const newSocket = new WebSocket(
      `wss://${serverSideUrl}/ws/notification/approval_schedule-reminder/?requester_name=${userName}`
    );

    newSocket.onopen = () => {
      console.log(
        "Notification approval and schedule reminder connection opened"
      );
      newSocket.send(
        JSON.stringify({
          action: ["approve", "reminder", "reject"],
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
        const justnow = "Just Now";
        toast.success(
          <ToastContent message={data.message} timeago={justnow} />,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          }
        );
      } else if (
        data.type === "reject.notification" &&
        data.status === "Rejected" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        toast.error(<ToastContent message={data.message} timeago={justnow} />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      } else if (
        data.type === "schedule.reminder" &&
        data.status === "Reminder" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        toast.info(<ToastContent message={data.message} timeago={justnow} />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      } else if (
        data.type === "recommend.notification" &&
        data.status === "Recommend" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        toast.info(<ToastContent message={data.message} timeago={justnow} />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
    };

    newSocket.onclose = () => {
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

export function NotificationCreatedCancelWebsocket(
  fetchAPI?: any,
  setData?: any,
  fetchAPI2?: any,
  setData2?: any
) {
  useEffect(() => {
    const newSocket = new WebSocket(
      `wss://${serverSideUrl}/ws/notification/created_cancel/`
    );

    newSocket.onopen = () => {
      console.log(
        "Notification created and cancel WebSocket connection opened"
      );
      fetchAPI2(setData2);
      newSocket.send(
        JSON.stringify({
          action: ["created", "canceled", "completed"],
        })
      );
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      fetchAPI(setData);
      fetchAPI2(setData2);
      if (
        data.type === "notify.request_created" &&
        data.status === "Created" &&
        data.message != "Notification message goes here for created"
      ) {
      } else if (
        data.type === "notify.request_completed" &&
        data.status === "Completed" &&
        data.message != "Notification message goes here for completed"
      ) {
        const justnow = "Just Now";
        toast.success(
          <ToastContent message={data.message} timeago={justnow} />,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          }
        );
      } else if (
        data.type === "notify.request_ontheway" &&
        data.status === "Ontheway" &&
        data.message != "Notification message goes here for on the way"
      ) {
        const justnow = "Just Now";
        toast.success(
          <ToastContent message={data.message} timeago={justnow} />,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          }
        );
      } else if (
        data.type === "notify.request_canceled" &&
        data.status === "Canceled" &&
        data.message != "Notification message goes here for canceled"
      ) {
        const justnow = "Just Now";
        toast.info(<ToastContent message={data.message} timeago={justnow} />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      }
    };

    newSocket.onclose = () => {
      console.log(
        "Notification created and cancel WebSocket connection closed"
      );
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return null;
}
