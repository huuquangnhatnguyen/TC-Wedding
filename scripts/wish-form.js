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
var database = firebase.database().ref('TC Wedding');

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
  database.push({
    name: name,
    message: message,
    yesNoValue: yesNoValue
  });
  console.log("i am here 3");
}

// Fetch Message from Database
function fetchMessages() {
  database.on('value', function (snapshot) {
    var messagesContainer = document.getElementById('wishes-ans-box');
    messagesContainer.innerHTML = ''; // Clear the existing messages

    // Display existing messages
    snapshot.forEach(function (childSnapshot) {
      var messageData = childSnapshot.val();
      var messageId = childSnapshot.key;
      var messageElement = createMessageElement(messageData.name, messageData.message, messageData.yesNoValue, messageId);
      messagesContainer.appendChild(messageElement);
    });
  });
}

// Function to create a message element
function createMessageElement(name, message, yesNoValue, messageId) {
  
  var messageElement = document.createElement('div');
  messageElement.className = 'wish-ans grid-box font-don-gian';
  messageElement.innerHTML = '<div>'+'</div><div class="guestname">' + name + '</div>'+ '<div class="guest-message">' + message + '</div>'+'</div>' + '<button onclick="deleteMessage(\'' + messageId + '\')">X</button>';

  return messageElement;
}

function deleteMessage(messageId) {
  database.ref('messages/' + messageId).remove(); // Remove from the database

  // Remove the corresponding DOM element
  var messageElement = document.getElementById(messageId);
  if (messageElement) {
    messageElement.remove();
  }
}

fetchMessages();

console.log('run without bug')
