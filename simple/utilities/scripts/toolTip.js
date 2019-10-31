function Tooltip(elm){
    this.elm = elm ;
    this.tooltipText = this.elm.getAttribute('data-tooltip') ;
    this.tooltip = this.elm.querySelector('.tooltip') ;
    this.tooltip.textContent = this.tooltipText ;
}
//document.querySelectorAll('.withTooltip').forEach(tooltip => {
//    new Tooltip(tooltip) ;
//})
export default{
	Tooltip
}