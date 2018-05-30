//var declarations
  //headers
var lnkSignUp = document.querySelector("#lnkSignUp");
var lnkLogIn = document.querySelector("#lnkLogIn");
var lnkLogOut = document.querySelector("#lnkLogOut");
  //sections
var sectionSignUp = document.querySelector("#signup");
var sectionLogIn = document.querySelector("#login");
 //boutons
var btnLogIn = document.querySelector("#btnLogIn");
var btnSignUp = document.querySelector("#btnSignUp");

var user = firebase.auth().currentUser;
if(user) {
  // User is signed in.
  activateLoggedIn()
} else {
  // No user is signed in.
  activateLoggedOut()
}


//Check if user is logged in or not on each landing page
function authCheck() {
  var user = firebase.auth().currentUser;
  if(user) {
    // User is signed in.
    activateLoggedIn()
  } else {
    // No user is signed in.
    activateLoggedOut()
  }
}

//
function indexLoggedOut() {
  document.querySelector("#loggedIn").style.display = "none";
  document.querySelector("#signup").style.display = "none";
  document.querySelector("#login").style.display = "block";
  document.querySelector("#loggedOut").style.display = "block";
}
//show Login form if user is logged out and hide logged in informations
function activateLoggedOut() {
  //if(on_index !== true) {
    //window.location = "index.html";
  //} else {
    indexLoggedOut()
  //};
};

function activateLoggedIn() {
   document.querySelector("#loggedIn").style.display = "block";
   document.querySelector("#loggedOut").style.display = "none";
};

//if user clicks on log Out
lnkLogOut.addEventListener("click", activateLoggedOut);

// if user clicks on signup link, display signup section and hide the others
lnkSignUp.addEventListener("click", function() {
  sectionSignUp.style.display = "block";
  sectionLogIn.style.display = "none";
});

//if user clicks on login link, display login section and hide the signup one.
lnkLogIn.addEventListener("click", function() {
  sectionLogIn.style.display = "block";
  sectionSignUp.style.display = "none";
});

//if user is authenticated then redirect to form pages
function authSuccessRedirect() {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      //After successful login, user will be redirected to form.html
      window.location = 'form.html';
    }
  });
}

//connect user when user clicks on log In
btnLogIn.addEventListener("click", function() {
  var email = document.querySelector("#emailLogin").value;
  var pass = document.querySelector("#passLogin").value;
  //check if password and email are long enough
  if (email.length <6 || pass.length <6) {
    alert("Invalid login data");
  } else {
    //ok to log the user
    firebase.auth().signInWithEmailAndPassword(email, pass)
        //wait for validation
        .then(function() {
          activateLoggedIn();
          var user = firebase.auth().currentUser;
          user.updateProfile({
              displayName: name
          });
        })
        //check for error
        .catch(function(error) {
            alert("We couldn't register the user. " + error.message);
        })
        }
        //Handle Account Status
          authSuccessRedirect();
});

//connect user when user clicks on Signup
btnSignUp.addEventListener("click", function() {
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var pass = document.querySelector("#pass").value;
    var pass2 = document.querySelector("#pass2").value;
    if (name.length<3 || email.length<6 || pass.length<6) {
        alert("You need to enter your Full Name, E-mail address and password -6 characters min-");
    } else {
        if (pass!=pass2) {
            alert("Passwords must match");
        } else {
            // We are ok to register the user
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(function() {
                    // The user was registered
                    alert("User registered");
                    activateLoggedIn();
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: name
                    });
                })
                .catch(function(error) {
                    alert("We couldn't register the user. " + error.message);
                })
        }
        //if user is signed up and logged in then redirect to form page.
        authSuccessRedirect()
    }
});
