let mobileWrapper = document.querySelector('#mobileWrapper') ;
let mobileTop = mobileWrapper.querySelector('#mobileTop') ;
let mobileIconWrapper = mobileTop.querySelector('.iconWrapper') ;
let mobileBars = mobileIconWrapper.querySelector('.bars') ;
let mobileClose = mobileIconWrapper.querySelector('.close') ;
let mobileMenu = mobileWrapper.querySelector('#mobileMenu') ;
mobileIconWrapper.addEventListener('click',toggleMobileMenu) ;
function toggleMobileMenu(e){
   document.body.classList.toggle('disableScroll') ;
   mobileBars.classList.toggle('animate') ;
   mobileClose.classList.toggle('animate') ;
   mobileMenu.classList.toggle('show') ;
}