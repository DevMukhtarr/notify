import "dotenv/config"
import app from "./app.js";
const port = 4400 || process.env.PORT


app.set('view engine', 'ejs'); 

app.get("/", (req, res) =>{
    // res.render('index')
    res.send("Hi")
})

app.listen(port, () =>{
    console.log(`app is running at ${port}`)
})
