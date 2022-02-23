const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    //if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucces, onError)
    }else{
        alert("Your browser not support geolaction api")
    }
});

function onSucces(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9f3426834f9ece93c6d027633402b7eb`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9f3426834f9ece93c6d027633402b7eb`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weahterDetails(result));
}

function weahterDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src = "https://th.bing.com/th/id/R.d7657f87bba4aa9e45293ede90e588bc?rik=%2b1epNHZPoboiiw&pid=ImgRaw&r=0";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "https://image.flaticon.com/icons/png/512/622/622097.png";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "https://th.bing.com/th/id/R.a6913f1976541c14b1f21b620d46523a?rik=Km61tRbbs7ZLAQ&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2015%2f11%2fsnow-weather-icon_2398.png&ehk=QfKN0IM%2fr6vjaTCFQy5GKPlcNE%2fPBvn%2bP%2f629ewOvP4%3d&risl=&pid=ImgRaw&r=0";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "https://th.bing.com/th/id/OIP.rwqZk3vY1B7MI3VOsPhYJgHaHa?pid=ImgDet&rs=1";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "https://th.bing.com/th/id/R.e548e81334fd18f0e7a8698af7510595?rik=Iiru%2bR3eArCNGQ&pid=ImgRaw&r=0";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "https://th.bing.com/th/id/OIP.frJ5yU4OgS9eJuiq1RNGqwHaHa?pid=ImgDet&rs=1";
        }


        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like); 
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;    

        infoTxt.classList.remove("pending" , "error");
        wrapper.classList.add("active");
    }  
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})