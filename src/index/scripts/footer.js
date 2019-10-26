import form from '../../utilities/scripts/form.js';
let footer = document.querySelector('footer') ;
let searchForm = footer.querySelector('#searchForm') ;
let searchInputs = searchForm.querySelectorAll('.validate') ;
let searchSubmit = searchForm.querySelector('button[type="submit"]') ;
new form.FormValidate(searchForm,searchSubmit,searchInputs,true,null) ;