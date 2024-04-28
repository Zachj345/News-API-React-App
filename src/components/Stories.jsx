// figure out how to default render this
export function TopStoriesButton( {onDefault} ){
  
    // is this good cause I'm not setting any state with the new call
    const handleSearch = async () => {
      try{
        const defaultResults = await onDefault();
        console.log("default results in top stories component", defaultResults);
      }
      catch (err){
        console.log("default error", err);
      }
      
    }
  
    return (
      <button type="button" id="stories-button" onClick={handleSearch} className="btn btn-info btn-lg btn-block">Top Stories!</button>
    )
  }

// only handling what the story will look like with props the data plugging will be done in next component
export function Story(props){

    return (
      <div className="card mb-3 articles" id="articles">
              <a
                id="url"
                href={props.url}
                style={{textDecoration: "none", color: "black"}}
              >
                <div className="row g-0 article-links">
                  <div className="col-md-4">
                    <img
                      src={props.urlToImage}
                      className="img-fluid rounded-start"
                      id="story-img"
                      alt="img not available"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title" id="title">{props.title}</h5>
                      <p className="card-text" id="description">
                        {props.description}
                      </p>
                      <p className="card-text" id="date">{props.publishedAt.slice(0,10)}</p>
                      <p className="card-text">
                        <small className="text-muted" id="author"
                          >by {props.author}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
    )
  }
  
  
  // this will hold the div that holds all the searched stories and calls the search based in the props
  // possibly pas the default function as a prop and make a collection variable if null on search so it renders that var at the end
  export function StoryCollection({ searchResults, defaultSearch }){
    let results;
    let articles;
  
    // set var for the stories here and articles = the default or the actual search
    if (! searchResults){
      results = defaultSearch;
      articles = results.articles;
    }else{
      results = searchResults;
      articles = results.articles;
    }
    
    console.log("results from the story collection", results);
  
    const vettedArticleList = articles.filter((article) => {
      return article.title !== "[Removed]" && article.description !== "[Removed]";
    })
  
    const articleList = vettedArticleList.map((article, index) => (
      <Story 
      key={index}
      url={article.url}
      urlToImage={article.urlToImage}
      title={article.title}
      description={article.description}
      publishedAt={article.publishedAt}
      author={article.author}
      />
    ))
      // console.log(articleList);
  
  return (
    <div>{articleList}</div>
  )
  
  }
  
  
  export function NoStoriesAvailableCard({ searchResults }){
    const totalResults = searchResults.totalResults;
    console.log(totalResults);
    let use = false;
  
    if (totalResults === 0){
      use = true;
    }
  
    // story collection won't show up off rip
    if (use === true){
      return (
        <div className="card bg-primary text-white mb-3" id="no-res-card" style={{maxWidth: "50rem"}}>
      <div className="card-header" id="no-stories-header">Sorry! This search yielded no results.</div>
      <div className="card-body">
        <h5 className="card-title">Please try searching again!</h5>
        <p className="card-text">It can either be a typo, or you've searched something that broke the internet.</p>
      </div>
    </div>
      )
    }
  
  }