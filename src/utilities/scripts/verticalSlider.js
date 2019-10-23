import util from '../utilities.js' ;
class VerticalSlider{
    constructor(wrapper){
        this.wrapper = wrapper ;
        this.slider = this.wrapper.querySelector('.slider') ;
        this.dotsWrapper = this.wrapper.querySelector('.dots') ;
        this.dots = this.dotsWrapper.querySelectorAll('.dot') ;
        this.movement = this.slider.querySelector('.slide').offsetHeight ;
        this.currIndex = 0 ;
        this.dots.forEach(dot => {dot.addEventListener('click',this.changeSlide.bind(this))})
    }
    changeSlide(e){
        this.currIndex = util.getChildIndex(this.dotsWrapper,e.currentTarget) ;
        this.slider.style.top = `-${this.currIndex*100}%` ;
    }
}
export default{
    VerticalSlider
}