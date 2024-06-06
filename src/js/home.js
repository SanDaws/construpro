const main= document.querySelector('main')
// send as session storage a vlaue that does as filter in the dashboard
main.addEventListener('click',(event)=>{
const val=event.target.getAttribute('item-filter')
if(event.target.classList.contains('btn-link')){
    sessionStorage.setItem('filter',val)
    window.location.href='/src/pages/dashboard.html'
    
}
})

