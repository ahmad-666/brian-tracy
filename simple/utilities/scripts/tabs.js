function Tabs(wrapper){
    this.wrapper = wrapper ;
    this.tabs = this.wrapper.querySelectorAll('.tab') ;
    this.contents = this.wrapper.querySelectorAll('.content') ;
    this.tabs.forEach(tab => {
        tab.addEventListener('click',this.openTab.bind(this)) ;
    });
    this.init() ;
}
Tabs.prototype.init = function(){
    this.tabs[0].click() ;
}
Tabs.prototype.openTab = function(e){
    let targetID = null ;
    this.tabs.forEach(tab => {
        if(tab == e.currentTarget) {
            tab.classList.add('active') ;
            targetID = tab.getAttribute('data-target') ;
        }
        else tab.classList.remove('active') ;
    })
    this.contents.forEach(content => {
        if(content.getAttribute('id') == targetID) content.classList.add('active') ;
        else content.classList.remove('active') ;
    }) ;
}
//document.querySelectorAll('.tabs_wrapper').forEach(tabWrapper => {
//     new Tabs(tabWrapper)
//})
export default{
	Tabs
}
