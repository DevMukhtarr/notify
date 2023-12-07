import "dotenv/config"
import app from "./app.js";
const port = process.env.PORT


app.set('view engine', 'ejs'); 

app.get("/", (req, res) =>{
    res.render('index')
})

app.listen(port, () =>{
    console.log(`app is running at ${port}`)
})
