// reference tastingCollection
var tastingRef = firebase.database().ref('tastingForms');

//definition variables links
var lnkLogOut = document.querySelector("#lnkLogOut");
var lnkLogMeOut = document.querySelector("#lnkLogMeOut")

//definition var section
var sectionMainMenu = document.querySelector("#mainMenu");
var sectionFormToSubmit = document.querySelector("#formToSubmit");
var sectionFormSubmitted = document.querySelector("#formSubmitted");
var sectionFulfillNewForm = document.querySelector("#fulfillNewForm");

sectionFormSubmitted.style.display = "none";

//logged out when user clicks on log out
lnkLogOut.addEventListener("click", activateLoggedOut);
lnkLogMeOut.addEventListener("click", activateLoggedOut);

//log out user and redirect it to index.html
function activateLoggedOut() {
  firebase.auth().signOut()
  .then(function() {
    console.log("you're successfully logged out!")
  })
  .catch(function(error) {
    console.log("an error happened")
  });
  window.location = "index.html";
};

//Listen for form submit
document.getElementById('tastingFormSubmit').addEventListener("click", submitForm);

//submit form
function submitForm(e) {
  console.log("submitForm is initialized");
  //prevent default sending to html
  e.preventDefault();

  // Get values
  var firstName = getInputVal('firstName');
  var lastName = getInputVal('lastName');
  var urlExpert = getInputVal('urlExpert');
  var presentationExpert = getInputVal('presentationExpert');
  var alcoolType = getInputVal('alcoolType');
  var alcoolName = getInputVal('alcoolName');
  var alcoolBrand = getInputVal('alcoolBrand');
  var alcoolDistillery = getInputVal('alcoolDistillery');
  var alcoolCountry = getInputVal('alcoolCountry');
  var alcoolYear = getInputVal('alcoolYear');
  var alcoolView = getInputVal('alcoolView');
  var alcoolSniff = getInputVal('alcoolSniff');
  var alcoolTasting = getInputVal('alcoolTasting');
  var alcoolInitialImpressions = getInputVal('alcoolInitialImpressions');
  var alcoolBody = getInputVal('alcoolBody');
  var alcoolFade = getInputVal('alcoolFade');
  var alcoolFurtherTasting = getInputVal('alcoolFurtherTasting');
  var alcoolAnecdote = getInputVal('alcoolAnecdote');
  var alcoolFinalNote = getInputVal('alcoolFinalNote');
  //save tasting form
  saveTastingForms(firstName, lastName, urlExpert, presentationExpert, alcoolType, alcoolName, alcoolBrand, alcoolDistillery, alcoolCountry, alcoolYear, alcoolView, alcoolSniff, alcoolTasting, alcoolInitialImpressions, alcoolBody, alcoolFade, alcoolFurtherTasting, alcoolAnecdote, alcoolFinalNote);

  //clear sections and show thanks popup
  sectionMainMenu.style.display = "none";
  sectionFormToSubmit.style.display = "none";
  sectionFormSubmitted.style.display = "block";

}

//on click
sectionFulfillNewForm.addEventListener("click", fulfillNewForm);

function fulfillNewForm () {
  sectionMainMenu.style.display = "block";
  sectionFormToSubmit.style.display = "block";
  sectionFormSubmitted.style.display = "none";
}

//Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//save message to firebase tastingForms
function saveTastingForms(firstName, lastName, urlExpert, presentationExpert, alcoolType, alcoolName, alcoolBrand, alcoolDistillery, alcoolCountry, alcoolYear, alcoolView, alcoolSniff, alcoolTasting, alcoolInitialImpressions, alcoolBody, alcoolFade, alcoolFurtherTasting, alcoolAnecdote, alcoolFinalNote) {
  var newTastingRef = tastingRef.push();
  newTastingRef.set({
    firstName:firstName,
    lastName:lastName,
    urlExpert:urlExpert,
    presentationExpert:presentationExpert,
    alcoolType:alcoolType,
    alcoolName:alcoolName,
    alcoolBrand:alcoolBrand,
    alcoolDistillery:alcoolDistillery,
    alcoolCountry:alcoolCountry,
    alcoolYear:alcoolYear,
    alcoolView:alcoolView,
    alcoolSniff:alcoolSniff,
    alcoolTasting:alcoolTasting,
    alcoolInitialImpressions:alcoolInitialImpressions,
    alcoolBody:alcoolBody,
    alcoolFade:alcoolFade,
    alcoolFurtherTasting:alcoolFurtherTasting,
    alcoolAnecdote:alcoolAnecdote,
    alcoolFinalNote:alcoolFinalNote,
  });
}
