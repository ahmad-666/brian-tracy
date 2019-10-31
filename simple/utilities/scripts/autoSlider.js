//autoSlide--------------------------------------
//autoSlide--------------------------------------
//autoSlide--------------------------------------
function AutoSlider(wrapper){
    this.wrapper = wrapper ;
    this.slider = this.wrapper.querySelector('.slider') ;
    this.slides = this.slider.querySelectorAll('.slide') ;
    this.slidesNum = this.slides.length ;
    this.offset = this.slides[0].offsetWidth + parseFloat(getStyle(this.slides[0],'margin-right')) + parseFloat(getStyle(this.slides[0],'margin-left'))  ;
    this.slideTime = 2000 ; //500ms for each slide
    this.viewportSlides = Math.floor(this.slider.offsetWidth/this.offset);
    this.threshold = this.offset*(Math.abs(this.slidesNum-this.viewportSlides)) ;
    this.animation = null ;
    if(this.slidesNum*this.offset>this.slider.offsetWidth) {
        this.autoMove() ;
        this.slider.addEventListener('mouseenter',this.pauseSlider.bind(this)) ;
        this.slider.addEventListener('mouseleave',this.resumeSlider.bind(this)) ;
    }
}
AutoSlider.prototype.autoMove = function(){
    this.animation = anime({
        targets: this.slider ,
        duration: this.slidesNum*this.slideTime ,
        easing: 'linear' ,
        loop: true ,
        direction: 'alternate',
        right: -this.threshold 
    })
}
AutoSlider.prototype.pauseSlider = function(e){
    this.animation.pause() ;
}
AutoSlider.prototype.resumeSlider = function(e){
    this.animation.play() ;
}
//init autoSlide--------------------------------------
//init autoSlide--------------------------------------
//init autoSlide--------------------------------------
//new autoSlider(document.querySelector('.autoSlider'));
export default{
	AutoSlider
}
