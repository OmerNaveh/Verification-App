
const url = 'http://localhost:3001/'
//elements
const upUserName = document.getElementById('upUserName')
const upPassword = document.getElementById('upPassword')
const signUpBtn = document.getElementById('signUpBtn')



signUpBtn.onclick = async()=>{
    const userName = upUserName.value;
    const password = upPassword.value;
    if(!userName || !password){
        return
    }
    const response = await fetch(`${url}signUp`,{method:"POST",headers:{'Content-Type': 'application/json'} 
    ,body:JSON.stringify({userName,password})});
    if(response.ok){
        window.location.replace(url+'signIn')
    }
    else{
        alert('invalid data')
    }
}