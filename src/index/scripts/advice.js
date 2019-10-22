import util from '../../utilities/utilities' ;
let categoryWrapper = document.querySelector('#category') ;
let categorySelect = categoryWrapper.querySelector('select') ;
let categoryOptions = categorySelect.querySelectorAll('option:not([value=""])') ;
let categoryTabs = categoryWrapper.querySelectorAll('.tab') ;
let adviseNum = categoryTabs[0].querySelectorAll('.advice').length ;
categorySelect.addEventListener('change',showTab) ;
let animeTime = 500 ; //.5s
let animeTimeOffset = Math.round(animeTime/(adviseNum-1)) ;
animateTabs(categoryTabs[0]) ;
function showTab(e){
    let currOption = null ;
    let targetTabID = null ;
    let targetTab = null ;
    categoryOptions.forEach(categoryOption => {
        if(this.value == categoryOption.value) {
            currOption = categoryOption ;
            targetTabID = currOption.getAttribute('data-tab') ;       
        }
    })
    categoryTabs.forEach(categoryTab => {
        if(categoryTab.classList.contains('active')) {
            categoryTab.classList.remove('active') ;
            let advices = categoryTab.querySelectorAll('advice') ;
            advices.forEach(advice => {
                advice.style.animationDelay = '0s' ;
                advice.classList.remove('show');
                advice.style.height = 'auto';
            })
        }
        if(categoryTab.getAttribute('id')==targetTabID) targetTab = categoryTab ; 
    })  
    animateTabs(targetTab) ;
}
function animateTabs(tab){
    let advices = tab.querySelectorAll('.advice') ;
    let maxAdviseHeight = parseFloat(util.heightMinMax('max',advices,'height')) ;
    tab.classList.add('active') ;
    advices.forEach((advice,i) => {
        advice.style.height = `${maxAdviseHeight}px` ;
        advice.style.animationDelay = `${(animeTimeOffset*i)/1000}s` ;
        advice.classList.add('show') ;
    })
}