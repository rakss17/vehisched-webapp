import Autocomplete from "react-google-autocomplete";
import { handlePlaceSelect } from "../api/api";

interface AutoCompleteAddressGoogleProps {
  travel_date: any;
  travel_time: any;
}

export default function AutoCompleteAddressGoogle({
  travel_date,
  travel_time,
}: AutoCompleteAddressGoogleProps) {
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  console.log("autocomplete travel_date", travel_date);
  console.log("autocomplete travel_time", travel_time);
  return (
    <Autocomplete
      options={{
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "PH" },
      }}
      apiKey={apiKey}
      onPlaceSelected={(place) =>
        handlePlaceSelect(place, travel_date, travel_time)
      }
    />
  );
}
