let express = require('express');

let app = express();

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("weather.ejs");
});

app.listen(3000, ()=>{
    console.log("Server Listening on Port 3000....");
});