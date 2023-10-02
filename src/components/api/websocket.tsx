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

export function RequestApproveWebsocket() {
  const newSocket = new WebSocket("ws://localhost:8000/ws/request/approve/");

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
    console.log("Request Approved:", data);
    if (data.type === "approve.notification") {
      // Handle the approved request and show a notification
      console.log("Request Approved ddd:", data.message);
      alert(data.message);
      // You can use a notification library here, e.g., react-toastify
    }
  };

  newSocket.onclose = (event) => {
    console.log("WebSocket connection closed");
  };

  return () => {
    newSocket.close();
  };
}
