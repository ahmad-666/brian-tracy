let tabsTriggers = document.querySelectorAll('.partBottom .heading p') ;
let tabs = document.querySelectorAll('.partBottom .tabs .tab') ;
tabsTriggers.forEach(tabTrigger=>tabTrigger.addEventListener('click',changeTab)) ;
function changeTab(e){
    tabsTriggers.forEach(trigger=>trigger.classList.remove('active')) ;
    e.currentTarget.classList.add('active') ;
    tabs.forEach(tab=>tab.classList.remove('active')) ;
    let target = e.currentTarget.getAttribute('data-target') ;
    document.querySelector(`#${target}`).classList.add('active') ;
}