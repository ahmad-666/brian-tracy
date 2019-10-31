function ScrollArrows(wrapper){
    this.wrapper = wrapper ; 
    this.arrows = this.wrapper.querySelector('.arrows') ;
    //each time we need to set new this.parent/this.children
    this.parent = this.wrapper ;
    //this.children = [...this.parent.querySelectorAll('.tab')] ;
    this.children = this.parent.querySelectorAll('.child') ;
    this.checkThreshold() ;
    window.addEventListener('resize',this.checkThreshold.bind(this)) ;
}
ScrollArrows.prototype.checkThreshold = function(e){
	if(window.innerWidth>850) this.arrows.classList.remove('show') ;
    else{
        let contentWidth = 0 ;
        this.children.forEach(child => {
            contentWidth += child.offsetWidth ;
        })
        if(contentWidth>this.parent.offsetWidth) this.arrows.classList.add('show') ;
        else this.arrows.classList.remove('show') ;
    }
}
//document.querySelectorAll('.scrollArrows').forEach(scrollArrow => {
//    new ScrollArrows(scrollArrow)
//})
export default{
	ScrollArrows
}