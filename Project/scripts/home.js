const authHtml = `
{{#if isLoggedIn }}
<!-- Display user first name and  last name with a signout button -->
        <div class="d-flex sign-out-div">
        <!-- Display user first name and  last name-->
            <p class="user">{{userLoggedIn.firstName}} {{userLoggedIn.lastName}}</p>
            <button class="nav-link signout-btn" id="signout" id="signOutButton" onclick="signOut()">Sign Out</button>
            
        </div>
{{else}}
<!-- Display signup and login buttons -->
<button data-bs-toggle="modal" class="nav-link signout-btn-1" data-bs-target="#loginModal" role="button">Sign
In / Sign Up</button> <!-- This is the javascript code to trigger the login modal -->
{{/if}}`;

const template = Handlebars.compile(authHtml);
const html = template({
  userLoggedIn: userLoggedIn,
  isLoggedIn: typeof userLoggedIn === "object", //This is used to check if the user is logged in or not, user is logged in if the userLoggedIn variable is an object
});
document.getElementById("authPlaceholder").innerHTML = html;

const reviewTemplate = Handlebars.compile(document.getElementById("reviewTemplate").innerHTML);
const reviewCarouselHtml = reviewTemplate({
  reviews: reviews,
});
document.getElementById("reviewCarouselPlaceholder").innerHTML = reviewCarouselHtml;

const reviewIndicators = document.getElementById("review-carousel-indicators");
const reviewCarouselTemplate = Handlebars.compile(document.getElementById("review-carousel-indicators-template").innerHTML)
const indicatorsHtml = reviewCarouselTemplate({
  reviews: reviews,
})
reviewIndicators.innerHTML = indicatorsHtml;




//This add an event listener to the submit review button
document.getElementById("submitReviewButton").addEventListener("click", function (event) {
  event.preventDefault(); //This prevents the page from any default behavior (if it exists)
  //This check if the user is logged in or not
  if (typeof userLoggedIn === "object") {
    //This create instance of bootsrap modal so that it can be programatically triggered
    const reviewModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("reviewModal"));
    //This triggers the modal
    reviewModal.show();
  } else {
    //This create instance of bootsrap modal so that it can be programatically triggered
    alert("Please login to submit a review");
    //This triggers the modal
    loginModal.show();
  }
});

//Submit review logic
async function submitReview(e) {
  try {
    e.preventDefault();//Prevent default behavior
    //This get the value of the textarea in the modal
    setLoader(true);
    const formElements = e.target.getElementsByTagName("textarea");
    const reviewText = formElements[0].value;//Get the first textarea value
    //Save the review to the database
    const review = await localforage.getItem("reviews") || [];
    review.push({
      reviewText: reviewText, //This is the review text
      user: userLoggedIn, // This is the user who submitted the review
      date: new Date().toLocaleDateString()
    });
    await localforage.setItem("reviews", review); //This saves the review to the database
    setLoader(false);//Hide the loader
    alert("Review submitted");
    window.location.reload(); //This reloads the page to display the new review

  } catch (error) {
    setLoader(false); //This hides the loader
    alert("Something went wrong"); //This displays an alert if something goes wrong
  }
}