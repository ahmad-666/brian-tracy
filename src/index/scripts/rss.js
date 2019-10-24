import form from '../../utilities/scripts/form.js' ;
let rssForm = document.querySelector('form#rss');
let rssInputs = rssForm.querySelectorAll('.validate') ;
let rssSubmit = rssForm.querySelector('button[type="submit"]') ;
new form.FormValidate(rssForm,rssSubmit,rssInputs,true,null) ;
rssForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new form.LabelHandler(labelHandler) ;
})