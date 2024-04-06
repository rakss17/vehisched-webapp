import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./searchbar.css";

interface SearchBarProps {
  onSearchChange: (term: string) => void;
  placeholder?: any;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term: string = event.target.value;
    setSearchTerm(term);
    props.onSearchChange(term);
  };

  return (
    <form>
      <div className="inputsearch">
        <div className="icon-container-search">
          <FontAwesomeIcon icon={faSearch} className="input-icon" />
        </div>
        <input
          className="search-bar"
          type="text"
          placeholder={props.placeholder ? props.placeholder : "Search..."}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
