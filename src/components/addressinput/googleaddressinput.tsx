import Autocomplete from "react-google-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";

interface AutoCompleteAddressGoogleProps {
  travel_date: any;
  travel_time: any;
  setData: (data: any) => void;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
  setData,
}: AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  const onPlaceSelectedRef = useRef<(place: any) => void>(() => {});

  // Update the onPlaceSelectedRef callback whenever travel_date or travel_time change
  useEffect(() => {
    onPlaceSelectedRef.current = (place) => {
      handlePlaceSelect(place, travel_date, travel_time, setData);
    };
  }, [travel_date, travel_time, setData]);

  // Listen for changes in travel_date and travel_time props and update state
  useEffect(() => {
    setTravelDate(travelDateProp);
    setTravelTime(travelTimeProp);
  }, [travelDateProp, travelTimeProp]);

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
