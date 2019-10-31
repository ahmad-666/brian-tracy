//import form from '../../utilities/scripts/form.js' ;
let loginForm = document.querySelector('form#login') ;
let loginSubmit = loginForm.querySelector('button[type="submit"]') ;
let loginInputs = loginForm.querySelectorAll('.validate') ;
new FormValidate(loginForm,loginSubmit,loginInputs,true,null) ;
loginForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})