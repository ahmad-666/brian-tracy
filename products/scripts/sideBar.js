//import form from '../../utilities/scripts/form.js' ;
let sidebar = document.querySelector('#sidebar') ;
let sidebarForm = sidebar.querySelector('form#searchProduct') ;
let sidebarFormInputs = sidebar.querySelectorAll('.validate') ;
let sidebarFormSubmit = sidebar.querySelector('button[type="submit"]') ;
new FormValidate(sidebarForm,sidebarFormSubmit,sidebarFormInputs,true,null)
