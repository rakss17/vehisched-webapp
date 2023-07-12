import "./searchbar.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="inputsearch">
          <div className="icon-container-search">
            <FontAwesomeIcon icon={faSearch} className="input-icon" />
          </div>

          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        {/* <button type="submit">Search</button> */}
      </form>
    </>
  );
};

export default SearchBar;
