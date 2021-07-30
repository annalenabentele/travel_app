
const generate = async() => {
    const place = document.getElementById('place').value
    const geonamesUrl = `http://api.geonames.org/searchJSON?name=${place}&maxRows=10&username=${process.env.GEONAMES_USERNAME}`

    fetch(geonamesUrl)
        .then(res => {
            return res.json()
        })
        .then(async json =>  {
            generateDestinationPix(place, json.geonames[0].countryName)
            return await generateWeather(json)
        })
        .then(data => {            
            return postData('http://localhost:3000/add', {
                latitude: data.geonames[0].lat,
                longitude: data.geonames[0].lng,
                country: data.geonames[0].countryName,
                countdown: getCountdown(),
                temperature: data.temperature,
                weather: data.weather
            })
            
        })
        .then(() => { updateUI('http://localhost:3000/all') }
        )
        .catch(error => console.log(error));
}

const generateWeather = async (json) => {
    await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${json.geonames[0].lat}&lon=${json.geonames[0].lng}&key=${process.env.WEATHERBIT_API_KEY}`)
                .then(res => res.json())
                .then(async data => {
                    console.log(data)
                    if(getCountdown() <= 15){
                        const temp = data.data[getCountdown()].temp;
                        const weather_description = data.data[getCountdown()].weather.description
                        json.temperature = temp
                        json.weather = weather_description
                        await generateWeatherPix(weather_description)
                    }
                    else {
                        json.weather = "Weather forcast not available yet"
                    }
                })
            return json;
}

const generateWeatherPix = async (weather_description) => {
    fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${weather_description}`)
        .then(res => res.json())
        .then( data => {
            if(data.total > 0){
                document.getElementById('weather_img').src = data.hits[0].webformatURL
                //document.getElementById('destination_img').src = image
            }
        })
}

//Pull in an image for the country from Pixabay API when the entered location brings up no results 
const generateDestinationPix = async (destination, country) => {
    fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${destination}`)
        .then(res => res.json())
        .then( data => {
            if(data.total > 0){
                document.getElementById('destination_img').src = data.hits[0].webformatURL
            }
            else {
                fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${country}`)
                    .then(res => res.json())
                    .then( data => {
                        if(data.total > 0){
                            document.getElementById('destination_img').src = data.hits[0].webformatURL
                        }
                })
            }
        })
    }

const postData = async (path, data) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error){
        console.log(error);
    }
};

const getCountdown = () => {
    const enteredDate = document.getElementById('travelDate').value
    
    const travelDate = new Date(enteredDate).getTime();
    const today = new Date().getTime();
  
    const countdown = Math.round((travelDate - today) / (1000 * 3600 * 24));
  
    return countdown;
}

const updateUI = async (path) => {
    fetch(path)
        .then(res => {
            return res.json();
        })
        .then(data => {
            document.getElementById('destination').innerHTML = `Destination: ${document.getElementById('place').value}`;
            document.getElementById('date').innerHTML = `${data.countdown} days left`;
            const temp = data.temperature ? `, ${data.temperature} °C` : ''
            document.getElementById('temp').innerHTML = `Weather: ${data.weather}${temp}`;
        })
    
}

export {
    generate
}
