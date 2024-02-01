var element = document.getElementById('time-countdown');
var dataTime = element.getAttribute('data-time');
let countDownDate = (new Date(dataTime)).getTime();
console.log(countDownDate);
// Update the countdown every second
const countdownInterval = setInterval(timer, 1000);

function timer () {
        const currentDate = (new Date()).getTime();
        let timeRemaining = Math.abs(countDownDate - currentDate);

        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        document.getElementById('days').innerHTML = `${days} `;

        let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('hours').innerHTML = `${hours}`;
        
        let mins = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('mins').innerHTML = `${mins}`;

        let secs = Math.floor((timeRemaining % (1000 * 60)) / 1000)
        document.getElementById('secs').innerHTML = `${secs}`;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = 'Countdown expired!';
        }
};


// Firebase Set up:
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVz534wQmeoXn6SxBLWo4NlFaJeUBwpJM",
  authDomain: "tc-wedding-36a90.firebaseapp.com",
  projectId: "tc-wedding-36a90",
  storageBucket: "tc-wedding-36a90.appspot.com",
  messagingSenderId: "824076036510",
  appId: "1:824076036510:web:23c1effad8dfecfe528e8f",
  measurementId: "G-9Z7P0QKX2Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
var database = firebase.database().ref('wishes');

// Event listener for submission
document.getElementById('messageForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var name = document.getElementById('form-name').value;
  var message = document.getElementById('RSVP').value;
  var yesNoValue = document.getElementById('form-message').value;

  if (name && message && yesNoValue) {
    // Add the new message to Firebase
    addMessageToFirebase(name, message, yesNoValue);

    // Clear the form inputs
    document.getElementById('form-name').value = '';
    document.getElementById('RSVP').value = '';
    document.getElementById('form-message').value = 'CÓ'; // Reset the select to 'Yes'

    // sent noti
    document.querySelector('.alert').style.display = 'block';
  }
});

// Function to add a new message to Firebase
function addMessageToFirebase(name, message, yesNoValue) {
  database.push({
    name: name,
    message: message,
    yesNoValue: yesNoValue
  });
}

// Fetch Message from Database
function fetchMessages() {
  databases.on('value', function (snapshot) {
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
  messageElement.innerHTML = 
  '<div>'+'<div class="guestname">' + name + '</div>'+ '<div class="guest-message">' + message + '</div>'+'</div>' + '<button onclick="deleteMessage(\'' + messageId + '\')">X</button>';

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

  function showAllPhotos() {
    var allPhotoGallery = document.getElementById('allPhotos')
    for (let i = 1; i <= 16; i++) {
        var newPhoto = document.createElement('div');
        newPhoto.className = 'photo';
        newPhoto.id = 'photo'+i;
        newPhoto.innerHTML = '<img src="./images/portrait/portrait_'+i+'.jpg" alt=""></img>';
        allPhotoGallery.appendChild(newPhoto);
    }

    for (let i = 1; i <= 6; i++) {
        var newPhoto = document.createElement('div');
        newPhoto.className = 'photo';
        newPhoto.id = 'photo'+(i+22);
        newPhoto.innerHTML = '<img src="./images/landscape/landscape_'+i+'.jpg" alt=""></img>';
        allPhotoGallery.appendChild(newPhoto);
    }

    // Display the modal
    document.getElementById('myModal').style.display = 'block';

  }
  
  function closeModal() {
    // Close the modal
    document.getElementById('myModal').style.display = 'none';
  }
  

console.log('run without bug')

