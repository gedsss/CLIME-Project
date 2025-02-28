document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    const value = document.querySelector('#searchInput').value;
    if (!value) {
        warning('Please enter a city name!');
        return;
    }

    warning('Loading...');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(value)}&units=metric&lang=pt_br&appid=d0107bd3d458018621e34b7d2195ba96`);
        const json = await response.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg
            });
        } else {
            warning("City can't be found!");
        }
    } catch (error) {
        warning("Error fetching weather data!");
        console.error(error);
    }
});

function warning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clear() {
    warning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showInfo(obj) {
    warning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    document.querySelector('.tempInfo').innerHTML = `${obj.temp}<sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed}<span>km/h</span>`;

    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windDeg - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}
