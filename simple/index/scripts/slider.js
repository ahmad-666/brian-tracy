//import VerticalSlider from '../../utilities/scripts/verticalSlider.js';
let verticalSliderConfig = {
    autoSlider:true ,
    timer:3000
}
let vs = new VerticalSlider(document.querySelector('#verticalSliderWrapper'),verticalSliderConfig) ;
vs.init() ;