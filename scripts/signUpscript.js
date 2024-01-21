
import { creatCookies , getCookies , hasCookie } from "./cookis.js";



window.addEventListener('load', function(){
    if(hasCookie('useremail')){
       this.alert("yor are aleardy signed up ");
       location.href = 'quiz.html';
        
    }
})


const form = document.querySelector('form'),
    fnameField = form.querySelector('.fname-field'),
    fnameInput = fnameField.querySelector('.fname'),
    roleField = form.querySelector('.role-field'),
    roleInput = roleField.querySelector('.userRole'),
    emailField = form.querySelector('.email-field'),
    emailInput = emailField.querySelector(".email"),
    passwordField = form.querySelector(".cPassword-field"),
    passwordInput = passwordField.querySelector(".password"),
    confirmPassword = form.querySelector(".confirmPass-field"),
    cpasswordInput = confirmPassword.querySelector(".cpasssword");

    console.log(form);

/////////// check name //////////////////////

function checkName(name){
    const namePattern = /^[a-zA-Z0-9]{3,15}$/ ;
    

    if(!namePattern.test(name.value)){
      return   name.parentElement.parentElement.classList.add('invalid')
    }
    name.parentElement.parentElement.classList.remove('invalid')
    // console.log(name.parentElement.parentElement);

}

////////////////////


///////check email validation   /////

function checkEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

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


////////////// confirm password ///////////////

function confirmPass(){
    if(passwordInput.value !== cpasswordInput.value || cpasswordInput.value === ''){
        return confirmPassword.classList.add('invalid');
    }

    confirmPassword.classList.remove('invalid')
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

let users = [];


form.addEventListener('submit' , function(e){
    e.preventDefault();
    checkName(fnameInput);
    // checkName(lnameInput)
    checkEmail();
    checkPassword();
    confirmPass()

    emailInput.addEventListener('keyup' , checkEmail)
    passwordInput.addEventListener('keyup' , checkPassword)
    cpasswordInput.addEventListener('keyup', confirmPass);
    fnameInput.addEventListener('keyup' , function(){
        checkName(fnameInput);
    });
    // lnameInput.addEventListener('keyup' , function(){
    //     checkName(lnameInput);
    //     // console.log("Sss");
    // });

    //!fnameField.classList.contains('invalid')

    if( !emailField.classList.contains('invalid') && 
        !passwordField.classList.contains('invalid') &&
        !confirmPassword.classList.contains('invalid') &&
        !fnameField.classList.contains('invalid')
        ){

            let user = new User(fnameInput.value , roleInput.value ,emailInput.value , passwordInput.value);

            if(localStorage.users != null){
                users = JSON.parse(localStorage.users) ;
                if(findUser(users , emailInput.value) == -1){
                    users.push(user) ;
                    localStorage.setItem('users' , JSON.stringify(users));
                    location.href = form.getAttribute('action');

                }
                else{
                    alert('this user aleardy exists')
                }
            }else{
                users.push(user) ;
                localStorage.setItem('users' , JSON.stringify(users));
                location.href = form.getAttribute('action');

            }



        }
})    


///////// creat user /////////////

class User {

    constructor(UserName , role , email , password){
         this.UserName = UserName;
         this.role = role ;
        this.email = email;
        this.password = password
    }
}

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