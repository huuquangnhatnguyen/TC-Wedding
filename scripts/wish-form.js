// Firebase Set up:
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {getDatabase, ref, child, set, get, push, onValue, query, orderByChild, update, increment} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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
  initializeApp(firebaseConfig);
  // Get a reference to the database
  var database = getDatabase();

// Event listener for submission

window.addEventListener("DOMContentLoaded", (event) => {
  const el=document.getElementById("wish-form");
  if (el) {
    el.addEventListener("submit", submissionMessage);
  }
});

async function submissionMessage(event) {
  event.preventDefault();
  var name = document.getElementById('form-name').value;
  var message = document.getElementById('form-message').value;
  var yesNoValue = document.getElementById('RSVP').value;
  if (name && message && yesNoValue) {
    try {
    // Get the current wish count
    const snapshot = await get(ref(database, 'wish-count/count'));
    const wishCount = snapshot.val();
    
    // Decrement the wish count by 1
    await update(ref(database, 'wish-count'), { count: wishCount - 1 });

    // Add the new message to Firebase
    await addMessageToFirebase(name, message, yesNoValue, wishCount);

    // Clear the form inputs
    document.getElementById('form-name').value = '';
    document.getElementById('RSVP').value = '';
    document.getElementById('form-message').value = '';
    }catch (error){
      console.error('Error submitting form:', error);
    }}
  fetchMessages();
  console.log('succeeded submit')
};


// Function to add a new message to Firebase
function addMessageToFirebase(name, message, yesNoValue, wishNo) {
  var postListRef = ref(database, 'TC Wedding');
  var newPostRef = push(postListRef);
  set(newPostRef, {
    name: name,
    message: message,
    yesNoValue: yesNoValue,
    wishNo: wishNo
  })  
  
}

// Fetch Message from Database
function fetchMessages() {
  const wishRef = ref(database, 'TC Wedding/');
  onValue(query(wishRef, orderByChild('wishNo')), (snapshot) => {
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
    }
    )
  }
  )
}


// Function to create a message element
function createMessageElement(name, message, yesNoValue, messageId) {
  
  var messageElement = document.createElement('div');
  messageElement.className = 'wish-ans grid-box font-don-gian';
  messageElement.innerHTML = 
  '<div>'+
    '<div class="guest-name">' + name + '</div>'+ 
    '<div class="guest-message">' + message + '</div>'+
  '</div>';
  return messageElement;
}


window.addEventListener("DOMContentLoaded", (event) => {
  fetchMessages();
});

