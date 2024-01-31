

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

// Load messages from local storage on page load
window.onload = function () {
    loadMessages();
  };

function submitMessage() {
    // Get values from the form
    var name = document.getElementById('form-name').value;
    var message = document.getElementById('form-message').value;
    // Create a new message element
    var messageElement = document.createElement('div');
    messageElement.className = 'wish-ans grid-box font-don-gian';
    messageElement.innerHTML = '<div>'+'</div><div class="guestname">' + name + '</div>'+ '<div class="guest-message">' + message + '</div>'+'</div>' + '<button onclick="deleteMessage(this)">X</button>';

    // Append the message to the messages container
    var messagesContainer = document.getElementById('wish-ans-container');
    messagesContainer.appendChild(messageElement);
  
    // Save the message to local storage
    saveMessage(name, message);

    // Clear the form inputs
    document.getElementById('form-name').value = '';
    document.getElementById('form-message').value = '';
}


function saveMessage(name, message) {
    // Load existing messages from local storage
    var existingMessages = JSON.parse(localStorage.getItem('wish-ans-container')) || [];
  
    // Add the new message
    existingMessages.push({ name: name, message: message });
  
    // Save the updated messages back to local storage
    localStorage.setItem('wishes', JSON.stringify(existingMessages));
  }

  function loadMessages() {
    // Load existing messages from local storage
    var existingMessages = JSON.parse(localStorage.getItem('wishes')) || [];
  
    // Display existing messages
    var messagesContainer = document.getElementById('wish-ans-container');
    existingMessages.forEach(function (msg) {
      var messageElement = document.createElement('div');
      messageElement.className = 'wish-ans grid-box font-don-gian';
      messageElement.innerHTML = '<div class="wish-data">'+'<div class="guestname">' + msg.name + '</div>'+ '<div class="guest-message">' + msg.message + '</div>' + '</div>' + '<button class="mes-remove-btn" onclick="deleteMessage(this)">X</button>';
      messagesContainer.appendChild(messageElement);
    });
  }

  const adminToken = "Solss1302"

  function deleteMessage(button) {
    
    var userToken = prompt('Enter your token:'); // Replace with a secure way to get the token from the authenticated user
    if (userToken !== adminToken) {
        alert('Unauthorized. You do not have permission to delete messages.');
    return;
  }
    // Get the parent element (message) of the clicked delete button
    var messageElement = button.parentNode;
    console.log(messageElement.textContent.trim())
  
    // Load existing messages from local storage
    var existingMessages = JSON.parse(localStorage.getItem('wishes')) || [];
    console.log('Existing:', existingMessages)
  
    // Find and remove the deleted message from the array
    var indexToDelete = -1;
    existingMessages.forEach(function (msg, index) {
    if (msg.name + msg.message+'X' === messageElement.textContent.trim()) {
      indexToDelete = index;
    }
  });

  console.log('Index to Delete:', indexToDelete);
  
    // Save the updated messages back to local storage
    if (indexToDelete !== -1) {
        existingMessages.splice(indexToDelete, 1);
    
        // Save the updated messages back to local storage
        localStorage.setItem('wishes', JSON.stringify(existingMessages));
        console.log('After deleting:', existingMessages)
      }

    // Remove the message from the DOM
    messageElement.remove();
  }

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