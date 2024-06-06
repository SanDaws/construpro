// Full Name: Snatiago Castro Giraldo
// Clan: Dell
// Date: 06-04-24

const usertoken= localStorage.getItem('usertoken')
const userT=localStorage.getItem('userT')
export function loggedWarden() {
    if (usertoken != null) {
        window.location.href='/'
        
    }
    
}
export function logOutButton() {
    const logUser= document.querySelector('#user-log')
    if(usertoken!= null){
        logUser.innerHTML=`
        <button type="button" id="logout" class="btn btn-secondary">Logout</button>
        `
        listenerLogout()
    }else{
        logUser.innerHTML=`
        <a href="/src/pages/auth/login.html"><button type="button" class="btn btn-warning">Login</button></a>
        <a href="/src/pages/auth/register.html"><button type="button" class="btn btn-secondary">Register</button></a>
        `
    }
    
}
export function listenerLogout() {
    const logout=document.querySelector('#logout')
    logout.addEventListener('click',(event)=>{
        localStorage.clear()
        window.location.href='/'
    })
    
}
export function loggedAdminWarden() {
    
}