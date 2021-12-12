
const url = 'http://localhost:3001/'
//elements
const upUserName = document.getElementById('upUserName')
const upPassword = document.getElementById('upPassword')
const signUpBtn = document.getElementById('signUpBtn')
const inUserName = document.getElementById('inUserName')
const inPassword = document.getElementById('inPassword')
const signInBtn = document.getElementById('signInBtn')


signUpBtn.onclick = async()=>{
    const userName = upUserName.value;
    const password = upPassword.value;
    if(!userName || !password){
        return
    }
    await axios.post(`${url}signUp`,{userName,password});
}