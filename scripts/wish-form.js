// Firebase Set up:
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVz534wQmeoXn6SxBLWo4NlFaJeUBwpJM",
  authDomain: "tc-wedding-36a90.firebaseapp.com",
  databaseURL: "https://tc-wedding-36a90-default-rtdb.firebaseio.com",
  projectId: "tc-wedding-36a90",
  storageBucket: "tc-wedding-36a90.appspot.com",
  messagingSenderId: "824076036510",
  appId: "1:824076036510:web:23c1effad8dfecfe528e8f",
  measurementId: "G-9Z7P0QKX2Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database
var database = firebase.database();

// Event listener for submission

window.addEventListener("DOMContentLoaded", (event) => {
  const el=document.getElementById("wish-form");
  if (el) {
    el.addEventListener("submit", submissionMessage);
  }
});

function submissionMessage(event) {
  event.preventDefault();
  var name = document.getElementById('form-name').value;
  var message = document.getElementById('form-message').value;
  var yesNoValue = document.getElementById('RSVP').value;
  console.log("i am here 1");
  if (name && message && yesNoValue) {
    // Add the new message to Firebase
    addMessageToFirebase(name, message, yesNoValue);
    console.log("i am here 2");
    // Clear the form inputs
    document.getElementById('form-name').value = '';
    document.getElementById('RSVP').value = '';
    document.getElementById('form-message').value = '';
  }
  console.log('succeeded')
};

// Function to add a new message to Firebase
function addMessageToFirebase(name, message, yesNoValue) {
  database.ref('TC Wedding').push({
    name: name,
    message: message,
    yesNoValue: yesNoValue
  });
  console.log("i am here 3");
}

// Fetch Message from Database
function fetchMessages() {
  console.log("i am here 4.1");
  var wishRef = database.ref("TC wedding")
  wishRef.once("value", function (snapshot) {
    console.log("i am here 4");
    var messagesContainer = document.getElementById('wish-container');
    messagesContainer.innerHTML = ''; // Clear the existing messages

    // Display existing messages
    snapshot.forEach(
      function (childSnapshot) {
        var messageData = childSnapshot.val();
        var messageId = childSnapshot.key;
        var messageElement = createMessageElement(
          messageData.name, messageData.message, messageData.yesNoValue, messageId
          );
        messagesContainer.appendChild(messageElement);
      });
      console.log("i am here 5");
  });
}

// Function to create a message element
function createMessageElement(name, message, yesNoValue, messageId) {
  
  var messageElement = document.createElement('div');
  messageElement.className = 'wish-ans grid-box font-don-gian';
  messageElement.innerHTML = 
  '<div>'+
    '<div class="guestname">' + name + '</div>'+ 
    '<div class="guest-message">' + message + '</div>'+
  '</div>' + 
  '<button onclick="deleteMessage(\'' + messageId + '\')">X</button>';
  console.log("i am here 6");
  return messageElement;
}


window.addEventListener("DOMContentLoaded", (event) => {
  fetchMessages();
});

console.log("i am here 7");
