import util from '../utilities.js' ;
function SliderMove(wrapper,timer){
    this.wrapper = wrapper ;
    this.slider = this.wrapper.querySelector('.slider') ;
    this.slidesNum = this.slider.querySelectorAll('.slide').length ;
    this.currIndex = 0 ;
    this.offset = 100 ; //100%
    this.movement = null ; //how many slides will move
    this.timer = timer ;
    this.clearTimer = null ;
    this.btns = this.wrapper.querySelectorAll('.btn') ; //for prev/next btn
    this.dots = this.wrapper.querySelectorAll('.dot') ;
    this.btns.forEach(btn => btn.addEventListener('click',this.changeSlide.bind(this))) ;
    this.dots.forEach(dot => dot.addEventListener('click',this.changeSlide.bind(this))) ;
    this.autoSlider() ;
}
SliderMove.prototype.autoSlider = function(e){
    this.clearTimer = setInterval(()=>{
        let currPos = parseFloat(this.slider.style.right) ;
        this.dots[this.currIndex].classList.remove('active') ;
        this.currIndex = this.currIndex+1<=this.slidesNum-1?this.currIndex+1 :0 ;
        this.movement = -1 ;
        if(this.currIndex == 0) this.slider.style.right = `0%` ;
        else this.slider.style.right = `${currPos+(this.movement*this.offset)}%` ; 
        this.dots[this.currIndex].classList.add('active') ;
    },this.timer) ;
}
SliderMove.prototype.changeSlide = function(e){
    clearInterval(this.clearTimer) ;
    this.autoSlider();
    let clickedElm = e.currentTarget ;
    let currPos = parseFloat(this.slider.style.right) ;
    this.dots[this.currIndex].classList.remove('active') ;
    if(clickedElm.classList.contains('next')) {
        this.currIndex = this.currIndex+1<=this.slidesNum-1?this.currIndex+1 :0 ;
        this.movement = -1 ;
        if(this.currIndex == 0) this.slider.style.right = `0%` ;
        else this.slider.style.right = `${currPos+(this.movement*this.offset)}%` ; 
    }
    else if(clickedElm.classList.contains('prev')) {
        this.currIndex = this.currIndex-1>=0?this.currIndex-1 :this.slidesNum-1 ;
        this.movement = 1
        if(this.currIndex == this.slidesNum-1) this.slider.style.right = `-${(this.slidesNum-1)*this.offset}%` ;
        else this.slider.style.right = `${currPos+(this.movement*this.offset)}%` ; 
    }
    else {
        let oldIndex = this.currIndex ;
        this.currIndex = util.getChildIndex(clickedElm.parentElement,clickedElm) ;
        this.movement = oldIndex - this.currIndex ;
        this.slider.style.right = `${currPos+(this.movement*this.offset)}%` ; 
    }
    this.dots[this.currIndex].classList.add('active') ;
}
export default{
    SliderMove
}