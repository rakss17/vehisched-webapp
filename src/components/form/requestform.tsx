import React, { useState, ChangeEvent, useEffect } from "react";
import Container from "../container/container";
import Header from "../header/header";
import InputField from "../inputfield/inputfield";
import "./requestform.css";
import { faUser, faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function RequestForm() {
  const [data, setData] = useState<{
    requester_name: string;
    office_dept: string;
    passenger_names: string[];
  }>({
    requester_name: "",
    office_dept: "",
    passenger_names: [],
  });

  const [numPassengers, setNumPassengers] = useState(0);

  useEffect(() => {
    let updatedPassengerNames = [...data.passenger_names];
    if (numPassengers > data.passenger_names.length) {
      const additionalPassengers = new Array(
        numPassengers - data.passenger_names.length
      ).fill("");
      updatedPassengerNames =
        updatedPassengerNames.concat(additionalPassengers);
    } else if (numPassengers < data.passenger_names.length) {
      updatedPassengerNames = updatedPassengerNames.slice(0, numPassengers);
    }
    setData({ ...data, passenger_names: updatedPassengerNames });
  }, [numPassengers]);

  const handlePassengerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNumPassengers(Number(value));
  };

  const generatePassengerInputs = () => {
    const inputs = [];
    for (let i = 0; i < numPassengers; i++) {
      inputs.push(
        <InputField
          value={data.passenger_names[i]}
          key={i}
          icon={faUser}
          label={`Passenger ${i + 1}'s name`}
          placeholder={`Passenger ${i + 1}'s name`}
          onChange={(event) => {
            const newPassengerNames = [...data.passenger_names];
            newPassengerNames[i] = event.target.value;
            setData({ ...data, passenger_names: newPassengerNames });
          }}
        />
      );
    }
    return inputs;
  };
  const display = () => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Container>
        <div className="request-form-body">
          <h1>Vehicle Request Form</h1>
          <div className="form-body">
            <div className="form-body-shadow">
              <div className="row">
                <InputField
                  value={data.requester_name}
                  icon={faUser}
                  label="Requester's name"
                  placeholder="Requester's name"
                  onChange={(event) => {
                    setData({ ...data, requester_name: event.target.value });
                  }}
                />
                <InputField
                  icon={faBuilding}
                  label="Office/dept"
                  placeholder="Office/dept"
                />
                <InputField
                  icon={faUsers}
                  label="No. of passengers"
                  value={numPassengers}
                  onChange={handlePassengerChange}
                  type="number"
                />
              </div>
              <div className="row">{generatePassengerInputs()}</div>
            </div>
          </div>
          <button onClick={display}>Submit</button>
        </div>
      </Container>
    </>
  );
}
