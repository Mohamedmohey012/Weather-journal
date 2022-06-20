/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//URL of weather website
const weathUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

//My API key 
const myApi= ",&appid=817bb857ddd26e4cc3a9630427f797b7&units=imperial";

/* Function to GET Web API Data*/

const getWeather = async (weathUrl,zipCode, myApi)=>{
  const response = await fetch(weathUrl+zipCode+ myApi);
  try{
      const clientData= await response.json();
      return clientData;
  }catch (error){
      console.log("ERROR",error);
  }

}

/* Function to POST data */
const postData = async(url='',data={})=>{
  const req= await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      
      })
})
try {
  const newData = await req.json();
  return newData;
}
catch (error) {
  console.log(error);
}
};



/* Function to GET Project Data */

const updateUI = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
  document.getElementById('content').innerHTML = allData.content;
  document.getElementById('date').innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

//Event listener for the  button
document.getElementById('generate').addEventListener('click',clickAction);

//clickAction function of the button
function clickAction(e){
    e.preventDefault();
//Get the client data    
    const zipCode =document.getElementById('zip').value;
    const content= document.getElementById('feelings').value;

    getWeather(weathUrl,zipCode, myApi)
    .then(function(clientData) {
        postData('/add', {date: newDate, temp:clientData.main.temp, content})
    })
 // To update the browser content ..call updateUI()..       
    .then(function(newData) {
        updateUI()
    }  )  
        
    

}




// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */



