import form from '../../utilities/scripts/form.js' ;
let contactWrapper = document.querySelector('#contactWrapper') ;
let contactForm = contactWrapper.querySelector('form#contact') ;
let contactFormInputs = contactForm.querySelectorAll('.validate') ;
let contactFormSubmit = contactForm.querySelector('button[type="submit"]') ;
contactForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})
new form.FormValidate(contactForm,contactFormSubmit,contactFormInputs,true,null) ;
