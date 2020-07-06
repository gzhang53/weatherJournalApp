/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const apikey = `0eb4a2a9ac8263b78e7a0dd6406b7f27`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;



document.getElementById('generate').addEventListener('click',performAction);


function performAction(e){
  const zip = document.getElementById('zip').value;

  console.log(zip);

  const userresponse = document.getElementById('feelings').value;

  getWeatherData(apiURL,zip,apikey)
  .then(function(projectData){
    console.log(projectData);

    postData('/currentWeather', {temperature:data.main.temp, date:newDate, userresponse:userresponse});
  }
  )
  .then(
      updateUI()
  )
}



const getWeatherData = async (apiURL,zip,apikey) => {

  const completeURL = apiURL + `${zip},` + `us&appid=${apikey}`;

  console.log('2');
  // const res = await fetch (completeURL);


  try{

    const res = await fetch (completeURL);
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
     body: JSON.stringfy(data),
   });


  try{
    const newData =await response.json();
    return newData;

  }catch(error){
    console.log('error',error);
  }
}

const updateUI = async () =>{
  try {
    const allData = await fetch('/weatherData');

    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].userresponse;


  }catch(error){
    console.log('error',error);
  }
}
