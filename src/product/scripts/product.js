import productSlider from '../../utilities/scripts/productSlider.js' ;
let product = document.querySelector('#product') ;
let productSliderWrapper = product.querySelector('.infos') ;
new productSlider.ProductSlider(productSliderWrapper,null) ;