 
import {   getCookies , hasCookie , deleteCookie  , creatCookies , allCookieList} from "./cookis.js";

// window.addEventListener('popstate', function(e) {
//     if (confirm("GO?")) {
//         window.history.back();
//     }
// });



let logoutBtn = document.querySelector('#logout') ;

let errorMsg = document.querySelector('.confirm-error') ;

let testPage = document.querySelector('.testSetting') ;
let settingPage = document.querySelector('.PSetting') ;

let TestId = document.querySelector('#TestID') ;
let GoBtn = document.querySelector('#submitTestID')

console.log(logoutBtn);
// let form = document.querySelector('.testSetting form');

let testBtn = document.querySelector('.testBtn');
let pracBtn = document.querySelector('.pracBtn');

let timeBox ;
let numberBox  ;
let categoryBox ;

let submitSet = document.querySelector('.submitSet');

let StudentView = document.querySelector('.student');
let instView = document.querySelector('.inst');


//////////get user setting values ////
// let totalTime = 10;   ///user time 
// timeBox.addEventListener('change' , function(){
//     totalTime = timeBox.value ;
// })

// let numberOfQ = 10 ;
// numberBox.addEventListener('change' , function(){
//     numberOfQ = numberBox.value ;
//     checkNumberOfQ(numberOfQ)
// })

// let catageory = 'math' ;
// categoryBox.addEventListener('change' , function(){
//     catageory = categoryBox.value ;
// })


let role ;

/////////////auth user  //////////////////////
window.addEventListener('load', function(e){
    e.preventDefault() ;

    if(hasCookie('useremail')){
        console.log(getCookies('username'));
        let uName =  getCookies('username') ;
        let userName = document.querySelector('.userName');
         userName.innerHTML += `${uName}`
    }else{
        alert('you are not a member') ;
        this.location.href = 'login.html'

    }

    if(hasCookie('userRole')){
        console.log(getCookies('userRole'));
        role = getCookies('userRole') ;
    }

    setView(role);
})

///////////logout btn ////////////////////
logoutBtn.addEventListener('click' , function(e){
    // e.preventDefault() ;

    // deleteCookie('username');
    // deleteCookie('useremail');
    // deleteCookie('userRole');
    // console.log("work");

    let allCookies  =  allCookieList()
    allCookies.forEach(cookie=>{
        // console.log(cookie[0]);
        deleteCookie(cookie[0])
    })
    // location.href = 'login.html'

})

///// select the view //////

function setView(role){
    // console.log(role);
    if(role == "student"){
        StudentView.classList.toggle('hidden') ;
    }else{
        instView.classList.toggle('hidden') ;
    }
}

///////////////// get user setting and display the  strat the test 

submitSet.addEventListener('click' ,function(){
    
 timeBox = document.querySelector('#timeIn');
 numberBox = document.querySelector('#numberOfQ');
 categoryBox = document.querySelector('.category');

//  console.log(timeBox.value , numberBox.value ,categoryBox.value);

if(timeBox.value && checkNumberOfQ(numberBox.value) && categoryBox.value ){
    let settingObj = {
        time: timeBox.value ,
        numberOfQ : numberBox.value,
        category: categoryBox.value
     }
     console.log(settingObj);
    
     if(hasCookie('testId')) {
        deleteCookie('testId');
     }
     creatCookies("settingObj" , JSON.stringify(settingObj));
     location.href = 'test.html' ;

}else{
    // alert("enter valid data")
    errorMsg.classList.remove('hidden')
}
})

function checkNumberOfQ(value){
    if(value > 0 && value <= 20 ) {
        return true ;
    }
    else{
        return false ;
    }
}

// ///////////////// practice and test button //////////
testBtn.addEventListener('click' , function(e){
    e.preventDefault() ;

    // timeBox.value = "10";
    // numberBox.value = "10";
    // timeBox.setAttribute('disabled' , true);
    // numberBox.setAttribute('disabled' , true);

    testPage.classList.toggle('hidden');
    if(!settingPage.classList.contains('hidden')){
        settingPage.classList.toggle('hidden');
    }

})
GoBtn.addEventListener('click' , function(){
    // console.log(TestId.value);
    // console.log("sdsd");
    let tests = JSON.parse(localStorage.getItem('Tests')) ;
    if(!tests){
        alert("test can't be founed") ;
        return ;
    }
   let temTestINdex = findTheCorrectTest(tests ,TestId.value) ;
        if(temTestINdex != -1){
            console.log("here it is" , tests[temTestINdex]);
            if(hasCookie('settingObj')) {
                deleteCookie('settingObj');
             }
            creatCookies('testId' , JSON.stringify(tests[temTestINdex]) );
            location.href = 'test.html' ;
        }else{
            let errormsg = document.querySelector('.confirm-id');
            errormsg.classList.remove('hidden')
            // alert("the id is rong");

        }
   

})


pracBtn.addEventListener('click' , function(e){
    e.preventDefault() ;
    // timeBox.value = "";
    // numberBox.value = "";
    // timeBox.removeAttribute('disabled');
    // numberBox.removeAttribute('disabled');
    settingPage.classList.toggle('hidden');
    if(!testPage.classList.contains('hidden')){
        testPage.classList.toggle('hidden');
    }

})

/////////// go to SetTest page ///////

// SetTest.addEventListener('click' , function(){
//     location.href = 
// })



function findTheCorrectTest(arr , val){
    let index = -1 ;
    arr.forEach((ele , i)=>{
        if(ele['id'] == val){
            index = i ;
        }    
    })
    return index ;
}



