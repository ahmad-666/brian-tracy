let mobileHeader = document.querySelector('#mobileHeader') ;
let bars = mobileHeader.querySelector('.bars') ;
let barsLine = bars.querySelectorAll('.line') ;
let barsArrows = bars.querySelectorAll('.arrow') ;
let mobileNav = document.querySelector('#mobileNav') ;
let mobileNavRotate = mobileNav.querySelector('.rotate') ;
let mobileNavUL = mobileNav.querySelector('ul') ;
bars.addEventListener('click',toggleMobileMenu) ;
function toggleMobileMenu(e){   
    document.body.classList.toggle('disableScroll') ;
    barsLine.forEach(line => line.classList.toggle('goOutside'))
    barsArrows.forEach(arrow => arrow.classList.toggle('createClose'))
    mobileNavRotate.classList.toggle('open') ;
    mobileNavUL.classList.toggle('show') ;
}