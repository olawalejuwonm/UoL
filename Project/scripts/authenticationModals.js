//This authentication modals script is used to display the modals for the authentication process.
//I found out that this code is repeated in all the pages, so I decided to put it in a separate file.
//And i'm using it as a module. Following standard software development practices, DRY (Do Not Repeat Yourself) principle is used.
// This was done as a way to make the code more readable and easier to understand.
//and it's also a way to make the code more maintainable, because modifying the code here propagates to all the pages.

const authModal = `

<!-- Login Modal -->
<!-- This modal is triggered by the login button on the navbar and it consists of other buttons that trigger other modal like the signup modal and forgot password modal -->
<div class="modal fade " id="loginModal" aria-hidden="true" tabindex="-1" aria-labelledby="loginModalLabel"
   aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <!-- This will make the modal scrollable -->
      <div class="modal-content px-4 py-4" style="overflow: auto;">
         <!-- This is the content of the modal -->
         <div class="submit-review d-flex justify-content-end px-3">

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <!-- This is the close button -->
         </div>
         <div class="modal-body">
            <!-- This is the body of the modal -->
            <p class=" d-flex justify-content-center align-self-center signin" id="mb-1">Sign In</p>
            <!-- This is the title of the modal -->
            <p class="text-center py-md-4 py-2">Login with email address and password.</p>
            <form id="loginForm">
               <!-- This is the login form that will be submitted -->
               <div class="form-group mb-3">
                  <label for="loginEmail" class="label input">Email</label>
                  <input id="loginEmail" type="email" class="form-control py-2" required name="email">
               </div>
               <div class="form-group">
                  <label for="" class="label input">Password</label>
                  <input type="password" class="form-control py-2" required name="password">
               </div>
               <div class="">

                  <button type="submit" class="text-white w-100 submit-review-btn px-4 py-2">Sign
                     In</button>
               </div>
            </form>
         </div>
         <!-- Forgot Password -->
         <button data-bs-toggle="modal" data-bs-target="#forgotPassword"
            class="mt-4 text-center fst-italic forgot-password">Forgot Password?</button>
         <!-- Sign trigger modall -->
         <button class="text-center fst-italic signup-open" data-bs-toggle="modal" data-bs-target="#signUpModal">
            No account? Sign Up
         </button>
      </div>
   </div>
</div>

<!--Forgot password Modal -->
<div class="modal fade" id="forgotPassword" tabindex="-1" aria-labelledby="signup-close" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content  px-4 py-4" style="overflow: auto;">

         <div class="submit-review d-flex justify-content-end px-3">

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

         <div class="modal-body">
            <p class=" d-flex justify-content-center align-self-center signin mb-1">
               Forgot Password</p>
            <p class="text-center py-md-4 py-2">Provide your details to recover
               password
            </p>

            <form onsubmit="resetPassword(event)">

               <div class="form-group mb-3">
                  <label for="" class="label input">Email</label>
                  <input type="email" class="form-control py-2" required placeholder="Enter Your Registered Email"
                     onkeyup="getSecurityQuestion(event.target.value)" name="email">
                  <!-- This is the email input -->
               </div>
               <p>Security Question: <span id="securityQuestion"></span></p>
               <div class="form-group">
                  <label for="" class="label input">Security answer</label>
                  <input type="text" class="form-control py-2"
                     placeholder="Answer the question above(if applicable)" name="answer">
               </div>

               <div class="form-group mb-3">
                  <label for="" class="label input">New Password</label>
                  <input type="password" class="form-control py-2" required name="password">
               </div>
               <div class="form-group mb-3">
                  <label for="" class="label input">Confirm Password</label>
                  <input type="password" class="form-control py-2" required name="confirmPassword">
               </div>
               <!-- New pasword & Confirm password modal trigger -->
               <div class="modal-footer">

                  <button type="submit"
                     class="btn text-white w-100 submit-review-btn px-4 py-2 btn-signup">Submit</button>
                  <!-- data-bs-toggle="modal" data-bs-target="#ChangePassword" -->

               </div>
            </form>
         </div>




      </div>
   </div>
</div>
<!-- New pasword & Confirm password  -->
<div class="modal fade" id="ChangePassword" tabindex="-1" aria-labelledby="changePassword-close"
   aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content  px-4 py-4" style="overflow: scroll;">

         <div class="submit-review d-flex justify-content-end px-3">

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

         <div class="modal-body">
            <p class=" d-flex justify-content-center align-self-center signin" id="exampleModalLabel mb-1">Recover
               Password</p>
            <p class="text-center py-md-4 py-2">Enter New password and confirm
               password.
            </p>
            <div class="form-group mb-3">
               <label for="" class="label input">New Password</label>
               <input type="password" class="form-control py-2" required name="password">
            </div>
            <div class="form-group mb-3">
               <label for="" class="label input">Confirm Password</label>
               <input type="password" class="form-control py-2" required name="confirmPassword">
            </div>

         </div>
         <div class="modal-footer">

            <button type="submit"
               class="btn text-white w-100 submit-review-btn px-4 py-2 btn-signup">Submit</button>
         </div>

      </div>
   </div>
</div>

<!--Signup  Modal -->
<div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signup-close" aria-hidden="true" >
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
      <div class="modal-content  px-4 py-3" style="overflow: scroll;">

         <div class="submit-review d-flex justify-content-end px-3">

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

         <div class="modal-body">
            <p class=" d-flex justify-content-center align-self-center signin" id="exampleModalLabel mb-0">Sign Up
            </p>
            <p class="text-center py-md-3 py-2">Create an account on FNH.
            </p>
            <form id="signupForm">
               <!-- This id is used to submit the form by adding an event listener to the form -->
               <div class="form-group mb-2">
                  <label for="" class="label input">First Name</label>
                  <input name="firstName" type="text" class="form-control py-2" placeholder="John" required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Last Name</label>
                  <input name="lastName" type="text" class="form-control py-2" placeholder="Doe" required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Email</label>
                  <input type="email" name="email" class="form-control py-2" placeholder="johndoe@mail.com"
                     required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Password</label>
                  <input type="password" name="password" class="form-control py-2" placeholder="xxxxxxxx"
                     required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Security question</label>
                  <input type="text" name="question" class="form-control py-2"
                     placeholder="What is your favourite colour?" required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Security Answer</label>
                  <input type="text" name="answer" class="form-control py-2" placeholder="Indigo" required>
               </div>
               <div class="form-group mb-2">
                  <label for="" class="label input">Upload Picture</label>
                  <input type="file" name="avatar" class="form-control py-2" required accept="image/*">

               </div>
               <button type="submit" class="btn text-white w-100 submit-review-btn px-4 py-2 btn-signup">Sign
                  Up</button>
            </form>
         </div>
         <div>


         </div>

      </div>
   </div>
</div>

`

document.getElementById("modalPlaceholder").innerHTML += authModal