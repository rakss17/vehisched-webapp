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
