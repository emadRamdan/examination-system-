
import {Question , Answer , Test} from "./questionClass.js";


let titleField = document.querySelector('#title') ;
let answerField = document.querySelectorAll('.answer');
let correctAnswerField = document.querySelector('#correct');
let submitField = document.querySelector('#add') ;

// let testID = document.querySelector('#test-id')


let title , correct  , id ;
let answersObj = [] ;

titleField.addEventListener('keyup' , function(){
    title = titleField.value ;
    // console.log(title);
})
correctAnswerField.addEventListener('keyup' , function(){
    correct = correctAnswerField.value ;
    // console.log(correct);
})
 
let answers = [] ;
answerField.forEach((ele , i) =>{
    ele.addEventListener('keyup' , function(){
        let temAnswerObj = new Answer(`answer_${i}` , ele.value , false ) ;
        answersObj[i] = temAnswerObj;
        answers[i] = ele.value ;
        // console.log(answers[i]);
    })


})

let quesitons = [] ;

////// submit questions //////
submitField.addEventListener('click' , function(){
    // console.log( correct, title ,answersObj );
  
      ///// set validations //
      if(title && !answers.includes('') && answers.includes(correct)){
        let tempQues = new Question(title , answersObj , correct);

        quesitons.push(tempQues);
        console.log(quesitons);
     
     clearInp(titleField) ;
     clearInp(correctAnswerField) ;
     answerField.forEach(ele=>{
         clearInp(ele) ;
     })
      }else{
        alert('please check fields again ')
      }
 
})

let tests = [] ;



////////////  submit the wall exam ////////
subTest.addEventListener('click' , function(){

    let testID = document.querySelector('#test-id') ;

    if(!quesitons.length || !testID.value){

        alert("enter valid id and valid q data ");
        return ;
    }
    let newTest = new Test(testID.value ,  testID.value, quesitons) ;

    let oldData =  JSON.parse(localStorage.getItem('Tests'));
    if(oldData != null){
        tests = oldData ;
        tests.push(newTest);
        localStorage.setItem('Tests' ,JSON.stringify(tests) );

    }else{
        tests.push(newTest)
        localStorage.setItem('Tests' ,JSON.stringify(tests)  );
    }

    location.href = 'quiz.html'
})


function clearInp(field){
    field.value = ''
}

///////////// validations 


function checkAnswers(arr , value){
    arr.includes(value) 
    console.log((value));
}


// let arr = ['emad' ,'ali' , 'mohamed'] ;

// let x = 'emad' ;

// let n = arr.includes('emad')

// console.log(n);


// // ele =>{
// //     ele === x;
// // }