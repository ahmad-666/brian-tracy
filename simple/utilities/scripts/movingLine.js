function MovingLine(line){
    this.line = line ;
}
MovingLine.prototype.move = function(target){
    let width = null ;
    let right = null ;
    //parent of this.line and target should be same 
    width = parseFloat(target.getBoundingClientRect().width.toFixed(2)) ;
    let parentWidth = parseFloat(target.parentElement.getBoundingClientRect().width.toFixed(2)); 
    let targetLeftOffset = target.offsetLeft ;
    right = parentWidth - targetLeftOffset - width ;
    this.line.style.width = `${width}px` ;
    this.line.style.right = `${right}px` ;
}
// function Tabs(wrapper){
//     this.wrapper = wrapper ;
//     this.line = new MovingLine(this.wrapper.querySelector('.line')) ;
//     this.init() ;
// }
// Tabs.prototype.init = function(){
//     this.tabs[0].click() ;
// }
// Tabs.prototype.openTab = function(e){
//     this.line.move(e.currentTarget) ;
// }
export default{
	MovingLine
}


