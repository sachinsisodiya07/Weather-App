import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({ updateInfo }){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "key_number";

    let getWeatherInfo = async () => {
        try{
            let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonRes = await res.json();
            console.log(jsonRes);
            let result = {
                city: city,
                temp: jsonRes.main.temp,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity: jsonRes.main.humidity,
                feelslike: jsonRes.main.feels_like,
                weather: jsonRes.weather[0].description,
            };
            console.log(result);
            return result;
        } catch (error){
            throw error;
        }
    };

    let handleChange = (event) =>{
        setCity(event.target.value);
    };

    let handleSubmit = async (event) =>{
        try{
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch(error){
            setError(true);
        }
    };

    return(
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="Enter City" variant="outlined" required value={city} onChange={handleChange}/>
                <br></br><br></br>
                <Button variant="outlined" type='submit'>Search</Button>
                {error && <p style={{color: "red"}}>Search place not found in API Database</p>}
            </form>
        </div>
    );
}
