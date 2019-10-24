import util from '../../utilities/utilities.js' ;
class VerticalSlider{
    constructor(wrapper,config){
        this.wrapper = wrapper ;
        this.config = config ;
        this.slider = this.wrapper.querySelector('.slider');
        this.nextBtn = this.wrapper.querySelector('.btn.next');
        this.prevBtn = this.wrapper.querySelector('.btn.prev');
        this.dots = this.wrapper.querySelectorAll('.dot') ;
        this.currIndex = 0 ;
        this.movement = 100 ;
        this.slidesNum = this.slider.querySelectorAll('.slide').length ;
    }
    init(){
        this.nextBtn.addEventListener('click',this.changeSlide.bind(this));
        this.prevBtn.addEventListener('click',this.changeSlide.bind(this));
        this.dots.forEach(dot =>{
            dot.addEventListener('click',this.changeSlide.bind(this)) ;
        })
        if(this.config.autoSlider) this.autoTimer() ;
    }
    autoTimer(){
        this.clearTimer = setInterval(()=>{
            this.changeSlide('auto') ;
        },this.config.timer) ;
    }
    changeSlide(e){
        clearInterval(this.clearTimer) ;
        this.autoTimer() ;
        if(e=='auto'){
            this.dots[this.currIndex].classList.remove('active') ;
            this.currIndex = this.currIndex+1<=this.slidesNum-1?this.currIndex+1:0;   
            this.dots[this.currIndex].classList.add('active') ;
            this.slider.style.top = `-${(this.movement*this.currIndex)}%` ; 
        }
        else{
            let clickedElm = e.currentTarget ;
            this.dots[this.currIndex].classList.remove('active') ;
            if(clickedElm.classList.contains('next')) this.currIndex = this.currIndex+1<=this.slidesNum-1?this.currIndex+1:0;   
            else if(clickedElm.classList.contains('prev')) this.currIndex = this.currIndex-1>=0?this.currIndex-1 :this.slidesNum-1 ;
            else this.currIndex = util.getChildIndex(clickedElm.parentElement,clickedElm);
            this.dots[this.currIndex].classList.add('active') ;
            this.slider.style.top = `-${(this.movement*this.currIndex)}%` ;
        }   
    }
}
// import VerticalSlider from '../../utilities/scripts/verticalSlider.js';
// let verticalSliderConfig = {
//     autoSlider:true ,
//     timer:3000
// }
// let vs = new VerticalSlider(document.querySelector('#verticalSliderWrapper'),verticalSliderConfig) ;
// vs.init() ;
export default VerticalSlider ;