import React from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "./addressinput.css";
import { AddressInputProps } from "../../interfaces/interfaces";
const AddressInput: React.FC<AddressInputProps> = ({ onPlaceSelect }) => {
  function onSuggestionChange(value: string) {
    console.log(value);
  }

  return (
    <GeoapifyContext apiKey="9b95043d24f044928eb23c51f1d9573c">
      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggestionChange}
        filterByCountryCode={["ph"]}
      />
    </GeoapifyContext>
  );
};

export default AddressInput;
