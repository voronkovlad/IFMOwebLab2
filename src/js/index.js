

function apiSet(num, lat, lon, city, flag) {
    var reqs = "";
    if(city===null) {
        reqs = "https://community-open-weather-map.p.rapidapi.com/weather?lat=" + lat + "&lon=" + lon;
    }
    else{
        reqs = "https://community-open-weather-map.p.rapidapi.com/weather?q=" + city;
    }
    fetch(reqs, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "1483006ab6mshe2a3165adf287c6p124192jsn661aae0f7dd9"
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {
            if((flag===1)&&(localStorage.getItem(data.name))){
                alert("Этот город уже добавлен.");
                return;
            }
            if(data.message!=undefined){
                alert(data.message);
                return;
            }
            if(flag===1){
            trueAddTown();
            }
            console.log(data);document.getElementById(num + "city").innerHTML = data.name;
            document.getElementById(num + "temp").innerHTML = parseInt(data.main.temp - 271) + "°C";
            document.getElementById(num + "wind").innerHTML = data.wind.speed + " m/s " + data.wind.deg + "°";
            document.getElementById(num + "cloud").innerHTML = data.weather[0].description;
            document.getElementById(num + "pressure").innerHTML = data.main.pressure + " hpa";
            document.getElementById(num + "humidity").innerHTML = data.main.humidity + "%";
            document.getElementById(num + "coords").innerHTML = data.coord.lon + " " + data.coord.lat;
            if(flag === 1){
                localStorage.setItem(data.name, 0);
                numCit++;
            }
    })
        .catch(err => {
            alert(err);
        });
}



function getLocation() {
    navigator.permissions.query({name: 'geolocation'}).then(function (result) {
        if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(function (position) {
                apiSet("main-",String(position.coords.latitude), String(position.coords.longitude), null);
            })
        }
        else {
            apiSet("main-",0, 0, "Rostov-on-Don");
        }
    });

}


var numCit = 1;


function addTown() {
    apiSet(numCit, 0, 0, document.getElementById("inp").value, 1);

}

function trueAddTown() {
    var city = document.createElement("div");
    city.className = "city__block";
    city.id = numCit + "block";
    let htmlcode = "                    <div class=\"city__header\">\n" +
        "                        <h3 class=\"city__title\" id=\"" + numCit + "city\"></h3>\n" +
        "                        <div class=\"city__weather\" id=\"" + numCit + "temp\"></div>\n" +
        "                        <div class=\"city__weather-icon\">\n" +
        "                            <img src=\"../img/weather.png\"></img>\n" +
        "                        </div>\n" +
        "                        <button class=\"small-button city__delete\" onclick=\"cityDelete("+ numCit+ ")\">\n" +
        "                            x\n" +
        "                        </button>\n" +
        "                    </div>\n" +
        "                    <div class=\"weather-info\">\n" +
        "                        <div class=\"weather-info__title\">Ветер</div>\n" +
        "                        <div class=\"weather-info__text\" id=\"" + numCit + "wind\"></div>\n" +
        "                    </div>\n" +
        "                    <div class=\"weather-info\">\n" +
        "                        <div class=\"weather-info__title\">Облачность</div>\n" +
        "                        <div class=\"weather-info__text\" id=\"" + numCit + "cloud\"></div>\n" +
        "                    </div>\n" +
        "                    <div class=\"weather-info\">\n" +
        "                        <div class=\"weather-info__title\">Давление</div>\n" +
        "                        <div class=\"weather-info__text\" id=\"" + numCit + "pressure\"></div>\n" +
        "                    </div>\n" +
        "                    <div class=\"weather-info\">\n" +
        "                        <div class=\"weather-info__title\">Влажность</div>\n" +
        "                        <div class=\"weather-info__text\" id=\"" + numCit + "humidity\"></div>\n" +
        "                    </div>\n" +
        "                    <div class=\"weather-info\">\n" +
        "                        <div class=\"weather-info__title\">Кординаты</div>\n" +
        "                        <div class=\"weather-info__text\"id=\"" + numCit + "coords\"></div>\n" +
        "                    </div>\n"
    city.innerHTML = htmlcode;
    document.getElementById("allcity").appendChild(city);
}

function setCities() {
    for (let i = 0; i < localStorage.length; i += 1) {
        let city = localStorage.key(i);
        trueAddTown();
        apiSet(i+1, 0, 0, city);
        numCit++;
    }
}


function onCreate() {
    getLocation();
    setCities();
}

function cityDelete(num) {
    localStorage.removeItem(document.getElementById(num + "city").innerHTML);
    document.getElementById(num+"block").remove();
    numCit += -1;
}


