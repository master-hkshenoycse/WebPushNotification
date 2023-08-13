const publicVapidKey='BObb7olHM43HUqk4NYC0HLXp-0BMUvub4WoAhDS33_w2RhA_Yenaydyzi9s_Qjug1CjaAEJ7jeBHV0rMQ8KjHr8';


//check for service worker

if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}


//Register SW,Register push(using browsers push api),send push
async function send(){
    //Register Service worker
    console.log('REgistering service worker');
    const register=await navigator.serviceWorker.reigster('/worker.js',{
        scope: '/'
    });
    console.log('Service Worker Registered');

    //Register push
    console.log('Registering Push..');
    const subscription=await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });
    console.log("Push Registerd");
    
    //Send push notification
    console.log('Sending Push ...');
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('Push Sent...');





}