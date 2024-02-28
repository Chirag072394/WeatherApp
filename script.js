console.log("hello jEE");

const API_KEY='c2f5ad623070e27fef773cd2af0cfb58';
let data;

function renderWeatherInfo(data){
    let newPara=document.createElement('p');
    
    newPara.textContent=`${data?.main?.temp.toFixed(2) }°C`;
    document.body.appendChild(newPara);
}

async function fetchWeatherDetails(){
    try{
    let city="haldwani";
   
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
    let data=await response.json();
    console.log("weather data:-> " , data);
    renderWeatherInfo(data);
    }
    catch(err){
        console.log("error found" ,err)
    }
    

}

async function getCustomWeatherDetails(){
 
    try{
        let latitude=10.63333232323232;
        let longitude=18.3333;

        let result=await fetch(`https://api.openweathermap.org/data/2.5/weather?
        &lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

        let data=await result.json();

        console.log("weather data:" ,data);
        renderWeatherInfo(data);
    }catch(e){
        console.log("found error" , e);
    }
   
}

