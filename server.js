const express = require("express")
const app = express()
const axios = require("axios")
const port = process.env.PORT || 3000;


app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index",{weather:null,error:null}) //passing dynamic val to view(index)
})

app.get("/weather",async(req,res)=>{
    const city= req.query.city;
    const APIkey ="486cd9f676499a86e0ca1ea5b737a088"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`

    let weather; 
    let error=null;
    try{
        const response = await axios.get(url)
        weather=response.data;
    }catch(error){
        weather=null
        error = "error,please enter valid input"
    }
    res.render("index",{weather,error})
})

app.listen(port,()=>{
    console.log((`server started running on ${port}`))
})