const inUserName = document.getElementById('inUserName')
const inPassword = document.getElementById('inPassword')
const signInBtn = document.getElementById('signInBtn')
const tokenDiv= document.getElementById('tokenDiv')
const url = 'http://localhost:3001/'


signInBtn.onclick = async()=>{
    const userName = inUserName.value;
    const password = inPassword.value;
    if(!userName || !password){
        return
    }
    const response = await fetch(`${url}login`,{method:"POST",headers:{'Content-Type': 'application/json'} 
    ,body:JSON.stringify({userName,password})});
    const repObj = await response.json();
    const QRimg = document.createElement('img');
    QRimg.src = repObj.data;
    const tokenInput = document.createElement('input');
    const tokeUserName = document.createElement('input');
    const tokenBtn = document.createElement('button');
    tokenInput.placeholder = 'enter Token'
    tokeUserName.placeholder = 'enter UserName'
    tokenBtn.onclick = async()=>{
        const token = tokenInput.value
        const userName = tokeUserName.value
        const response = await fetch(`${url}verify`,{method:"POST",headers:{'Content-Type': 'application/json'} 
        ,body:JSON.stringify({userName,token})});
        if(response.ok){
            window.location.replace(url+'home')
        }
        else{
            alert('invalid data')
        }
    }
    tokenDiv.append(QRimg, tokeUserName, tokenInput, tokenBtn);
}