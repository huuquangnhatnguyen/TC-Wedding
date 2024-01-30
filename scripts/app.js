const timer = () => {
    let countDownDate = (new Date(document.getElementById('time-countdown').getAttribute('data-time').replace(' ', 'T'))).getTime();

    setInterval(() => {
        let distance = Math.abs(countDownDate - (new Date()).getTime());

        document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
};