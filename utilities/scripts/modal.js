import util from '../utilities.js' ;
function Modal(triggers,others,needCheck){
    //this.triggers is array and we use array because sometimes multiple things will trigger same
    //modal like comment section(multiple submit button trigger adminApprove modal)
    //others is for others in docHandler
    //this.needCheck is false if we want when we click on trigger always modal will be shown 
    //and this.needCheck is true if we want to check something first and then decide 
    //to show modal or not
    //if this.needCheck is true then we need to call <modal-instance>.openModal(null) after we check
    //some condition  
    this.triggers = triggers ;
    this.others = others ;
    this.needCheck = needCheck ;
    this.modal = document.querySelector(`#${this.triggers[0].getAttribute('data-modal')}`) ;
    this.close = this.modal.querySelector('.close') ;
    if(!this.needCheck) this.triggers.forEach(trigger =>trigger.addEventListener('click',this.openModal.bind(this)));   
}
Modal.prototype.openModal = function(e){
    this.modal.classList.add('show') ;
    this.close.addEventListener('click',this) ;
    setTimeout(()=>document.addEventListener('click',this),10)
}
Modal.prototype.handleEvent = function(e){
    if(e.currentTarget == document){
        let clickedElm = e.target ;
        if(!this.modal.contains(clickedElm)) this.closeModal() ;     
    }
    else if(e.currentTarget  == this.close) this.closeModal() ;    
}
Modal.prototype.closeModal = function(){
    this.modal.classList.remove('show') ;
    this.close.removeEventListener('click',this) ;
    document.removeEventListener('click',this) ;
}
// let adminApproveTriggers = document.querySelectorAll('.modalTrigger[data-modal="adminApprove"]') ;
// let adminApproveModal = new modal.Modal([...adminApproveTriggers],[],false) ;
//OR
// let adminApproveTriggers = document.querySelectorAll('.modalTrigger[data-modal="adminApprove"]') ;
// let adminApproveModal = new modal.Modal([...adminApproveTriggers],[],true) ;
// document.querySelectorAll('form.validate').forEach(myForm => {
//     let submit = myForm.querySelector('button[type="submit"]') ;
//     let inputs = myForm.querySelectorAll('input.validate,textarea.validate') ;
//     new form.FormValidate(myForm,submit,inputs,false,adminApproveModal) ;
// })
export default{
    Modal
}