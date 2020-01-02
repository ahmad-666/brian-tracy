import productSlider from '../../utilities/scripts/productSlider.js' ;
import SliderCarousel from '../../utilities/scripts/sliderCarousel.js' ;
let product = document.querySelector('#product') ;
let productSliderWrapper = product.querySelector('.infos') ;
new productSlider.ProductSlider(productSliderWrapper,null) ;
new SliderCarousel.SliderCarousel(document.querySelector('.sliderCarousel')) ;
