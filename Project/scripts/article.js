const search = window.location.search; //This is the query string that i passed in the url from all articles page,
//it will be in the form of ?id=1 where 1 is the index of the article in the database
const id = search.split("?")[1]; //This will give me the id of the article that i want to view
const article = articles[id]; //This will give me the article that i want to view
if (typeof article === "undefined") {
  console.log("Article not found");
  //If the id is not defined, then display a not found page
  //I firstly tried to use document.write but it didn't work. I keep getting the error :
  //It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened. 
    //So I used the innerHTML instead.
    //Firstly i load the styles for the not found page as follows
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/error.css";
    head.appendChild(link);
    //Then i load the html for the not found page as follows
  const articleBody = document.getElementById("articleBody"); //This is the article body
  articleBody.innerHTML = ` <a href="./blog.html" class="go-back" >Go back</a>
    <h2>Article  Not found</h2>
    <div class="error">
        <img src="./images/error-gif.gif" title="404 page" ></img>
    </div>`;
}
else {
  const singleArticleTemplate = Handlebars.compile(document.getElementById("singleArticleTemplate").innerHTML);
  //This is the template for the single article page
  const renderedArticle = singleArticleTemplate({article});
  document.getElementById("singleArticlePlaceholder").innerHTML = renderedArticle;
  //Below is for recent articles
  //I firstly declare a variable to store the recent articles
  let recentArticles = [];
  //Then i loop through the articles array and push the articles that are not the article that i want to view into the recentArticles array
  for (let i = 0; i < articles.length; i++) {
    if (i != id) { //This is to make sure that the article that is being viewed is not pushed into the recentArticles array
      recentArticles.push(articles[i]);
    }
  }

  const recentArticleTemplate = Handlebars.compile(document.getElementById("recentArticleTemplate").innerHTML);
  //This is the template for the recent articles
  const renderedRecentArticles = recentArticleTemplate({others: recentArticles});
  document.getElementById("recentArticlePlaceholder").innerHTML = renderedRecentArticles;
  


}