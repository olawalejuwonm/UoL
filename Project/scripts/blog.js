const becomeAuthorModal = bootstrap.Modal.getOrCreateInstance(
  document.getElementById("becomeAuthorModal")
);

async function uploadArticle() {
  const articleModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("articleModal")
  );
  if (!userLoggedIn) {
    //if user is not loggedIn
    alert("Please login to upload an article");
    loginModal.show();
    return;
  }
  if (!userLoggedIn.authorDetails) {
    //if user is not an author
    if (!confirm("You are not an author, press OK to become an author")) {
      //This is a confirm box to ask the user if they want to become an author
      return; //If the user does not want to become an author, then stop executing the function
    }
    becomeAuthorModal.show();
    return; //If the user wants to become an author, then stop executing the function
  }
  articleModal.show();
}

async function becomeAnAuthor(event) {
  try {
    event.preventDefault(); //prevent the default behaviour of the form
    if (!userLoggedIn) {
      //Just to ensure that the user is logged in before trying to become an author
      alert("Please login to become an author");
      loginModal.show();
      return;
    }
    if (userLoggedIn.authorDetails) {
      //if the user is already an author
      alert("You are already an author");
      return; //stop executing the function
    }
    const authorDetails = document.getElementById("authorDetails").value;
    //This ensures that the authorDetails is more than 20 words
    if (authorDetails.split(" ").length < 20) {
      //split the authorDetails by spaces this will return an array of words
      //this will check if the array of words is less than 20 words
      alert(
        "Please enter a short bio about yourself that's more than 20 words"
      );
      return;
    }
    setLoader(true);

    userLoggedIn.authorDetails = authorDetails; //set the authorDetails of the userLoggedIn to the authorDetails
    await localforage.setItem(userLoggedIn.email, userLoggedIn); //set the userLoggedIn to the localForage
    await localforage.setItem("user", userLoggedIn); //set the updated userLoggedIn to the localForage
    alert("You are now an author");
    window.location.reload(); //reload the page
    becomeAuthorModal.hide();
  } catch (error) {
    setLoader(false);
    alert("Something went wrong");
  }
}

async function uploadArticleToDb(event) {
  try {
    event.preventDefault(); //prevent the default behaviour of the form
    const articleTitle = document.getElementById("articleTitle").value; //get the articleTitle from the form
    if (articleTitle.split(" ").length < 3) {
      //split the articleTitle by spaces this will return an array of words
      //this will check if the array of words is less than 3 words
      alert("Please enter a title that's more than 3 words");
      return;
    }
    const articleDescription = document.getElementById("articleDescription").value; //get the articleDescription from the form
    if (articleDescription.split(" ").length < 20) {
      //split the articleDescription by spaces this will return an array of words
      //this will check if the array of words is less than 20 words
      alert("Please enter a description that's more than 20 words");
      return;
    }
    const articleContent = $('#articleContent').summernote('code') //get the articleContent from the summernote
    //This check if html article content is greater than 100 words
    if (articleContent.split(" ").length < 20) {
      alert("Article content must be more than 20 words");
      return;
    }

    const articleImage = document.getElementById("articleImage").files[0]; //get the articleImage from the form
    setLoader(true);
    const imageBase64 = await fileToBase64(articleImage); //convert the articleImage to base64

    articles.push({
      title: articleTitle, //push the articleTitle to the articles array
      content: articleContent,//push the articleContent to the articles array
      image: imageBase64,//push the articleImage to the articles array
      author: userLoggedIn,//push the userLoggedIn to the articles array
      date: new Date().toLocaleDateString(),//get the date of the article
      description: articleDescription,//push the articleDescription to the articles array
    });
    await localforage.setItem("articles", articles); //set the articles to the localForage
    setLoader(false); //hide the loader
    alert("Article uploaded successfully");
    window.location.reload(); //reload the page
  } catch (error) {
    setLoader(false);
    alert("Something went wrong");
  }
}


const articlesTemplate = Handlebars.compile(document.getElementById("articlesPlaceholder").innerHTML);
const renderArticleHtml = articlesTemplate({articles});
document.getElementById("articleRender").innerHTML = renderArticleHtml;
