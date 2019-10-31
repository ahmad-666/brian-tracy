//copy bellow code to <target>.js file
import form from '../../utilities/scripts/form.js' ;
let forgetPasswordForm = document.querySelector('form#forgetPassword') ;
let forgetPasswordSubmit = forgetPasswordForm.querySelector('button[type="submit"]') ;
let forgetPasswordInputs = forgetPasswordForm.querySelectorAll('.validate') ;
new form.FormValidate(forgetPasswordForm,forgetPasswordSubmit,forgetPasswordInputs,true,null) ;
forgetPasswordForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})