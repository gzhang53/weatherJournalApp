/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const apikey = `0eb4a2a9ac8263b78e7a0dd6406b7f27`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;



document.getElementById('generate').addEventListener('click',performAction);


function performAction(e){

  event.preventDefault();

  // get zip code entered by the user
  const zip = document.getElementById('zip').value;

  //get feelings entered by the user
  const userresponse = document.getElementById('feelings').value;

  //retrieve data from the API
  getWeatherData(apiURL,zip,apikey)
  .then(function(data){

    postData('/addWeather', {temp:data.main.temp, date:newDate, userresponse:userresponse});
  }
  )
  .then(function(){
      updateUI()});
}



const getWeatherData = async (apiURL,zip,apikey) => {

  //construct a compelete url to fetch weather data from api
  const completeURL = apiURL + `${zip},` + `us&appid=${apikey}`;

  const res = await fetch (completeURL);
  try{
    const data = await res.json();
    console.log(data)

    return data;

  }
  catch(error){
    console.log('error',error);
  }
}

const postData = async (url = '',data={})=>{
   const response = await fetch(url, {
     method: 'POST',
     credentials:'same-origin',
     headers:{
        'Content-Type':'application/json',
     },
     body: JSON.stringify(data),
   });


  try{
    const newData =await response.json();
    console.log(newData);
    return newData;

  }catch(error){
    console.log('error',error);
  }
}


// update UI using the most recent posted data
const updateUI = async () =>{
  try {
    const req = await fetch('/weatherData');

    const allData = await req.json();

    console.log(allData);

    document.getElementById('temp').innerHTML = allData[allData.length-1].temp;
    document.getElementById('date').innerHTML = allData[allData.length-1].date;
    document.getElementById('content').innerHTML = allData[allData.length-1].userresponse;


  }catch(error){
    console.log('error',error);
  }
}
