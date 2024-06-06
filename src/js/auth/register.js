// Full Name: Snatiago Castro Giraldo
// Clan: Dell
// Date: 06-04-24
import { loggedWarden } from "../warden.js";
loggedWarden()

// server
const link = 'http://localhost:3000/'

//selectors
const form=document.querySelector('form')

// userinfo
const userName=form.querySelector('#name')
const useLastName=form.querySelector('#last-name')
const user=form.querySelector('#user-name')
const userMail=form.querySelector('#email')


//password
const pass=form.querySelector('#password')
const passVerify=form.querySelector('#pass-verify')


//register button
const btnSingUp=form.querySelector('button[type="submit"]')


//every function will recieve selectors
// returns true if passwords are the same
function verifyPassword(pass,veryPass) {//entrance data = selector.value

    if (pass.value== veryPass.value) {

        return true
    }else{
        pass.reportValidity()
        return false
    }
    
    
}
//paramether of email selector value
async function validEmail(email) {
    const response = await fetch(`${link}user?email=${email.value}`)
    const emails = await response.json()

    if (emails.length === 0) {
        return true
    } else {
        return false
    }

}
//determine the type of user(admin or user) by the first letter of the password
//only Admis have password first leter 'A'
function typeUser(pass) {
    if (pass.charAt(0)==='A') {
        return 'admin'
        
    }else{
        return 'user'
    }

    
}

//the inputs are selectors
/*
{
    id://remove because autogenerate
    first_name:
    last_name:
    user_name
    user_type:
    email:
    password:
    
}
*/

//create a new user
function newUser(name,lastName,user,email,password) {
    const usersInfo={
        first_name:name.value.toLowerCase(),
        last_name:lastName.value.toLowerCase(),
        user_name:user.value,
        user_type:typeUser(password.value),
        email:email.value,
        password:password.value
    }
    return usersInfo
}

//send an object userr to database
async function sendUser(user) {
    await fetch(`${link}user`,{
        method: 'POST',
        headers:{
            'content-type':"aplication/json"
        },
        body: JSON.stringify(user)
    })
    
}
//submit button functionality
btnSingUp.addEventListener('click',async (event)=>{
    event.preventDefault()
    const validPass=verifyPassword(pass,passVerify)
    const validmail=validEmail(userMail)
    if (validPass && validmail) {
        const userObj= newUser(userName,useLastName,user,userMail,pass)

        await sendUser(userObj)
        
        
        window.location.href='/src/pages/auth/login.html'
    }

})