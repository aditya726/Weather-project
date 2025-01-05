
const apiKey = "API_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector('.Search-Bar');
const searchButton = document.querySelector('.Search-Icon');

async function checkWheather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);
    if (data.cod === "404") {
        alert("City not found!");
    }
    else {
        setTimeout(()=>{
            let placeName = document.querySelector('.place');
            placeName.innerHTML = data.name ;

            let temprature = document.querySelector('.temp');
            temprature.innerHTML = data.main.temp + "°c";

            let humidity = document.querySelector('.percentage');
            humidity.innerHTML = data.main.humidity + "%";

            let speed = document.querySelector('.speed');
            speed.innerHTML = data.wind.speed + "km/ph";

            let Image = document.querySelector('.Indication');

            Image.classList.remove('visible');

            const weatherName = data.weather[0].main;
            switch (weatherName) {
                case 'Clear': Image.src = "images/clear.png";
                    break;
                case 'Clouds': Image.src = "images/clouds.png";
                    break;
                case 'Drizzle': Image.src = "images/drizzle.png";
                    break;
                case 'Mist': Image.src = "images/mist.png";
                    break;
                case 'Rain': Image.src = "images/rain.png";
                    break;
                case 'Snow': Image.src = "images/snow.png";
                    break;
            }
            setTimeout(() => {
                Image.classList.add('visible');
            }, 100);
        },100)
    }
}


async function ChangeImage(city){
    const imgkey = "API_KEY";
    const imgurl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${imgkey}
    `;
    const response = await fetch(imgurl);
    const data = await response.json();
    const imageUrl = data.results[0].urls.full;
    document.body.style.backgroundSize ='cover';
    document.body.style.backgroundPosition = 'center';
    setTimeout(()=>{
        document.body.style.backgroundImage =`url(${imageUrl})`;
    },100);
}


searchButton.addEventListener('click', () => {
    const city = searchBar.value;
    if (!city) {
        alert("please Enter place name first");
    } else {
        ChangeImage(city);
        checkWheather(city);
    }
});