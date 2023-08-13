const express=require('express');
const webpush=require('web-push');
const bodyParser=require('body-parser');
const path=require('path');


const app=express();
app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

const publicVapidKey='BObb7olHM43HUqk4NYC0HLXp-0BMUvub4WoAhDS33_w2RhA_Yenaydyzi9s_Qjug1CjaAEJ7jeBHV0rMQ8KjHr8';
const privateVapidKey='GG06piMwu2sd0EseXaGDxUN4AZAllQ42RVOWRyWSotE';

//vapid keys identify who is sending push notofication


webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);


//Subscribe route
app.post('/subscribe',(req,res)=>{
    //Get push Subscription object
    const subscription=req.body;

    //Send 201- resource created 
    res.status(201).json({});

    const payload=JSON.stringify({totle: 'Push Test'});
    webpush.sendNotification(subscription,payload).catch(err => console.log(err));




});


const port=5000;
app.listen(port,()=> console.log('Server start on part ${port}'));



