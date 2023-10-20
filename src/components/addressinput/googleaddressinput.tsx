import Autocomplete from "react-google-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";

interface AutoCompleteAddressGoogleProps {
  travel_date: any;
  travel_time: any;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
}: AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  const onPlaceSelectedRef = useRef<(place: any) => void>(() => {});

  // Update the onPlaceSelectedRef callback whenever travel_date or travel_time change
  useEffect(() => {
    onPlaceSelectedRef.current = (place) => {
      handlePlaceSelect(place, travel_date, travel_time);
    };
  }, [travel_date, travel_time]);

  // Listen for changes in travel_date and travel_time props and update state
  useEffect(() => {
    setTravelDate(travelDateProp);
    setTravelTime(travelTimeProp);
  }, [travelDateProp, travelTimeProp]);

  console.log("autocomplete travel_date", travel_date);
  console.log("autocomplete travel_time", travel_time);
  return (
    <Autocomplete
      options={{
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "PH" },
      }}
      apiKey={apiKey}
      onPlaceSelected={(place) => onPlaceSelectedRef.current(place)}
    />
  );
}
