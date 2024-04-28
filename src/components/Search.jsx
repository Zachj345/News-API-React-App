import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';

// use deconstructured props 
export default function Search( {onSearch} ){
    // setting state and the function that will change state
      const [searchVal, setSearchVal] = useState("")
  
      // changes the search val with each keystroke (updating)
      const handleInputChange = (searchEvent) => {
        // getting the new value on each call
        setSearchVal(searchEvent.target.value);
      }
  
      const handleArticleSearch = async () => {
        try {
          // const searchResults = await searchStories(searchVal);
          // passing them to the app
          await onSearch(searchVal);
          console.log("search val from Search component", searchVal);
          setSearchVal("");
        }
        catch(e) {
          console.log("error fetching data", e)}
      
      }
  
      const handleKeyPress = (e) => {
        if (e.key === "Enter"){
          // e.preventDefault(); only if the input is wrapped in a form
          console.log("searching...");
          handleArticleSearch();
        }
      }
  
  
    return (
      <div id='search-bar'>
        
        <div className="input-group mb-3">
  
    <input type="text" id="searchValue"
     className="form-control" placeholder=""
      aria-label="Recipient's username" aria-describedby="basic-addon2"
      autoComplete="off"
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      value={searchVal}
      ></input>
    <div className="input-group-append">
    <button type="button" className="btn btn-lg btn-success" onClick={handleArticleSearch}>Search</button>
    </div>
  
  </div>
      </div>
    )
  }