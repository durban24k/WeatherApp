let express = require('express');
let request = require('request');
let bodyParser = require('body-parser');

let app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    let city = 'New York';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=eb50d0ab0c62bab6425cfe7c8d233c62`;
    request(url, (error, response, body)=>{
        let weatherinfo = JSON.parse(body);
        let weather = {
            city:city,
            temperature: Math.round(weatherinfo.main.temp),
            description: weatherinfo.weather[0].description,
            icon: weatherinfo.weather[0].icon,
            country:weatherinfo.sys.country,
            tempmin:weatherinfo.main.temp_min,
            tempmax:weatherinfo.main.temp_max
        };
        let weatherdata = {weather:weather};
        res.render("weather.ejs",weatherdata);
    });
});

app.post("/city",(req,res)=>{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=eb50d0ab0c62bab6425cfe7c8d233c62`;
    request(url, (error, response, body)=>{
        let weatherinfo = JSON.parse(body);
        let weather = {
            city:city,
            temperature: Math.round(weatherinfo.main.temp),
            description: weatherinfo.weather[0].description,
            icon: weatherinfo.weather[0].icon,
            country:weatherinfo.sys.country,
            tempmin:weatherinfo.main.temp_min,
            tempmax:weatherinfo.main.temp_max
        };
        console.log(`${city} has been checked`);
        let weatherdata = {weather:weather};
        res.render("weather.ejs",weatherdata);
    });
});

app.listen(3000, ()=>{
    console.log("Server Listening on Port 3000....");
});