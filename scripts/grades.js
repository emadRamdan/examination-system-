import {   getCookies , hasCookie , deleteCookie  , creatCookies , allCookieList} from "./cookis.js";

const container = document.querySelector('.container');
const sorry = document.querySelector('.sorry');

const resultBtn = document.querySelector('.btn') ;
 

let logoutBtn = document.querySelector('#logout') ;


let questions = [];
/////////////auth user  //////////////////////
window.addEventListener('load', function(){
    // e.preventDefault() ;
    // history.pushState(null , document.title , document.URL);

    // window.addEventListener('popstate' , function(e){
    //     // this.history.pushState({page: 1} , "student" , "#");
    //     history.pushState(null , document.title , document.URL);
    // })

    
    hasCookie('testId') ? deleteCookie('testId') : deleteCookie('settingObj'); 
    

    if(hasCookie('useremail')){
        console.log(getCookies('username'));
        let uName =  getCookies('username') ;
        let userName = document.querySelector('.userName');
        let userName2 = document.querySelector('.userName2');

         userName.innerHTML += `${uName}`
         userName2.innerHTML += ` ${uName} `
    }else{
        alert('you are not a member') ;
        this.location.href = 'login.html'

    }

    if(hasCookie('grade') && hasCookie('questions')){
        let grade = getCookies('grade') ;
        let gradeTab = document.querySelector('.gr');
        gradeTab.innerHTML += `${grade}`;

        let questionsData = getCookies('questions') ;
        questions =  JSON.parse(questionsData)  
        // console.log(questions);

         let TotalQ = questions.length ;
        let totalTab = this.document.querySelector('.totalQ');

        totalTab.innerHTML += `${TotalQ}`
    }else{
        container.classList.add('hidden');
        sorry.classList.remove('hidden');

    }

   

})



resultBtn.addEventListener('click' ,ShowResult , {once: true} )

function ShowResult(){
    // e.preventDefault() ;
    // resultBtn.setAttribute('disapled' , true)
    const result = document.querySelector('.results');

    result.style.overflowY = 'scroll'


    questions.forEach(ele =>{
        // console.log(ele['title']);
        let questionDiv = document.createElement('div') ;
        questionDiv.classList.add('question') ;    
        questionDiv.innerHTML += `<h3 class="title">${ele['title']}</h1>`

     
        let answersDiv = document.createElement('div') ;
        answersDiv.classList.add('answers') ;

        let answers = ele['answers'];
        // console.log(answer);
        answers.forEach(ans=>{
            let answer = document.createElement('p') ;
            answer.classList.add('answer') ;
            if(ele['checkedOne'] === ans['name']) {
                answer.classList.add('checkedOne') ;
              }
            if(ans['name'] === ele['correct']) {
              answer.classList.add('trueOne') ;
              answer.style.backgroundColor = '#427c7c94' ;

            }


            if( answer.classList.contains('checkedOne') && answer.classList.contains('trueOne')){
                answer.style.backgroundColor = '#0fbd49a4' ;
            }else if(answer.classList.contains('checkedOne') && !answer.classList.contains('trueOne')){
              answer.style.backgroundColor = '#bd290fa4' ;

            }

           
            answer.innerHTML += `${ans['value']}`
            answersDiv.append(answer)
        })
        questionDiv.append(answersDiv)  ;
        result.append(questionDiv) ;

        console.log(ele['correct']);

    })


    // resultBtn.removeEventListener('click' , ShowResult);
}

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