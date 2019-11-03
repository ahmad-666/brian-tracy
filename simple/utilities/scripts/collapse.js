function Collapse(wrapper,others){
    this.wrapper = wrapper ;
    this.others = others ;
    this.trigger = this.wrapper.querySelector('.collapseTrigger') ;
    this.icon = this.wrapper.querySelector('.collapseIcon') ;
    this.targetHeight = null;
    this.collapse =this.wrapper.querySelector('.collapse') ;
    this.collapse.classList.add('close') ;
    this.trigger.addEventListener('click',this.toggleCollapse.bind(this)) ;
}
Collapse.prototype.toggleCollapse = function(e){
    this.targetHeight = this.collapse.scrollHeight;
    this.collapse.classList.add('addTransition') ;
    this.collapse.classList.toggle('open') ;
    if(this.collapse.classList.contains('open')) {
        this.collapse.style.height = `${this.targetHeight}px` ;
        setTimeout(()=>this.collapse.style.height = `auto`,150)
        this.others.forEach(other=>{
            let collapse = other.querySelector('.collapse') ;
            collapse.classList.add('addTransition')
            collapse.style.height = `0px` ;
            collapse.classList.remove('open');
            if(this.icon){
                let icon = other.querySelector('.collapseIcon');
                icon.classList.add('fa-plus') ;
                icon.classList.remove('fa-times') ;
            }    
        });        
    }
    else {
        this.collapse.style.height = `${this.targetHeight}px` ;
        setTimeout(()=>this.collapse.style.height = `0px`,10) ;
    }
    if(this.icon){
        this.icon.classList.toggle('fa-plus') ;
        this.icon.classList.toggle('fa-times') ;
    }
}
   
//document.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
//    all = [...all] ;
//    let others = all.filter(elm =>elm!=withCollapse);
//    let font = new FontFaceObserver('iranSans');
//    font.load().then(()=>new Collapse(withCollapse,others));
//})
// export default{
// 	Collapse
// }