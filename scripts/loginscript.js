
import { creatCookies , getCookies , hasCookie } from "./cookis.js";



window.addEventListener('load', function(){
    if(hasCookie('useremail')){
       this.alert("yor are aleardy loged in ");
       location.href = 'quiz.html';
        
    }
})


const form = document.querySelector('form'),
    emailField = form.querySelector('.email-field'),
    emailInput = emailField.querySelector(".email"),
    passwordField = form.querySelector('.cPassword-field'),
    passwordInput = passwordField.querySelector('.password'),
    confirmation = form.querySelector('.confirm-error') ;

console.log(confirmation);
    const checkBox = document.querySelector('.remBox');

// let checked ;
    
///////check email validation   /////

function checkEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailInput.value.match(emailPattern)){
      return emailField.classList.add('invalid');
    }
    emailField.classList.remove('invalid');
}


/////////check passwprd validation ////////////


function checkPassword(){
    
    const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(!passwordInput.value.match(passwordPattern)){
      return  passwordField.classList.add('invalid');
    }
    passwordField.classList.remove('invalid') ;
}


//////////////// show and hide password ////////

const eyeIcons = document.querySelectorAll('.eyee') ;

eyeIcons.forEach((ele)=>{
    ele.addEventListener('click' , function(){
        if(ele.classList.contains('fa-eye-slash')){
            ele.classList.replace('fa-eye-slash' , 'fa-eye');
        }else{
         ele.classList.replace('fa-eye' , 'fa-eye-slash');
        }
      const tempEle = ele.parentElement.querySelector('input');
      if(tempEle.type === 'password'){
       return tempEle.type = 'text';
      }
      tempEle.type = "password" ;
    })
})

form.addEventListener('submit' , function(e){
    e.preventDefault();
    checkEmail();
    checkPassword();

    emailInput.addEventListener('keyup' , checkEmail);
    passwordInput.addEventListener('keyup' , checkPassword);

    if(!emailField.classList.contains('invalid') &&
       !passwordField.classList.contains('invalid')){
            let users =  JSON.parse(localStorage.getItem('users'))

            if(!users){
                // alert('email not found sign up please');
                // emailField.classList.add('invalid')
                confirmation.classList.remove('hideSError') ;


                return;
            }

            let user = findUser(users , emailInput.value) ;
            if(user == -1){         
                // alert("user can't be found")
                confirmation.classList.remove('hideSError') ;
            }else{
                if(users[user]['password'] === passwordInput.value ){
                    // alert("yse")
                    if(checkBox.checked){
                        creatCookies('useremail' , `${emailInput.value}` , new Date('1/5/2025'));
                        creatCookies('username' , `${users[user]['UserName']}` , new Date('1/5/2025'));
                        creatCookies('userRole' , `${users[user]['role']}` , new Date('1/5/2025'));
                    }else{
                        creatCookies('useremail' , `${emailInput.value}` );
                        creatCookies('username' , `${users[user]['UserName']}`);
                        creatCookies('userRole' , `${users[user]['role']}` );

                    }               
                    location.href = form.getAttribute('action');
                }else{
                    alert("wrong password")
                }
            }
    }
 
})


/////////search for the user ///////////////////////
function findUser(arr , val){
    let index = -1 ;
    arr.forEach((ele , i)=>{
        if(ele['email'] == `${val}`){
            index = i ;
        }    
    })
    return index ;
}
