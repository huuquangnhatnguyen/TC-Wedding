

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