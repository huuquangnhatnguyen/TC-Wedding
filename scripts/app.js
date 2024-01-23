const storage = (table) => {

    if (!localStorage.getItem(table)) {
        localStorage.setItem(table, JSON.stringify({}));
    }

    const get = (key = null) => {
        let data = JSON.parse(localStorage.getItem(table));
        return key ? data[key] : data;
    };

    const set = (key, value) => {
        let storage = get();
        storage[key] = value;
        localStorage.setItem(table, JSON.stringify(storage));
    };

    const unset = (key) => {
        let storage = get();
        delete storage[key];
        localStorage.setItem(table, JSON.stringify(storage));
    };

    const has = (key) => Object.keys(get()).includes(key);

    return {
        get,
        set,
        unset,
        has,
    };
};


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