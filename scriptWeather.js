const userTab=document.querySelector('[data-userWeather]');
const searchTab=document.querySelector('[data-searchWeather]');
const userContainer=document.querySelector('[weather-container]');

const grantAccessContainer=document.querySelector('.grant-location-access');
const searchForm=document.querySelector('[data-searchForm]');
const loadingScreen=document.querySelector('.loading-container');
const userInfoContainer=document.querySelector('.user-info-container');


let currentTab=userTab;
//Api KEy
const API_KEY='c2f5ad623070e27fef773cd2af0cfb58';
currentTab.classList.add('current-tab');
getfromSessionStorage();

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
            const coordinates=JSON.parse(localCoordinates);
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
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
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
    const description=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temperature=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windSpeed]");
    const cloudiness=document.querySelector("[data-cloudiness]");
    const humidity=document.querySelector("[data-humidity]");

    //fetching values and put in the page dynamically

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;    
    description.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temperature.innerText=weatherInfo?.main?.temp;
    windspeed.innerText=weatherInfo?.wind?.speed;
    humidity.innerText=weatherInfo?.main?.humidity;
    cloudiness.innerText=weatherInfo?.clouds?.all;

}   

const grantAccessButton=document.querySelector('[data-grantAccess]');

grantAccessButton.addEventListener("click",getLocation);

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert('Location not supported');
    }
}

function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem('user-coordinates',JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

//searchTab

let searchInput=document.querySelector('[data-searchInput]');

searchForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        let cityName=searchInput.value;

        if(cityName===""){
            return;
        }else{
            fetchSearchWeatherInfo(cityName);
        }
});

async function fetchSearchWeatherInfo(cityName){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove('active');


    try{
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data= await res.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');   
        renderWeatherInfo(data);

    }

    catch(err){
      console.log('error found'+ err);
        
    }
}