
export function creatCookies(key , value , expireDate){
    if(validateKey(key)){

    document.cookie = `${key}=${value};expires=${expireDate}` ;
    }
}


export function getCookies(key){
    if(validateKey(key)){

            let cookies = document.cookie.split(";") ;
            let selected = "404";
            for (let i = 0; i < cookies.length ; i++ ) {
                let MYcookie = cookies[i].split("=")[0].trim();
                //console.log(MYcookie)
                if(key == MYcookie){
                    selected = cookies[i].split("=")[1].trim();
                }
                
            }
            //console.log(selected) ;
            return selected ;
        }
}

export function deleteCookie(key){
    if(validateKey(key)){

        let xDate = new Date("12/16/2000") ;
        creatCookies(key , "gg" , xDate )
    }
}


export function allCookieList(){
    let cookies = document.cookie.split(";") ;
    let list =[] ;
    cookies.forEach(element => {
     let cookie = element.split("=") ;
     list.push(cookie) ;
    })

    if(list.length && list[0] != ''){
        console.log(list) ;
        return list ;    
    }
    else{
        alert("sorry we run out of cookies ") ;
    }
    
}




export function hasCookie(key){
    if(validateKey(key)){
                let checker =  getCookies(key) ;

        if(checker == "404"){
                console.log("can't be found");
                return false ;
        }
        else{
            // console.log("found it her it's :", checker);
            return true ;
        }
    } 
}

function validateKey(key){
    if(!key){
        throw("Please Enter a key") ;
    }
    else if(isFinite(key)){
        throw("please Enter a valid Key") ;
    }
    else {
        return true ;
    }
}

////////////////////////////////////////////////////////////
