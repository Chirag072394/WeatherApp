const userTab=document.querySelector('[data-userWeather]');
const searchTab=document.querySelecto('[data-searchWeather]');
const userContainer=document.querySelector('[.weather-container]');

const grantAccessContainer=document.querySelector('.grant-location-access');
const searchForm=document.querySelector('[data-searchForm]');
const loadingScreen=document.querySelector('.loading-container');
const userInfoContainer=document.querySelector('.user-info-container');


let currentTab=userTab;

//Api KEy
const API_KEY='c2f5ad623070e27fef773cd2af0cfb58';

currentTab.classList.add('current-tab');

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove('current-tab');
        currentTab=clickedTab;
        currentTab.classList.add('current-tab');

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            //switching back to user Weather and have to make it visible
            
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            //get coordinates to show weather of user location
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener('click',()=>{
    //passing clicked tab as input listener
    switchTab(userTab);
})
searchTab.addEventListener('click',()=>{
    //passing clicked tab as input listener
    switchTab(searchTab);
})

//check coordinate present in current session local storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // if not found 
        grantAccessContainer.classList.add("active");

    }else{
            const coordinates=json.parse(localCoordinates);
            fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    //make grant container invisible
    grantAccessContainer.classList.remove('active');
    //make loader visible
    loadingScreen.classList.add('active');

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?
        &lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data= await response.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }catch(err){


    }
}

function renderWeatherInfo(weatherInfo){

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windSpeed]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    
}