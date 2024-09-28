const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {generateWebToken, authenticateCookieToken} = require("./utils/jwt_methods")
const cors = require('cors');

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(cors());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    //   origin: 'http://localhost:3000', // Replace with your frontend deployed URL
      credentials: true, // Allow credentials (cookies) to be sent with requests
    })
  );

let dummyData = [
    {
        username:"admin",
        password: "admin",
        type:"type_1"
    },
    {
        username:"user",
        password: "user",
        type:"type_2"
    }

]


app.post("/auth", (req, res)=>{
    const { username, password } = req.body;
    let data = dummyData.filter((user)=> user['username']===username)[0]


    if(!data){
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    else{
        if(password===data['password']){
            data = {type: data['type']}
            const token = generateWebToken({data})
            // res.cookie('authcookie',token,{maxAge:900000,httpOnly:true})
            // console.log(token)
            // return res.status(200).send('Logged in successfully');
            // Set token as a cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // Set to true if using HTTPS
                sameSite: 'None', // Use 'None' for cross-domain cookies
                maxAge: 3600000 // Cookie expiration time in milliseconds
               });
            return res.status(200).json({ message: 'Login successful' });
        }else{
            return res.status(401).json({ error: 'Incorrect password' });
        }
    }
})

app.get("/profile", authenticateCookieToken, (req, res)=>{
    if (req.hostname === '127.0.0.1' || req.hostname === 'localhost') {
        console.log(req.user)
        res.json(req.user)
    } else {
        res.status(403).send('Forbidden');
    }
})

app.listen('8080', ()=>{
    console.log("Listening on port 8080")
})