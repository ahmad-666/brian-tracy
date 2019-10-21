function topSlider(wrapper,timer){
    this.wrapper = wrapper ;
    this.slides = this.wrapper.querySelectorAll('.slide') ;
    this.slidesNum = this.slides.length ;
    this.nextBth= this.wrapper.querySelector('.arrow.next') ;
    this.prevBtn= this.wrapper.querySelector('.arrow.prev') ;
    this.dotContainer = this.wrapper.querySelector('.dots_container') ;
    this.dots = this.dotContainer.querySelectorAll('.dot') ;
    this.currIndex = 0 ;
    this.nextBth.addEventListener('click',this.changeSlide.bind(this));
    this.prevBtn.addEventListener('click',this.changeSlide.bind(this));
    this.dots.forEach(dot => {
        dot.addEventListener('click',this.changeSlide.bind(this)) ;
    })
    this.timer = timer ;
    this.clearTimer = null ;
    this.autoSlider() ;
}
topSlider.prototype.autoSlider = function(){
    this.clearTimer = setInterval(()=>{
        this.dots[this.currIndex].classList.remove('active') ;
        this.slides[this.currIndex].classList.remove('active') ;
        this.currIndex = this.currIndex+1<=this.slidesNum-1 ? this.currIndex+1 : 0 ;
        this.dots[this.currIndex].classList.add('active') ;
        this.slides[this.currIndex].classList.add('active') ;
    },this.timer)
}
topSlider.prototype.changeSlide = function(e){
    clearInterval(this.clearTimer) ;
    this.autoSlider() ;
    this.dots[this.currIndex].classList.remove('active') ;
    this.slides[this.currIndex].classList.remove('active') ;
    if(e.target == this.nextBth) this.currIndex = this.currIndex+1<=this.slidesNum-1 ? this.currIndex+1 : 0 ;
    else if(e.target == this.prevBtn) this.currIndex = this.currIndex-1>=0 ? this.currIndex-1 : this.slidesNum-1 ;
    else this.currIndex = getChildIndex(this.dotContainer,e.target) ; //e.target is dot
    this.dots[this.currIndex].classList.add('active') ;
    this.slides[this.currIndex].classList.add('active') ;
}
//new topSlider(document.querySelector('.topSlider'),3000) ;
export default{
	topSlider
}