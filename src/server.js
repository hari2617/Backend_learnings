import express from "express"
import router from "./routes/router.js";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";

const app=express();

app.use(express.json())  //since we are sending in json we have to use this middleware

app.use(cookieParser("ayyappa")) //it gives the value in cookie in json format , ayyappa is a word used to parse ,it can be anything
app.use(router)

const PORT=3000;

app.get('/',(req,res)=>{
    //Basically the login details (email,user type) are sent in cookies in real App
    res.cookie("user","Admin",{maxAge: 6000*10,signed:true})  //maxAge - Lifetime of cookie mentioned in ms , signed - it actually encodes the orginal value to unreadable value
    res.send("Hello !")
})


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});




















