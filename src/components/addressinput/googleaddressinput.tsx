import Autocomplete, {
  ReactGoogleAutocompleteInputProps,
} from "react-google-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";
import "./googleaddressinput.css";
import CircularProgress from "@mui/material/CircularProgress";

interface AutoCompleteAddressGoogleProps
  extends ReactGoogleAutocompleteInputProps {
  travel_date?: any;
  travel_time?: any;
  setData: (data: any) => void;
  setAddressData: (addressData: any) => void;
  category?: any;
  removeDestinationError: () => void;
  className?: any;
  setIsFromAutoComplete?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
  setData,
  setAddressData,
  category,
  removeDestinationError,
  className,
  setIsFromAutoComplete,
}: AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
  const [isLoading, setIsLoading] = useState(false);
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
        category,
        setIsLoading
      );
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
    <div className="autocomplete-address-container">
      <Autocomplete
        className={`autocomplete-address ${className}`}
        options={{
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "PH" },
        }}
        apiKey={apiKey}
        onPlaceSelected={(place) => {
          onPlaceSelectedRef.current(place);
          if (setIsFromAutoComplete) {
            setIsFromAutoComplete(true);
          }
          setIsLoading(true);
          removeDestinationError();
        }}
        placeholder="Type here..."
      />
      {isLoading && <CircularProgress color="primary" size={25} />}
    </div>
  );
}
