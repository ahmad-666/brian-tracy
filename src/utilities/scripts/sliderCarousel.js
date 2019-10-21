function SliderCarousel(wrapper){
    this.wrapper = wrapper ;
    this.slidesWrapper = this.wrapper.querySelector('.slides') ;
    this.slides = this.slidesWrapper.querySelectorAll('.slide') ;
    this.nextBtn = this.wrapper.querySelector('.btn.next') ;
    this.prevBtn = this.wrapper.querySelector('.btn.prev') ;
    this.slidesNum = this.slides.length ;
    this.currIndex = 0 ;
    this.offset = this.slides[this.currIndex].offsetWidth+parseFloat(getStyle(this.slides[this.currIndex],'margin-right'))+parseFloat(getStyle(this.slides[this.currIndex],'margin-left')) ;
    this.viewportSlides = Math.floor(this.slidesWrapper.offsetWidth/this.offset) ;// how many slides are inside this.slidesWrapper at one time   
    if(this.slidesNum>this.viewportSlides){    
        this.nextBtn.addEventListener('click',this.nextSlide.bind(this)) ;
        this.prevBtn.addEventListener('click',this.prevSlide.bind(this)) ;
    }
    window.addEventListener('resize',this.update.bind(this)) ;
}
SliderCarousel.prototype.update = function(e){
    this.offset = this.slides[this.currIndex].offsetWidth+parseFloat(getStyle(this.slides[this.currIndex],'margin-right'))+parseFloat(getStyle(this.slides[this.currIndex],'margin-left')) ;
    this.viewportSlides = Math.floor(this.slidesWrapper.offsetWidth/this.offset) ;
}
SliderCarousel.prototype.nextSlide = function(e){
    this.currIndex = this.currIndex+1<=this.slidesNum-this.viewportSlides ? this.currIndex+1 : 0 ;
    this.moveSlider('forward') ; 
}
SliderCarousel.prototype.prevSlide = function(e){
    this.currIndex = this.currIndex-1>=0 ? this.currIndex-1 : this.slidesNum-this.viewportSlides ;
    this.moveSlider('backward') ; 
}
SliderCarousel.prototype.moveSlider = function(dir){
    let currPos = parseFloat(this.slidesWrapper.style.right) ;
    let movement = null ;
    if(dir == 'forward'){
        if(this.currIndex !=0 ) movement = currPos - this.offset ;           
        else movement = 0 ;    
    }
    else if(dir == 'backward'){
        if(this.currIndex != this.slidesNum-this.viewportSlides) movement  = currPos + this.offset ;     
        else movement = -1*((this.slidesNum*this.offset) - this.slidesWrapper.offsetWidth) ;
    }
    this.slidesWrapper.style.right = `${movement}px` ;
}
//new SliderCarousel(document.querySelector('.sliderCarousel')) ;
export default{
	SliderCarousel
}