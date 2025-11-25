import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Pesquisar...", 
  className = "",
  disabled = false 
}) => {
  return (
    <div className={`search-container ${className}`}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;