
import { creatCookies, deleteCookie, getCookies , hasCookie } from "./cookis.js";


// history.pushState(null , document.title , document.URL)
window.addEventListener('popstate', function(e) {
    if (confirm("are you sureyou want to go?")) {
        if(hasCookie('testId')){ deleteCookie('testId')}
        if(hasCookie('settingObj')){ deleteCookie('settingObj')}
        window.history.back();
    }else{
        console.log(
            "okkkkk"
        );
    }
});



let currentIndex=0;

/**Select for Element  */
let countSpan=document.querySelector(".quiz-info .count span");
let category=document.querySelector(".quiz-info .category span");
let bulltesSpanContainer=document.querySelector(".bulltes .spans");
let quizArea=document.querySelector(".quiz-area");
let answersArea=document.querySelector(".answers-area ")

let timerRange = document.querySelector('#progress') ;


let resultArea = document.querySelector('.results .prefect');

let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.previous');
let markBtn = document.querySelector('.mark');
let resultBtn = document.querySelector('.result');


//create the function that call my data from my json file
let questionsObject = [] ;
let questionsCount ;
let rightAnswer = 0 ;
let totalTime ; 
let remainCounter = 0 ;


/////////////////////




////////////get json data ////////////////////

if(hasCookie('testId')){
    let myObj = getCookies('testId') ;
    console.log(JSON.parse(myObj));
    let test = JSON.parse(myObj);
    console.log(test);
    questionsObject= test['Questions'];
    category.innerHTML = test['category']  ;
    console.log(questionsObject);
    shuffelData(questionsObject) ; 
    questionsCount=questionsObject.length;
    createBulltes(questionsCount);
    addQuestionsData(questionsObject[currentIndex]);
    checkStatus()
    scheckReamining()
    calcTime();
    startTimer();
    watchTime();
}else if(hasCookie('settingObj')){
    let settingData = getCookies('settingObj');
    let settings = JSON.parse(settingData) ;
    // console.log(settings['time'] , settings['numberOfQ'] , settings['category']);
    category.innerHTML = settings['category'] ;
    let questionsData = fetch("Htmlquestion.json");
    questionsData.then((resp)=>{
            return resp.json() ;
    })
    .then(data =>{
        console.log(data);
        data.forEach(d=>{
            console.log(d['category']);
            if(d['category'] === settings['category']){
                if(questionsObject.length < settings['numberOfQ']){
                 questionsObject.push(d);

                }
            }
        })

    
    //     // questionsObject=  data;
        console.log(questionsObject);
        shuffelData(questionsObject) ; 
        questionsCount=questionsObject.length;
        createBulltes(questionsCount);
        addQuestionsData(questionsObject[currentIndex]);   
        checkStatus()
        scheckReamining()
        calcTime();
        totalTime = settings['time'] ;
        startTimer();
        watchTime();
    
     })
    
}
else 
{

//  throw("somthing get wrong try again later ");

    let ErrorMsg = document.querySelector('.notFound');
    let container = document.querySelector('.testMode') ;

    container.classList.add('hidden');
    ErrorMsg.classList.remove('hidden');

}




////////////////  START THE TIMER BAR /////////

//////  CALC THE TOTAL TIME //////

function calcTime(){
    totalTime = questionsCount * 30;  //select the time for each question

    console.log(totalTime);
}

let currTime = 0 ;
function startTimer(){
    calcTime();
    let loop = setInterval(()=>{
        if(currTime < totalTime){
            currTime += 1 ;
            let prog = (currTime / totalTime)* 100 ;
            timerRange.style.width = prog+`%` ;
            // console.log( prog);

        }
        else{
            clearInterval(loop)
        }
    },1000)
}


///////////////// shuffel array of quesitons //////////////

function shuffelData(arr){
    for (let i = arr.length -1; i > 0 ; i--) {
        const randNum = Math.floor(Math.random() * (i + 1))   ;
        [arr[i] , arr[randNum]]  = [arr[randNum] , arr[i]]   
    }
}     




/**Creat function to create Bulltes depending on number of Question and add the number of it in countSpan */
/**And This Function Iwill used it in response function to known the number of question throw knowning the 
 * js object have meny element  */ 
function createBulltes(num){

    /**create Spans Bulltes that help the user to known he is which question */
    for(let i =0; i<num ;i++){
        //create span 
        let theBullte=document.createElement("span");
        theBullte.setAttribute('id' , `bullet_${i+1}`);
        theBullte.classList.add('bullet')
        theBullte.innerHTML=i+1;

        theBullte.addEventListener('click' , function(){
            // console.log(questionsObject[this.innerText]);
            answersArea.innerHTML = '' ;
            currentIndex = +this.innerHTML - 1 ;
            console.log(currentIndex);
                // addQuestionsData(questionsObject[(this.innerText) - 1]);
            addQuestionsData(questionsObject[(currentIndex) ]);
            // this.classList.add('on');
            togglBullet()
            checkStatus()


        })
        // if(i===currentIndex){
        //     // theBullte.className="on"; 
        //     togglBullet()
        //     //to make the span that contain the number of queation that user on it active 
        // }
        // Append BuLLtes to BuLLtes container
        bulltesSpanContainer.appendChild(theBullte);
        

    }

  
}
  
////////select one of the answers //////////

function controlChossies(){
    
let chooseies  = document.querySelectorAll('.answer input');
console.log(chooseies);
let  chosseOne = questionsObject[currentIndex]['checkedOne'] ;
console.log(chosseOne);
chooseies.forEach(ele =>{

    ele.addEventListener('click' , function(){
        // console.log(ele.getAttribute('id'));
        questionsObject[currentIndex]['checkedOne'] = ele.getAttribute('id');
        console.log(questionsObject[currentIndex]['checkedOne']);
         chosseOne = questionsObject[currentIndex]['checkedOne'] ;
         scheckReamining();

    });
    
    if(ele.getAttribute('id') === chosseOne) {
        // console.log(ele.getAttribute('id') );
        ele.checked = true ;
    }

})


}

/**Craeate Add Function  */
function addQuestionsData(obj){

    // category.innerHTML = obj['category'] ;
   /**Append the H2 to Quiz Area */
   quizArea.innerHTML = `<h2 class="ques">${obj.title}</h2>`;

   /**Create The Answers  */

   let answers  = obj.answers;
//    console.log(answers);
    for(let i=0;i< answers.length;i++){
       
        let dataSet = answers[i]['value'] ;
        // console.log(dataSet);
        // let temAnswer = obj[`answer_${i}`] ;
        answersArea.innerHTML += `<div class="answer"><input  type="radio" name="question" id="answer_${i+1}" data-answer="${dataSet}">
        <label for="answer_${i+1}">${dataSet}</label></div>`
    }   

    controlChossies();

    togglBullet() ;
    

}

/////////next and prev button /////////

nextBtn.addEventListener('click' ,function(e){

    // if(currentIndex + 1  === questionsCount - 1 ){
    //     nextBtn.style.border = "2px solid #2982be46";
    //     nextBtn.style.backgroundColor = "#2982be75";
    // }else{
    //     nextBtn.style.border = "2px solid #2983be";
    //     nextBtn.style.backgroundColor = "#2983be";
    // }

    if(currentIndex  === questionsCount - 1 ){
        // e.preventDefault()
        console.log(currentIndex);
        nextBtn.setAttribute('disabled' , true);
        return ;
    }
  
    console.log( currentIndex);
  
    // controlChossies()

  
   
    currentIndex++ ;
    answersArea.innerHTML = '' ;
    console.log( currentIndex);
    addQuestionsData(questionsObject[currentIndex]);
    togglBullet();
    checkStatus()
    // scheckReamining()
    //////////////number of remaining questions //

  

    // checkStatus();

})

///////////////// toggle the active bullet //////

function togglBullet(){
    let allBullets = bulltesSpanContainer.querySelectorAll('span');
    // console.log(allBullets);
    allBullets.forEach(bull=>{
        if(bull.classList.contains('on')) bull.classList.remove('on')
        // bull.classList.toggle('on')
    })

    let tempBullet = document.querySelector(`#bullet_${currentIndex+1}`);
    // console.log(tempBullet);
    tempBullet.classList.add('on');

    
}

////////////prev button ////////////////////////////
prevBtn.addEventListener('click' ,function(e){

    // if(currentIndex - 1  === 0 ){
    //     prevBtn.style.border = "2px solid #2982be46";
    //     prevBtn.style.backgroundColor = "#2982be75";
    // }else{
    //     prevBtn.style.border = "2px solid #2983be";
    //     prevBtn.style.backgroundColor = "#2983be";
    // }




    // if(currentIndex  === 0 ){
    //     e.preventDefault()
    //     console.log(currentIndex);
    //     prevBtn.setAttribute('disabled' , true)
        
    //     return ;
    // }

   

    if(currentIndex > 0){
     
        currentIndex-- ;
        togglBullet() ;
        checkStatus()
    }
    
    // scheckReamining()
    answersArea.innerHTML = '' ;
    // console.log( currentIndex);
    addQuestionsData(questionsObject[currentIndex]);
 

   
     //////////////number of remaining questions //
    

    //  let currBullet = document.querySelector(`#bullet_${currentIndex}`);

    //      if(!currBullet.classList.contains('marcked')){
    //         let temNumber =  countSpan.innerText ;
    //         console.log(temNumber);
    //         countSpan.innerHTML= +temNumber + 1 ;

           
    //      }

})

///////////////////mark button  ////////////

markBtn.addEventListener('click' , function(){

    let markerBox = document.querySelector('.markBox');
    let boxs  = markerBox.querySelectorAll('.bulletbox');


    let tempBullet = document.querySelector(`#bullet_${currentIndex+1}`);
    console.log(tempBullet);
    // tempBullet.classList.toggle('marcked');
    tempBullet.classList.toggle('marcked');
    // tempBullet.classList.contains('marcked') ? tempBullet.classList.remove('marcked') : tempBullet.classList.add('marcked') 

    let box = document.createElement('span');
    box.classList.add('bulletbox');
    box.classList.add('enter');
    box.setAttribute('id' , `box${currentIndex+1}`)
    box.innerHTML =`${currentIndex+1}<i class="fa-solid fa-square-xmark  delet"></i> ` ; 

    
    if( markerBox.querySelector(`#box${currentIndex+1}`)){
        markerBox.removeChild( markerBox.querySelector(`#box${currentIndex+1}`))
    }else{
         markerBox.append(box) ;

    }

    box.addEventListener('mouseover' , function(){
        let close = this.querySelector('.delet');
        // console.log(close);
        // close.closest()
        close.style.display = 'block' ;
        let self = this ;
        close.addEventListener('click' ,function(){
           let index = this.closest('span').innerHTML[0] ;
        //    console.log(index);
           let tempBox = document.querySelector(`#bullet_${index}`);
           console.log(tempBox);
           tempBox.classList.remove('marcked');
        
           let markedBooxTodelet = markerBox.querySelector(`#box${index}`)
        if( markedBooxTodelet){
            // markedBoox.style.animation = 'leaveScreen 1s ease forwards ;'
            // markedBooxTodelet.classList.remove('enter');
            markedBooxTodelet.classList.add('leave');
            markerBox.removeChild(markedBooxTodelet)

            setTimeout(()=>{

            } , 2000)

            }
  
        })
    })    

    box.addEventListener('mouseleave' , function(){
        let close = this.querySelector('.delet');
        // console.log(close);
        close.style.display = 'none' ;
    })
  
    box.addEventListener('click' , function(){
        let index = this.closest('span').innerHTML[0] ;
           console.log(index);
           answersArea.innerHTML = '' ;
           currentIndex = index - 1 ;
           addQuestionsData(questionsObject[(currentIndex) ]);
           // this.classList.add('on');
           togglBullet()
           checkStatus()
    })

})

/////////////// show result ////////////

resultBtn.addEventListener('click' , function(){

    let userAnswers = [] ;
    let questions = JSON.stringify(questionsObject) ;
    console.log(questions);
    questionsObject.forEach(ques=>{
        console.log(ques['checkedOne'] , ques['correct']);
        userAnswers.push(ques['checkedOne']) ;
        // Correctanswers.push(ques['correct']) ;
        if(ques['checkedOne'] === ques['correct']) rightAnswer++ ;
        
    })
    // console.log(rightAnswer);
    // resultArea.innerHTML = rightAnswer ;
    creatCookies('grade',rightAnswer ) ;
    creatCookies('useranswers' ,userAnswers);
    creatCookies('questions' , questions);
    
    // remmember to change the view hide the test form then show the result page   questionsObject
})


function watchTime(){
    setTimeout(()=>{
        // console.log("time out");
        // deleteCookie('username');
        // deleteCookie('useremail');
        // deleteCookie('userRole');
        location.href = 'grades.html' ;
    },totalTime * 1000)

    // remmember to change the view hide the test form then show the result page 
   
}


//////// toggle the prev and next btn when it is the last and first quesiton

function checkStatus(){
    // if(currentIndex  === questionsCount - 1 ){
    //     // e.preventDefault()
    //     console.log(currentIndex);
    //     nextBtn.setAttribute('disabled' , true);
    //     return ;
    // }else{
    //     nextBtn.setAttribute('disabled' , false);

    // }

    if(currentIndex  ===  questionsCount - 1 ){
        nextBtn.style.display = "none" ;
    }else{
        nextBtn.style.display = "block" ;
    }

    if(currentIndex  ===  0 ){
        prevBtn.style.display = "none"
    }else{
        prevBtn.style.display = "block"
    }
}


function scheckReamining(){
    // let bulltesnum =  bulltesSpanContainer.querySelector('.bullet');
    // bulltesnum.forEach(bull =>{

    // })

    // let currBullet = document.querySelector(`#bullet_${currentIndex}`);
    remainCounter = 0 ;
    questionsObject.forEach(ques=>{
        // console.log(ques);
        if(!ques['checkedOne']) {
            remainCounter++;
        }
    })

    countSpan.innerHTML= remainCounter;


    // if(!currBullet.classList.contains('marcked')){
    //     let temNumber =  countSpan.innerText ;
    //     // console.log(temNumber);
    //     countSpan.innerHTML= +temNumber - 1 ;
    // }
}




function removeMarked(){

}


document.onmouseover