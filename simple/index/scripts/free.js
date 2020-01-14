//import form from '../../utilities/scripts/form.js' ;
let freeForm = document.querySelector('form#freeForm') ;
let freeFormSubmit = freeForm.querySelector('button[type="submit"]') ;
let freeFormInputs = freeForm.querySelectorAll('.validate') ;
let freeInstance = new FormValidate(freeForm,freeFormSubmit,freeFormInputs,false,null) ;
freeForm.querySelectorAll('.labelHandler').forEach(label => new LabelHandler(label)) ;
let popupFormElm = document.querySelector('form#popup') ;
let popupCheckbox = popupFormElm.querySelector('input[type="checkbox"]') ;
let popupData = {
    elm: popupFormElm,
    inputs: popupFormElm.querySelectorAll('.validate'),
    submit:popupFormElm.querySelector('button[type="submit"]'),
    send:false,
    modal:null
}
new FormValidate(
    popupData.elm,
    popupData.submit,
    popupData.inputs,
    popupData.send,
    popupData.modal
) ;
popupFormElm.querySelectorAll('.labelHandler').forEach(label => new LabelHandler(label)) ;
popupData.submit.addEventListener('click',e=>{
    if(popupCheckbox.checked) popupFormElm.submit() ;
})
popupFormElm.querySelector('.close').addEventListener('click',e=>{
    popupFormElm.classList.remove('show') ;
})
freeFormSubmit.addEventListener('click',e=>{
    if(freeInstance.validate) popupFormElm.classList.add('show') ;
})