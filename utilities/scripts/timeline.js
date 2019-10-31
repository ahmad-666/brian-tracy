function Progress(progress,threshold){
    this.progress = progress ;
    this.threshold = threshold ;
    //when size of window gets bellow threshold we change height not width
    this.line = this.progress.querySelector('span.line') ;
    this.steps = this.progress.querySelectorAll('.step') ;
    this.stepsNum = this.steps.length ;
    this.lineOffset = Math.round(100/(this.stepsNum-1)) ; //as percent 
    this.currIndex = 0 ;
    if(window.innerWidth<=this.threshold) {
        this.line.style.width = '' ;
        this.line.style.height = '0%' ;
    }
}
Progress.prototype.changeStep = function(offset,dir){
    //offset is how many steps we moving not final index of target step
    this.currIndex += offset ;
    let lineCurrPos = null ;
    if(window.innerWidth>this.threshold) lineCurrPos = parseFloat(this.line.style.width) ;
    else lineCurrPos = parseFloat(this.line.style.height) ;
    if(offset>=0) { //we go forward
        this.steps.forEach((step,i)=>{
            if(i<=this.currIndex) step.classList.add('active') ;
            //else step.classList.remove('active') ;  
        })
    }
    else{//we go backward
        this.steps.forEach((step,i)=>{
            if(i>this.currIndex) step.classList.remove('active') ;    
            //else step.classList.add('active') ;
        })
    }
    if(window.innerWidth>this.threshold) this.line.style.width = `${lineCurrPos+(offset*this.lineOffset)}%` ;
    else this.line.style.height = `${lineCurrPos+(offset*this.lineOffset)}%` ;    
}
function TimelineSlider(slider,progress){
    this.slider = slider ;
    this.progress = progress ;
    this.changeSlideTriggers = this.slider.querySelectorAll('.changeSlide') ;
    this.changeSlideTriggers.forEach(changeSlide => {
        changeSlide.addEventListener('click',this.checkChangeSlide.bind(this)) ;
    })
}
TimelineSlider.prototype.checkChangeSlide = function(e){
    let btn = e.currentTarget ;
    let offset = parseInt(btn.getAttribute('data-slide')) ;
    if(!btn.classList.contains('validate')) this.changeSlide(offset) ;  
    else{ //if we need validation
        if(infos.validate) this.changeSlide(offset) ;       
    }
}
TimelineSlider.prototype.changeSlide = function(offset){
    let currPos = parseFloat(this.slider.style.right) ;
    this.slider.style.right = `${currPos+(-1*offset*100)}%` ;
    this.progress.changeStep(offset) ;
}
function Timeline(timeline){
    this.timeline = timeline ;
    this.progress = new Progress(this.timeline.querySelector('#timeline'),500) ;
    this.slider = new TimelineSlider(this.timeline.querySelector('#timelineSlider'),this.progress) ;
}
document.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})
let form = document.querySelector('form#sample') ;
let stage4 = form.querySelector('#stage4') ;
let infoSubmit = stage4.querySelector('button.next.validate') ;
let infoInputs = stage4.querySelectorAll('input.validate') ;
let infos = new FormValidate(form,infoSubmit,infoInputs,false) ;
new Timeline(document.querySelector('#timelineWrapper')) ;