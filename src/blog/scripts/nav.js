import FontFaceObserver from 'fontfaceobserver' ;
import collapse from '../../utilities/scripts/collapse' ;
let blogNav = document.querySelector('nav#blog') ;
let blogNavBarsWrapper = blogNav.querySelector('.bars')
let blogNavBars = blogNavBarsWrapper.querySelector('.fa-bars') ;
let blogNavMenu = blogNavBarsWrapper.querySelector('ul.menu') ;
blogNavBars.addEventListener('click',toggleMobileBlogNav) ;
function toggleMobileBlogNav(e){
    blogNavMenu.classList.toggle('show') ;
    if(blogNavMenu.classList.contains('show')){
        document.addEventListener('click',mobileNavDoc) ;
    }
    else{
        document.removeEventListener('click',mobileNavDoc) ;
    }
}
function mobileNavDoc(e){
    let clickedElm = e.target ;
    if(!blogNavBarsWrapper.contains(clickedElm)){
        blogNavMenu.classList.remove('show') ;
        document.removeEventListener('click',mobileNavDoc) ;
    }
}
blogNavMenu.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new collapse.Collapse(withCollapse,others));
})