import  express  from "express";
import { isString, User } from "./types";
import crypto from 'crypto';
import * as twofactor from 'node-2fa';
import cors from 'cors';
import path from "path";
const app = express();
const port = 3001;

const users:User[]=[];
const secret = 'elay'
app.use(cors())
app.use(express.json());
app.use(express.static('front'))
app.post('/login', (req,res,next)=>{
    const {userName, password} =req.body;
    if(!userName || !isString(userName) ||!password || !isString(password)){
        return res.status(400).send('invalid params entered');
    }
    const existingUser = users.find(user=> user.userName === userName)
    if(!existingUser){
        return res.status(400).send('invalid user');
    }
    const ePassword = crypto.createHmac('sha256', secret).update(password).digest('hex');
    if(ePassword !== existingUser.password){
        return res.status(400).send('invalid password');
    }
    const newSecret = twofactor.generateSecret({name: 'myApp' , account:existingUser.userName})
    users[users.indexOf(existingUser)].secret = newSecret.secret;
    return res.send(newSecret.qr);
})
app.post('/verify', (req,res,next)=>{
    const {userName, token} = req.body;
    if(!isString(userName) || !isString(token)){
        return res.status(400).send('invalid arguments')
    }
    const userToVerify = users.find(user=> user.userName === userName);
    if(!userToVerify || !userToVerify.secret){
        return res.status(400).send('invalid User')
    }
    if(twofactor.verifyToken(userToVerify.secret, token) === {delta:0}){
        return res.sendFile(path.join(__dirname,'/front/home.html'))
    }
    else{
        return res.status(400).send('try again')
    }
})
app.post('/signUp', (req,res,next)=>{
    console.log(req.body);
    const {userName, password} =req.body;
    if(!userName || !isString(userName) ||!password || !isString(password)){
        res.status(400).send('invalid params entered');
    }
    const ePassword = crypto.createHmac('sha256', secret).update(password).digest('hex');
    users.push({userName, password:ePassword});
    res.sendFile(path.join(__dirname,'/front/signIn.html'));
})



app.get('/', (_req,res)=>{
    res.sendFile(path.join(__dirname, '/front/signUp.html'))
})
app.listen(port , ()=>{console.log(`running ${port}`);
})