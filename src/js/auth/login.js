// Full Name: Snatiago Castro Giraldo
// Clan: Dell
// Date: 06-04-24
import { loggedWarden } from "../warden.js";
loggedWarden()

const link = 'http://localhost:3000/'

const form = document.querySelector('form')

const userName = form.querySelector('#user-name')
const userPass = form.querySelector('#password')

async function validate(userName, password) {
    const requestRespose = await fetch(`${link}user?user_name=${userName}`)
    const datas = await requestRespose.json()

    if (datas[0]['password'] === password) {
        return datas[0]
    } else {
        return false
    }

}


form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const valdata = await validate(userName.value, userPass.value)


    if (valdata) {

        const jason = JSON.parse(JSON.stringify(valdata))

        localStorage.setItem('usertoken', jason.id)
        localStorage.setItem('usertype', jason.user_type)
        window.location.href='/'
    } else {
        alert('you shall not pass')
    }


})