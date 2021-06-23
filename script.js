let mus1=document.querySelector("#completeMusic");

function music1(){
  mus1.play();
}

let mus2=document.querySelector('#createMusic');

function music2(){
  mus2.play();
}

let mus3=document.querySelector('#errorMusic');

function music3(){
  mus3.play();
}


callFunc();

//////////////////// Display Input ////////////////////

let ulSelect=document.getElementById("myUL");

function callFunc(){
  let localLen= window.localStorage.length;
  if(localLen===0){
    document.getElementById("myUL").innerHTML='<div class="notask">No tasks in Due!</div>';
  }
  else{
    document.getElementById("myUL").innerHTML="";
    for(let i=0;i<localStorage.length;i++){
      let arr=JSON.parse(window.localStorage.getItem(localStorage.key(i)));
      let list = document.createElement("li");
      list.className = "list";
      ////////
      let vari = (localStorage.key(i))[4];
      let sp1=document.createElement("span");
      sp1.className="hiding";
      let t1=document.createTextNode("task"+vari);
      sp1.appendChild(t1);
      list.appendChild(sp1);
      ////////
      let divi=document.createElement("div");
      divi.className="divi";
      let txt=document.createTextNode(`${arr[0]}`);
      divi.appendChild(txt);
      list.appendChild(divi);
      let b=document.createElement("br");
      list.appendChild(b);
      let sp=document.createElement("span");
      sp.className="due";
      let t=document.createTextNode(`Due: ${arr[2]} on ${arr[1]}`);
      sp.appendChild(t);
      list.appendChild(sp);
      b=document.createElement("br");
      list.appendChild(b);
      let but=document.createElement("button");
      but.className="completed";
      let tb1=document.createTextNode(`Completed`);
      but.appendChild(tb1);
      list.appendChild(but);
      let but1=document.createElement("button");
      but1.className="delete";
      let tb2=document.createTextNode(`Delete`);
      but1.appendChild(tb2);
      list.appendChild(but1);
      document.getElementById("myUL").appendChild(list);
      deleteFunc();
      completeFunc(); 
    }    
}
  return;
}



//////////////////// Display Input ////////////////////

////////////////////// Clock ////////////////////

var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];

for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
  var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      d = new Date(),
      h = d.getHours(),
      m = d.getMinutes(),
      s = d.getSeconds(),
      date = d.getDate(),
      month = d.getMonth() + 1,
      year = d.getFullYear(),
           
      hDeg = h * 30 + m * (360/720),
      mDeg = m * 6 + s * (360/3600),
      sDeg = s * 6,
      
      hEl = document.querySelector('.hour-hand'),
      mEl = document.querySelector('.minute-hand'),
      sEl = document.querySelector('.second-hand'),
      dateEl = document.querySelector('.date'),
      dayEl = document.querySelector('.day');
  
      var day = weekday[d.getDay()];
  
  if(month < 9) {
    month = "0" + month;
  }
  
  hEl.style.transform = "rotate("+hDeg+"deg)";
  mEl.style.transform = "rotate("+mDeg+"deg)";
  sEl.style.transform = "rotate("+sDeg+"deg)";
  dateEl.innerHTML = date+"/"+month+"/"+year;
  dayEl.innerHTML = day;
}

setInterval("clock()", 100);

////////////////////// Clock ////////////////////

//////////////////// setting up the form /////////////////////

let today= new Date();

let todayTime = today.getHours() + ":" + today.getMinutes();

console.log(todayTime);

function changeDate(oldDate)
{
   return oldDate.toString().split("-").reverse().join("-");
}

let taskForm=document.querySelector('#form');

taskForm.addEventListener('submit',function(e){
  e.preventDefault();
  music1();
  let taskInput=taskForm.elements.task;
  let dateInput=taskForm.elements.date;
  let timeInput=taskForm.elements.time;
  addLocal(taskInput.value,dateInput.value,timeInput.value);
  taskInput.value='';
  dateInput.value='';
  timeInput.value='';
});

function comparing(t1,t2)
{
  let [hour1, minute1] = t1.split(":");
  let [hour2, minute2] = t2.split(":");
  hour1=parseInt(hour1);
  hour2=parseInt(hour2);
  minute1=parseInt(minute1);
  minute2=parseInt(minute2);
  if(hour2<hour1){
    return 1;
  }
  else if((hour1===hour2)&&(minute1>minute2))
    return 1;
  else{
    return 0;
  }

}
function time12to24(tt){
    var [hours,minutes] = tt.split(":");
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function addLocal(task,date,time){
  let d1=new Date();
  if((dates.compare(date,d1.toJSON().substring(0,10)))===0)
  {
      
      if(comparing(todayTime,time))
      {
        music3();
          alert("Enter Only Future Time!");
          
      }
      else{
        time=time12to24(time);
        date= changeDate(date);
      let arr=[task,date,time];
      let len=window.localStorage.length;     
      if(len===0)
      {
        window.localStorage.setItem("task1",JSON.stringify(arr));
        callFunc();
      }
      else{
        let o=len+1;
        window.localStorage.setItem("task"+o,JSON.stringify(arr));
        callFunc();
      }
      }        
      }
  else if((dates.compare(date,d1.toJSON().substring(0,10)))===-1)
  {
    music3();
    alert("Enter Only Future Date!");
  }
  else{
      time=time12to24(time);
      date= changeDate(date);
      let arr=[task,date,time];
      let len=window.localStorage.length;     
      if(len===0)
      {
        window.localStorage.setItem("task1",JSON.stringify(arr));
        callFunc();
      }
      else{
        let o=len+1;
        window.localStorage.setItem("task"+o,JSON.stringify(arr));
        callFunc();
      }
  }
 return;
}

var dates = {
  convert:function(d) {
      return (
          d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0],d[1],d[2]) :
          d.constructor === Number ? new Date(d) :
          d.constructor === String ? new Date(d) :
          typeof d === "object" ? new Date(d.year,d.month,d.date) :
          NaN
      );
  },
  compare:function(a,b) {
      return (
          isFinite(a=this.convert(a).valueOf()) &&
          isFinite(b=this.convert(b).valueOf()) ?
          (a>b)-(a<b) :
          NaN
      );
  },
}
//////////////////// setting up the form /////////////////////
deleteFunc();

function deleteFunc(){

  let del=document.querySelectorAll(".delete");
  let lisSelect=document.querySelectorAll(".list");
  let fir , st;
for (let i = 0; i < del.length; i++) {
  del[i].onclick = function(){
    lisSelect[i].style.display = "none";
    fir =(lisSelect[i].textContent)[4];
    st="task"+fir;
    localStorage.removeItem("task"+fir);  
    callFunc();
    return;
}}}

completeFunc(); 

function completeFunc(){

  let del1=document.querySelectorAll(".completed");
  let lisSelect1=document.querySelectorAll(".list");
  let fir1 , st1;
for (let i = 0; i < del1.length; i++) {
  del1[i].onclick = function(){
    lisSelect1[i].style.display = "none";
    fir1 =(lisSelect1[i].textContent)[4];
    st1="task"+fir1;
    localStorage.removeItem("task"+fir1);  
    callFunc();
    return;
}}}

///////////////////// calender logic//////////////////

var calender = document.querySelector(".calender"),
    topDiv = document.querySelector('.month'),
    monthDiv = calender.querySelector("h1"),
    yearDiv = calender.querySelector('h2'),
    weekDiv = calender.querySelector(".weeks"),
    dayNames = weekDiv.querySelectorAll("li"),
    dayItems = calender.querySelector(".days"),
    prev = calender.querySelector(".prev"),
    next = calender.querySelector(".next"),


    years = new Date().getFullYear(),
    monthes = new Date(new Date().setFullYear(years)).getMonth(),
    lastDayOfMonth = new Date(new Date(new Date().setMonth(monthes + 1)).setDate(0)).getDate(),
    dayOfFirstDateOfMonth = new Date(new Date(new Date().setMonth(monthes)).setDate(1)).getDay(),


    monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"],
    colors = [ '#ABABAB', '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB',  '#ABABAB', '#ABABAB'],i,x,counter;
function days(x) {
  'use strict';
  dayItems.innerHTML = "";
  monthes = monthes + x;

  if (monthes > 11) {
    years = years + 1;
    monthes = new Date(new Date(new Date().setFullYear(years)).setMonth(0)).getMonth();// 
  }
  if (monthes < 0) {
    years = years - 1;
    monthes = new Date(new Date(new Date().setFullYear(years)).setMonth(11)).getMonth();// 
  }
  //  next,prev
  lastDayOfMonth = new Date(new Date(new Date(new Date().setFullYear(years)).setMonth(monthes + 1)).setDate(0)).getDate();
  dayOfFirstDateOfMonth = new Date(new Date(new Date(new Date().setFullYear(years)).setMonth(monthes)).setDate(1)).getDay();


  yearDiv.innerHTML = years;
  monthDiv.innerHTML = monthNames[monthes];
  for (i = 0; i <= dayOfFirstDateOfMonth; i = i + 1) {
    if (dayOfFirstDateOfMonth === 6) { break; }
    dayItems.innerHTML += "<li> - </li>";
  }
  for (counter = 1; counter <= lastDayOfMonth; counter = counter + 1) {
    dayItems.innerHTML += "<li>" + (counter) + "</li>";
  }
  topDiv.style.background = colors[monthes];
  dayItems.style.background = colors[monthes];
   
  if (monthes === new Date().getMonth() && years === new Date().getFullYear()) { 
    dayItems.children[new Date().getDate() + dayOfFirstDateOfMonth].style.background = "#2ecc71";
  }
}
prev.onclick = function () {
  'use strict';
  days(-1);
};
next.onclick = function () {
  'use strict';
  days(1);
};
days(0);

document.querySelector(".container").style.display="none";

function digitalDisplay(){
  music2();
  document.querySelector(".container").style.display="block";
  document.querySelector(".clock").style.display="none";
}
function analogDisplay(){
  music2();
  document.querySelector(".container").style.display="none";
  document.querySelector(".clock").style.display="block";
}

document.querySelector("#digital").addEventListener('click',digitalDisplay);

document.querySelector("#analog").addEventListener('click',analogDisplay);



///////////////////// calender logic//////////////////


// let analogSelect=document.getElementById("analog");




const container = document.querySelector('.container');
const h1 = document.querySelector('.container h1');

// The clock function.
const clockk = () =>{
//   Accessing the date object.
    const datee = new Date();
    let hourss = datee.getHours();
    let minutess = datee.getMinutes();
    let secondess = datee.getSeconds();

//   Adding a zero to the left of the time if it's less or equal than 9.
    if(+hourss <= 9){
        hourss = '0'+ hourss;
    }
   if(+minutess <= 9){
        minutess = '0'+ minutess;
    }
   if(+secondess <= 9){
        secondess = '0'+ secondess;
    }
// adding the time to the h1 element.
    h1.innerHTML = hourss + ':' + minutess + ':' + secondess;
  
//   Toggling the animate class.
    container.classList.toggle('animate');
}

// calling the clock function after each second(1000ms).
setInterval(clockk, 1000);



