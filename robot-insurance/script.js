"use strict";

let sections = [
  "intro-section",
  "personal-info",
  "address",
  "experience",
  "bots",
  "authorized-users",
  "finished-section"
];

let customer = {};


// inputFields = {
//   "intro-section": [],
//   "personal-info": [
//     "first-name",
//     "last-name",
//     "birthdate"
//   ]
// }

let currentSection = 0

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', function()  {
  handleButtonClick();
});
nextButton.textContent = "Begin Quote"

function changeSection(newSection) {
  console.log("ChangeSection: Being asked to change to " + newSection)
  if (newSection < 0 || newSection >= sections.length) {
    console.error("Invalid Section.");
    return null;
  }

  // Hide current section
  // let x = document.getElementById(sections[currentSection]);
  // x.classList.add("d-none");
  
  //Hide current input and narrative
  console.log("Before loop");
  let x = document.getElementsByClassName(sections[currentSection]);
  for (let i = 0; i < x.length; i++) {
    console.log("Hiding " + x)
    x[i].classList.add("d-none");
  }
  console.log("After loop");
  


  if (sections[currentSection] === "intro-section") {
    nextButton.textContent = "Continue"
  }

  updateBreadCrumbs(newSection);

  currentSection = newSection;
  console.log("Section# is " + currentSection)
  // let nextSection = document.getElementById(sections[currentSection]);
  // nextSection.classList.remove("d-none");
  
  let nextSection = document.getElementsByClassName(sections[currentSection]);
  for (let i = 0; i < nextSection.length; i++) {
    nextSection[i].classList.remove("d-none");
  }

  if (sections[currentSection] === "finished-section") {
    console.log("That was the final page. Disabling button");
    nextButton.hidden = true;
  }

}

function handleButtonClick() {
  if (sections[currentSection] === "intro-section") {
  }
  if (sections[currentSection] === "personal-info") {
    if (validatePersonalInfo() === false) {
      console.log("Returning for no validate pers info")
      return;
    }
  }
  if (sections[currentSection] === "address") {
    if (validateAddress() === false) {
      console.log("Returning for no validate addr")
      return;
    }
  }
  if (sections[currentSection] === "experience") {
    if (validateExperience() === false) {
      return;
    }
  }  


  if(sections[currentSection] === "finished-section") {
    console.error("Button still enabled on final page.")
    return;
  }

  changeSection(currentSection+1)


  // console.log(sections[currentSection])


  // console.log("before click was on: " + currentSection + " of " + (sections.length-1)); 
  // updateBreadCrumbs(currentSection);

  // currentSection++;

  // let nextSection = document.getElementById(sections[currentSection]);
  // nextSection.classList.remove("d-none");
  // nextSection.classList.add("d-active");

  // if (currentSection === (sections.length-1)) {
  //   console.log("That was the final page. Disabling button");
  //   nextButton.hidden = true;
  // }


  document.body.scrollTop = 0;
  console.log("END VS:  " + currentSection + " vs " + (sections.length-1));
  

}

// Show all prior to the section we're at, and hide all after.
// TODO: Update this when we allow them to switch around.
function updateBreadCrumbs(currentSection) {
  let crumbsection = document.getElementById("breadcrumb-list")
  console.log("in Update Bread Crumbs");

  let showing = true;
  for (let i = 0; i < crumbsection.children.length; i++) {
    if (showing) {
      crumbsection.children[i].classList.remove("d-none");
      crumbsection.children[i].classList.remove("active");
      if (i === (currentSection - 1)) {
        console.log("Hit our current one at " + i)
        crumbsection.children[i].classList.add("active")
        showing = false;
        console.log("Setting showing to false @ " + i);
      }
    }
    else {
      crumbsection.children[i].classList.add("d-none")
    }
  }
}

function showErrorBar(newStatus) {
  let errorBar = document.getElementById("error-info");
  if (newStatus === true) {
    errorBar.classList.remove("d-none")
  }
  else {
    errorBar.classList.add("d-none")
  }

}


// TEMPORARY DEBUGGING!
function showAllForTesting() {
  for (let i = 0; i < sections.length; i++) {
    document.getElementById(sections[i]).classList.remove("d-none")
  }
  let crumbsection = document.getElementById("breadcrumb-list")
  for (let i = 0; i < crumbsection.children.length; i++) {
    crumbsection.children[i].classList.remove("d-none")  
  }
}

//showAllForTesting();
// REMOVE ABOVE IF NOT DEBUGGING

// let errorShowing = false
// const hdr = document.getElementById('header-bar');
// hdr.addEventListener('click', function()  {
//   if (!errorShowing) {
//     errorShowing = true  
//   }
//   else {
//     errorShowing = false
//   }
//   showErrorBar(errorShowing);
// });


  // Use this function to set the customer's first name on the screen.
  // If I was writing backend code, I'd have it put into the HTML that way.
function setFirstName(newName) {
  let elements = document.getElementsByClassName("insertFirstName")
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerText = newName;
  }
}

function setCity(city) {
  let elements = document.getElementsByClassName("insertCity")
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerText = city;
  }
}

// TODO: THIS IS NOT DOING ANY ERROR CHECKING!
function setMyField(fieldName, value) {
  let elements = document.getElementsByClassName(fieldName)
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerText = value;
  }
  console.log("Setting " + fieldName + " to: " + value)  
}


// // FOR TESTING ONLY!
// currentSection = 1
// document.getElementById(sections[currentSection-1]).classList.add("d-none")
// document.getElementById(sections[currentSection]).classList.remove("d-none")

// Validates First Name, Last Name, DOB
function validatePersonalInfo() {
  let isValid = true
  let firstName = getField("first-name")
  let lastName = getField("last-name")
  let birthdate = getField("birthday")

  console.log(firstName.value + " " + lastName.value + " " + birthdate.value); 
  
  if (firstName.value === null || firstName.value === "") {
    isValid = false;
    showAsError(firstName, true);
  }
  
  if (lastName.value === null || lastName.value === "") {
    isValid = false;
    showAsError(lastName, true);
  }

  // TODO: Validate it is an actual, valid date
  if (birthdate.value === null || birthdate.value === "" 
  || birthdate.value.replace(/\//g, '').length < 8) {
    isValid = false;
    showAsError(birthdate, true);
  }

  if (isValid) {
    customer.firstName = firstName.value;
    customer.lastName = lastName.value;
    customer.birthdate = birthdate.value;
    setFirstName(firstName.value);
  }

  

  return isValid;
}

// Validates First Name, Last Name, DOB
function validateAddress() {
  let isValid = true
  let street = getField("street-address")
  let city = getField("city")
  let state = getField("state")
  let zip = getField("zip")
  
  if (street.value === null || street.value === "") {
    isValid = false;
    showAsError(street, true);
  }
  if (city.value === null || city.value === "") {
    isValid = false;
    showAsError(city, true);
  }
  if (state.value === null || state.value === "") {
    isValid = false;
    showAsError(state, true);
  }
  
  // TODO: Validate it is an actual, valid zip
  if (zip.value === null || zip.value === "" 
  || zip.value.length !== 5) {
    isValid = false;
    showAsError(zip, true);
  }

  if (isValid) {
    customer.street = street.value;
    customer.city = city.value;
    customer.state = state.value;
    customer.zip = zip.value;
    setCity(city.value);
  }

  return isValid;
}

// Validates Experience Level
function validateExperience() {
  let isValid = true
  let experience = getField("years-experience")
  
  if (experience.value === null || experience.value === "") {
    isValid = false;
    showAsError(experience, true);
  }
  
  if (isValid) {
    customer.yearsExperience = experience.value;
    let myPhrase;
    if (experience.value === "0") {
      myPhrase = "None? That's okay because we all start somewhere. It'll be fun learning about robots!";
    }
    else if (experience.value === "1-2") 
    {
      myPhrase = "1-2 Years is a little bit of experience, but not an expert yet. Most people I talk to are the same way.";
    }
    else if (experience.value === "3-5") {
      myPhrase = "You're pretty much a natural by now, I'm guessing. We have some deals for you!";
    }
    else if (experience.value === "6-11") {
      myPhrase = "6-11 Years?  Nice. I don't talk to very many people with that much experience.";
    }
    else if (experience.value === "12+") {
      myPhrase = "12+ Years? Amazing! Why don't you just take my job?  Just kidding, I don't get paid."
    }
    else {
      myPhrase = "Sounds fishy."
    }
    setMyField("insertExperience", myPhrase);
  }

  return isValid;
}


function getField(fieldName) {
  let myField = document.getElementsByName(fieldName)[0];
  showAsError(myField, false); // Clear any potential error
  return myField
}

// This does not do any error checking. I am only using this for debugging.
function setField(fieldName, value) {
  let myField = document.getElementsByName(fieldName)[0];
  myField.value = value;
  console.log("Setting " + fieldName + " to: " + value)
}

function showAsError(element, errorStatus) {
  if (errorStatus === true) {
    element.parentElement.classList.add('error');
  }
  else {
    element.parentElement.classList.remove("error");
  }
  return null;
}



/// TEMPORARY DEBUGGING!!!!
//changeSection(1);
setField("first-name", "Bob");
setField("last-name", "Bob");
setField("birthday", "1990-01-05");

// setField("", "");
setField("street-address", "101 Main St");
setField("city", "San Diego");
setField("state", "CA");
setField("zip", "92106");


