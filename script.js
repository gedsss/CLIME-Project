document.querySelector('.busca').addEventListener('submit', async (event) => {
event.preventDefault()

let value = document.querySelector('#searchInput').value

warning('Carregando...')

let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(value)}&units=metric&lang=pt_br&appid=d0107bd3d458018621e34b7d2195ba96`)

let json = await url.json();

console.log(json)

if(json.cod === 200){
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windDeg: json.wind.deg
        })
} else {
    warning('Cidade não encontrada!!')
}
})

function warning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function clear(){
    warning('')
    document.querySelector('resultado').style.display = 'none'
}

function showInfo(obj){
    warning('')

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`

    document.querySelector('.tempInfo').innerHTML = `${obj.temp}<sup>ºC</sup>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`)

    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed}<span>km/h</span>`

    document.querySelector('.resultado').style.display = 'block'
}