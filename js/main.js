'use strict';

const apiKey = ''; // API KEY DE OPENWEATHER
let key = ''; //API DE GOOGLE MAP

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");

const list1 = document.querySelector(".ajax-section .container .grid-1");
const list2 = document.querySelector(".ajax-section .container .grid-2");
const list3 = document.querySelector(".ajax-section .container .map");

let body = document.getElementsByTagName('body')[0];

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&lang=es&appid=${apiKey}&units=metric`;
    
    let urlMap = `https://www.google.com/maps/embed/v1/search?key=${key}&q=${inputVal}&maptype=roadmap&language=es`;


    fetch(url)
        .then(
            function (response) {
                response.json().then(function (data) {
                    const {
                        main,
                        name,
                        sys,
                        weather,
                        wind
                    } = data;
                    const icon = `https://openweathermap.org/img/wn/${
      weather[0]["icon"]
      }@2x.png`;
                    let nombreCiudad = `<div class="grid-0">
<h2 class="city-name">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
</div>`;
                    list1.innerHTML = nombreCiudad;
                    
                    const grid1 = document.createElement("div");
                    grid1.classList.add("cont-1");
                    list1.appendChild(grid1);
                    
                    const grid2 = document.createElement("div");
                    grid2.classList.add("cont-2");
                    list2.appendChild(grid2);
                   
                    const markup1 = `
        <div>
<p>Maxima:<span>${main.temp_max}</span><sup>°C</sup></p>
</div>
<figure class="span-row-2">
<img src="img/minMax.svg">
</figure>
<div>
        <p>Minima:<span>${main.temp_min}</span><sup>°C</sup></p>
        </div>
      `;
            grid1.innerHTML = markup1;
                    
      let markup2 = `
      <div>
      <p>Humedad:<span>${main.humidity}</span><sup>%</sup></p>
      <figure>
<img src="img/humedad.svg">
</figure>
      </div>
      <div>
        <p>Preción atmosferica:<span>${main.pressure}</span><sup>°C</sup></p>
        <figure>
<img src="img/presion-atmosferica.svg">
</figure>
        </div>
        <div>
        <p>Velocidad de viento:<span>${wind.speed}</span><sup>km/h</sup></p>
        <figure>
<img src="img/velViento.svg">
</figure>
</div>
<div>
<p>${weather[0]["description"]}</p>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        </figure>
        </div>
      `;
                    grid2.innerHTML = markup2;

                    let contMap = document.createElement('iframe');
                    contMap.src = urlMap;
                    contMap.allowFullscreen = true;
                    list3.appendChild(contMap);
                    
                    window.localStorage.setItem('Ciudad', JSON.stringify(list1));

                    window.localStorage.setItem('Datos', JSON.stringify(grid1));
                    window.localStorage.setItem('Datos', JSON.stringify(grid2));


                    let img = weather[0]["main"];
console.info('dato: ', img);
    
    switch (img) {
    case 'Thunderstorm': //TORMENTA
        body.style.cssText = 'background-color: #A0C4FF !important' //colores[5];
        break;
    case 'Drizzle': //LLOVISNA
        body.style.cssText = 'background-color: #FFC6FF !important' //colores[7];
        break;
    case 'Rain': //LLUVIA
        body.style.cssText = 'background-color: #A0C4FF !important' //colores[5];
        break;
    case 'Snow': //NIEVE
        body.style.cssText = 'background-color: #FFFFFC !important' //colores[8];
        break;
    case 'Mist': //NEBLINA
        body.style.cssText = 'background-color: #9BF6FF !important' //colores[4];
        break;
    case 'Smoke': //HUMO
        body.style.cssText = 'background-color: #FFADAD !important' //colores[0];
        break;
    case 'Haze': //NEBLINA
        body.style.cssText = 'background-color: #9BF6FF !important' //colores[4];
        break;
    case 'Dust': //POLVO
        body.style.cssText = 'background-color: #FFD6A5 !important' //colores[1];
        break;
    case 'Fog': //NIEBLA
        body.style.cssText = 'background-color: #9BF6FF !important' //colores[4];
        break;
    case 'Sand': //ARENA
        body.style.cssText = 'background-color: #FDFFB6 !important' //colores[2];
        break;
    case 'Ash': //CENIZA
        body.style.cssText = 'background-color: #CAFFBF !important' //colores[3];
        break;
    case 'Squall': //RAFAGA
        body.style.cssText = '#A0C4FF !important' //colores[5];
        break;
    case 'Tornado': //
        body.style.cssText = '#BDB2FF !important' //colores[6];
        break;
    case 'Clear': //CLARO
        body.style.cssText = '#9BF6FF !important' //colores[4];
        break;
    default:
    case 'Clouds': //NUBES
        body.style.cssText = 'FFFFFC !important' //colores[8];
        break;
}
                    
                });
            }
        )
        .catch(() => {
            msg.textContent = "Por favor ingresa una ciudad valida";
        });
    
    msg.textContent = "";
    form.reset();
    input.focus();
});