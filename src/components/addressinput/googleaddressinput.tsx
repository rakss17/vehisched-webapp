import Autocomplete from "react-google-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";
import "./googleaddressinput.css";

interface AutoCompleteAddressGoogleProps {
  travel_date?: any;
  travel_time?: any;
  setData: (data: any) => void;
  setAddressData: (addressData: any) => void;
  isDisabled?: any;
  category?: any;
  removeDestinationError: () => void;
  className?: any;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
  setData,
  setAddressData,
  isDisabled,
  category,
  removeDestinationError,
  className
}: AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  const onPlaceSelectedRef = useRef<(place: any) => void>(() => {});

  useEffect(() => {
    onPlaceSelectedRef.current = (place) => {
      handlePlaceSelect(
        place,
        travel_date,
        travel_time,
        setData,
        setAddressData,
        category
      );
      removeDestinationError();
    };
  }, [
    travel_date,
    travel_time,
    setData,
    setAddressData,
    category,
    removeDestinationError,
  ]);

  useEffect(() => {
    setTravelDate(travelDateProp);
    setTravelTime(travelTimeProp);
  }, [travelDateProp, travelTimeProp]);

  return (
    <Autocomplete
      className={`autocomplete-address ${className}`}
      disabled={isDisabled}
      options={{
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "PH" },
      }}
      apiKey={apiKey}
      onPlaceSelected={(place) => onPlaceSelectedRef.current(place)}
    />
  );
}
