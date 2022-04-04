const authorTemplate = Handlebars.compile(
  document.getElementById("authorTemplate").innerHTML
);
//get the template
const renderTemplate = authorTemplate({ authors: authors }); //pass the data to the template
document.getElementById("authorPlaceholder").innerHTML = renderTemplate; //render the template

const becomeAuthorModal = bootstrap.Modal.getOrCreateInstance(
  document.getElementById("becomeAuthorModal")
); //get the modal
async function becomeAnAuthor(event) {
  try {
    if (event) {
      event.preventDefault(); //prevent the default behaviour of the form
    }
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
    if (!event) {
      //if the event is not passed
      becomeAuthorModal.show(); //show the modal
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
    console.log(error);
    alert("Something went wrong");
  }
}
