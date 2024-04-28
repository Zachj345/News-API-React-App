const apiKey = "e02c1949039b4ac5aaf9314b00675b47";


export function getAllStories(){
    let params = {
        "country": "us"
    };

    return fetch(`https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${params.country}`, {method: "GET"}).then((response) => 
        response.json()).catch((e) => console.log("Error on GET request:", e))
}



export function searchStories(query, page=1){
    let params = {
        "sortBy": "popularity",
        "pageSize": 25,
        "language": "en"
    };

    console.log("url\n", `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${query}&language=${params.language}&pageSize=${params.pageSize}&page=${page}`);
    
    return fetch(`https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${query}&language=${params.language}&pageSize=${params.pageSize}&page=${page}`,
     {method: "GET", params: params}).then(
        (response) => response.json()).catch((e) => console.log("Error on search:", e))

}


