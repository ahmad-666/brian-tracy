import util from '../../utilities/utilities' ;
let categoryWrapper = document.querySelector('#category') ;
let categorySelect = categoryWrapper.querySelector('select') ;
let categoryOptions = categorySelect.querySelectorAll('option:not([value=""])') ;
let categoryTabs = categoryWrapper.querySelectorAll('.tab') ;
let adviseNum = categoryTabs[0].querySelectorAll('.advice').length ;
util.findOption(categorySelect,showTab)
let animeTime = 500 ; //.5s
let animeTimeOffset = Math.round(animeTime/(adviseNum-1)) ;
animateTabs(categoryTabs[0]) ;
function showTab(selectedOption){
    let targetTabID = selectedOption.getAttribute('data-tab') ;
    let targetTab = null ;
    categoryTabs.forEach(categoryTab => {
        if(categoryTab.classList.contains('active')) {
            categoryTab.classList.remove('active') ;
            let advices = categoryTab.querySelectorAll('advice') ;
            advices.forEach(advice => {
                advice.classList.remove('show');
                advice.style.height = 'auto';
                advice.classList.remove('anime');
                advice.style.animationDelay = '0s' ;                      
            })
        }
        if(categoryTab.getAttribute('id')==targetTabID) targetTab = categoryTab ; 
    })  
    animateTabs(targetTab) ;
}
function animateTabs(tab){
    tab.classList.add('active') ;
    let advices = tab.querySelectorAll('.advice') ;
    advices.forEach(advice => advice.classList.add('show') )
    setTimeout(()=>{
        let maxAdviseHeight = parseFloat(util.heightMinMax('max',advices)) ;
        advices.forEach((advice,i) => {
            advice.style.height = `${maxAdviseHeight}px` ;
            advice.classList.add('anime') ;
            advice.style.animationDelay = `${(animeTimeOffset*i)/1000}s` ;
        })
    },500) ;  
}
