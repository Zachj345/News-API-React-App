import { searchStories, getAllStories } from './backend';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search.jsx';
import { TopStoriesButton, StoryCollection, NoStoriesAvailableCard } from './components/Stories.jsx';
import Pagination from './components/Pagination';

// let storiesObj = getAllStories();
// console.log(storiesObj);

// test below to see if API works 
// let searchObj = searchStories("music");
// console.log(searchObj)

function App() {

  const [searchResults, setSearchResults] = useState(null);
  const [defaultSearch, setDefaultSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };

  const handleDefaultSearch = async () => {
    try{
      const stories = await getAllStories();
      setDefaultSearch(stories);
      setSearchResults(null);
      console.log("default stories: \n", stories);
    }
    catch (err){
      console.log("error fetching default", err);
    }
  }


  const handleSearch = async (searchVal, currentPage) => {
    try{
      const results = await searchStories(searchVal, currentPage);
      setSearchResults(results);
      setSearchVal(searchVal)
      setDefaultSearch(null);
      console.log(results);
      // staying at 1 for some reason
      console.log("page after search", currentPage);
      
  
    } catch (err) {
      console.log("error in fetching results", err);
    }
  }


  const nextBtn = async () => {
    if (currentPage < Math.ceil(searchResults.totalResults / 25)){
      const nextPage = currentPage + 1;
      await setCurrentPage(nextPage);
      if (currentPage <= 4){
        await handleSearch(searchVal, nextPage);
        scrollToTop();
      }
      // await handleSearch(searchVal, nextPage);
      // scrollToTop();
    }
  }
  const prevBtn = async () => {
    if (currentPage > 1){
      const lastPage = currentPage - 1;
      await setCurrentPage(lastPage);
      await handleSearch(searchVal, lastPage);
      scrollToTop();
    }
  }



  useEffect(() => {
    console.log("page changed", currentPage);
    // setCurrentPage(currentPage);
  }, [currentPage])

  useEffect(() => {
    console.log("got top stories", defaultSearch);
  }, [defaultSearch]);


  useEffect(() => {
    console.log("got search results", searchResults);
  }, [searchResults]);


  return (
    <div className="App">
      
      <header className="App-header">
      <div id="header-div">
        <div id="top-bar">
        <TopStoriesButton onDefault={handleDefaultSearch} />
        <h1 id="header-one">Welcome to the News! (courtesy of the News API)</h1>  
        </div>
        {/* <h1 id="header-one">Welcome to the News! (curtesy of the News API)</h1> */}
        <h3 id="header-two">Please search below for articles, or click the "Top Stories" button to see the top headlines in the United States</h3>
      </div>
        <Search onSearch={handleSearch}/>
        {/* this conditional only renders the collection if the searchResults are also true(not rch}null) */}
        {/* edit this caus how do we know that default Search is null */}
        
        {(searchResults !== null || defaultSearch !== null) &&
         (<StoryCollection searchResults={searchResults} defaultSearch={defaultSearch} />)}

        {(searchResults !== null && defaultSearch === null) && (<NoStoriesAvailableCard searchResults={searchResults}/>)}
        <br />
        <br />
        <br />
        {(searchResults && searchResults.totalResults !== 0) && <Pagination currentPage={currentPage} next={nextBtn} prev={prevBtn} /> }
      </header>
    </div>
  );
}


export default App;
