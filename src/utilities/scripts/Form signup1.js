//copy bellow code to <target>.js file
import form from '../../utilities/scripts/form.js' ;
let signupForm = document.querySelector('form#signup') ;
let signupSubmit = signupForm.querySelector('button[type="submit"]') ;
let signupInputs = signupForm.querySelectorAll('.validate') ;
new form.FormValidate(signupForm,signupSubmit,signupInputs,true,null) ;
signupForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})