

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
    messageElement.innerHTML = '<div class="guestname">' + name + '</div>'+ '<div class="guest-message">' + message + '</div>';

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
    var existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
  
    // Add the new message
    existingMessages.push({ name: name, message: message });
  
    // Save the updated messages back to local storage
    localStorage.setItem('messages', JSON.stringify(existingMessages));
  }

  function loadMessages() {
    // Load existing messages from local storage
    var existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
  
    // Display existing messages
    var messagesContainer = document.getElementById('wish-ans-container');
    existingMessages.forEach(function (msg) {
      var messageElement = document.createElement('div');
      messageElement.className = 'wish-ans grid-box font-don-gian';
      messageElement.innerHTML = '<div class="guestname">' + msg.name + '</div>'+ '<div class="guest-message">' + msg.message + '</div>' + '<button onclick="deleteMessage(this)">X</button>';
      messagesContainer.appendChild(messageElement);
    });
  }

  function deleteMessage(button) {
    // Get the parent element (message) of the clicked delete button
    var messageElement = button.parentNode;
  
    // Load existing messages from local storage
    var existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
  
    // Find and remove the deleted message from the array
    existingMessages = existingMessages.filter(function (msg) {
      return msg.name + ': ' + msg.message !== messageElement.textContent.trim();
    });
  
    // Save the updated messages back to local storage
    localStorage.setItem('messages', JSON.stringify(existingMessages));
  
    // Remove the message from the DOM
    messageElement.remove();
  }
console.log('run without bug')