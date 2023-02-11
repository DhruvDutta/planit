// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcDu3nnVVsT2ZTJnRrIb1yaMpvFDpmbv8",
    authDomain: "dhruvdutta.firebaseapp.com",
    databaseURL: "https://dhruvdutta.firebaseio.com",
    projectId: "dhruvdutta",
    storageBucket: "dhruvdutta.appspot.com",
    messagingSenderId: "595997645601",
    appId: "1:595997645601:web:8bc97f64973ee2a7197c60"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function validate(){
    let name=document.getElementById('name').value;
    let start=document.getElementById('start').value;
    let end=document.getElementById('end').value;
    x=start.split(":")
    y=end.split(":")
    x=parseInt(x[0])*60+parseInt(x[1])
    y=parseInt(y[0])*60+parseInt(y[1])
    if(x<y){
        write(name,start,end)
    }
    else{
        alert("Please Enter a Valid Time Interval")
    }
    console.log(name,start,end)
    
}

function write(name,start,end){
    firebase.database().ref('users/' + name).set({
        start_time: start,
        end_time: end,
      });
    console.log("Data Write")
    document.getElementById('main').innerHTML='';
}
read()
function read(){
    firebase.database().ref('users/').on('value',(data)=>{
        let i=1;
        data.forEach((element) => {
            let name = element.key
            let start=element.val().start_time
            let end=element.val().end_time
            st=start.split(":")
            ed=end.split(":")
            st=parseInt(st[0])*60+parseInt(st[1])
            ed=parseInt(ed[0])*60+parseInt(ed[1])
            
            let box=document.createElement('div');
            box.setAttribute('class','box');
            box.setAttribute('style',`--i:${i++}`);

            percentage =(ed-st)/10.8
            percentage=Math.min(100,percentage)
            offset=((st-300)/10.8)+2.8
            offset=Math.max(0,offset)
            box.style.width=`${percentage}%`
            box.style.left = `${offset}%`
            console.log(name,st,ed,percentage)
            box.innerHTML = `<div>${name}</div>`
            document.getElementById('bar').appendChild(box);
        });
    })
}