//import form from '../../utilities/scripts/form.js' ;
let freeForm = document.querySelector('form#freeForm') ;
let freeFormSubmit = freeForm.querySelector('button[type="submit"]') ;
let freeFormInputs = freeForm.querySelectorAll('.validate') ;
new FormValidate(freeForm,freeFormSubmit,freeFormInputs,true,null) ;
freeForm.querySelectorAll('.labelHandler').forEach(label => new LabelHandler(label)) ;