import util from '../utilities.js' ;
//form validation------------------------------
//form validation------------------------------
//form validation------------------------------
function FormValidate(form,submit,inputs,send,modal){
	//even if we dont want to send form we should always set 'submit' because we need to click on something to start validation
    this.form = form ;
    this.inputs = inputs ;
    this.submit = submit ;
    this.send = send ;
    this.modal = modal ;
    //this.modalTrigger = modalTrigger ;
    this.submit.addEventListener('click',this.formSubmit.bind(this)) ;
    this.validate = false ;
}
FormValidate.prototype.formSubmit = function(e){
    e.preventDefault() ;
    if(this.allValidate())  {
        this.validate = true ;
        if(this.send) this.form.submit() ;
        else {
            if(this.modal) this.modal.openModal(null) ;        
        }
    }
}
FormValidate.prototype.allValidate = function(){
    let validate = true ;
    for(let i=0 ; i<this.inputs.length ; i++){
        let input = this.inputs[i] ;
        if(!this.validateInput(input)){
            this.validate = false ;
            validate = false ;
            break ;
        }
    }
    return validate ;
}
FormValidate.prototype.validateInput = function(input){   
    let msg = input.parentElement.querySelector('.msg') ;
    input.msg = msg ;
    if(input.readOnly){
        if(input.value!=''){
            this.isValid(input) ;
            return true ;
        }
        else this.isNotValid(input) ;      
    }
    else{
        if(input.getAttribute('id')=='passwordRepeat'){//password repeat handler
            let password = this.form.querySelector('input[type="password"]#password') ;
            input.password = password ;
            if(password.value == input.value){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11 && input.value.startsWith('09')){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
        else{
            if(input.checkValidity()){
                this.isValid(input) ;
                input.removeEventListener('input',this) ;     
                return true ;
            }
            else{
                this.isNotValid(input) ;
                input.addEventListener('input',this) ;
            }
        }
    }  
}
FormValidate.prototype.isValid = function(input){
    if(input.msg) input.msg.classList.remove('show') ;
    input.classList.remove('error') ;  
}
FormValidate.prototype.isNotValid = function(input){
    if(input.msg) {
        input.msg.classList.add('show') ; 
        //with bellow code if we have error message then when we click outside of 
        //inputWrapper that error message will disappear
        document.input = input ;
        document.msg = input.msg ;
        document.submit = this.submit ;
        document.addEventListener('click',this) ;
    } 
    input.classList.add('error') ;   
}
FormValidate.prototype.handleEvent = function(e){
    if(e.type === 'input'){
        let input = e.currentTarget ;
        if(input.getAttribute('id')=='passwordRepeat'){
            if(input.password.value == input.value) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else if(input.getAttribute('id')=='mobile'){
            if(input.value.length == 11  && input.value.startsWith('09')) this.isValid(input) ;     
            else this.isNotValid(input) ;        
        }
        else{
            if(input.checkValidity()) this.isValid(input) ;       
            else this.isNotValid(input) ;     
        }       
    }
    if(e.currentTarget == document){
        e.stopPropagation() ;
        let input = e.currentTarget.input ;
        let msg = e.currentTarget.msg ;
        let submit = e.currentTarget.submit ;
        let clickedElm = e.target ;
        if(!input.parentElement.contains(clickedElm) && !submit.contains(clickedElm)){
            msg.classList.remove('show') ;
            document.input = null ;
            document.msg = null ;
            document.submit = null ;
            document.removeEventListener('click',this) ;
        }
    }
}
//select/option------------------------------------------
//select/option------------------------------------------
//select/option------------------------------------------
function Select(wrapper,otherSelects){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input:not([type="hidden"])') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]')
    this.label = this.wrapper.querySelector('label') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ; 
    this.otherSelects = otherSelects ;
    this.input.addEventListener('click',this.openMenu.bind(this)) ;
}
Select.prototype.openMenu = function(e){
    e.stopPropagation() ;
    this.otherSelects.forEach(select => {
        if(select != this.wrapper) select.querySelector('ul').classList.remove('show') ;
    })
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    }) ;
    document.addEventListener('click',this) ;
}
Select.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    if(e.currentTarget != document){ //click on one the 'lis'
        let li = e.currentTarget ;
        this.ul.classList.remove('show') ;
        this.input.value = li.textContent ;
        this.hiddenInput.value = li.getAttribute('data-value') ;
        this.input.classList.remove('error') ;
        this.label.classList.add('top') ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        document.removeEventListener('click',this) ;
    }
    else{//click on document     
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            this.ul.classList.remove('show');
            this.lis.forEach(li => {
                li.removeEventListener('click',this) ;
            })
            document.removeEventListener('click',this) ;
        }
    }
    
}
//selectSearch/option------------------------------------------
//selectSearch/option------------------------------------------
//selectSearch/option------------------------------------------
function SelectSearch(wrapper,otherSelects){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input:not([type="hidden"])') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]')
    this.label = this.wrapper.querySelector('label') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.lis = this.ul.querySelectorAll('li') ; 
    this.initLis = [...this.lis] ;
    this.otherSelects = otherSelects ;
    this.input.addEventListener('click',this.openMenu.bind(this)) ;
    this.input.addEventListener('input',this.search.bind(this)) ;
    this.input.addEventListener('blur',this.loseFocus.bind(this)) ;
}
SelectSearch.prototype.openMenu = function(e){
    e.stopPropagation() ;
    this.createList(this.initLis) ;
    this.otherSelects.forEach(select => {
        if(select != this.wrapper) select.querySelector('ul').classList.remove('show') ;
    })
    this.ul.classList.add('show') ;
    this.lis.forEach(li => {
        li.addEventListener('click',this) ;
    }) ;
    document.addEventListener('click',this) ;
}
SelectSearch.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    if(e.currentTarget != document){ //click on one the 'lis'
        let li = e.currentTarget ;
        this.ul.classList.remove('show') ;
        this.input.value = li.textContent ;
        this.hiddenInput.value = li.getAttribute('data-value') ;
        this.input.classList.remove('error') ;
        this.label.classList.add('top') ;
        this.lis.forEach(li => {
            li.removeEventListener('click',this) ;
        })
        document.removeEventListener('click',this) ;
    }
    else{//click on document     
        let clickedElm = e.target ;
        if(!this.ul.contains(clickedElm)){
            this.ul.classList.remove('show');
            this.lis.forEach(li => {
                li.removeEventListener('click',this) ;
            })
            document.removeEventListener('click',this) ;
        }
    }
    
}
SelectSearch.prototype.search = function(e){
   let val = this.input.value ;
   //if we enter anything rather than white-space
    //if we have any result we enter this block
   if(val.match(/\S{1,}/gi)){      
        this.lis = this.initLis.filter(li => {
            if(li.textContent.startsWith(val)) return li ;
        })      
    }
    //if we don't have any result we enter this block
    else this.lis = [...this.initLis] ;  
    this.createList(this.lis) ;
}
SelectSearch.prototype.loseFocus = function(e){
    let val = this.input.value ;
    let find = false ;
    for(let i=0 ; i<this.lis.length ; i++){
        let li = this.lis[i] ;
        if(li.textContent == val){
            find = true ;
            break ;
        }
    }
    if(!find) {
        this.input.value = '' ;  
        this.label.classList.remove('top') ;
    } 
    else this.label.classList.add('top') ;  
}
SelectSearch.prototype.createList = function(lis){
    this.ul.innerHTML = '' ;
    lis.forEach(li => {
        this.ul.appendChild(li) ;
    })
}
//label handlers-------------------------------------
//label handlers-------------------------------------
//label handlers-------------------------------------
function LabelHandler(input){
    this.input = input ;
    this.label = this.input.parentElement.querySelector('label') ;
    this.input.addEventListener('blur',this.focusLost.bind(this)) ;
}
LabelHandler.prototype.focusLost = function(e){
    if(this.input.value.length!=0) this.label.classList.add('top');
    else this.label.classList.remove('top');
}
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
//just number on input[type="number"]---------------
function NumberInput(input){
    this.input = input ;
    this.input.addEventListener('keypress',this.justNumber.bind(this)) ;
}
NumberInput.prototype.justNumber = function(e){
    if(!e.key.match(/\d/)) e.preventDefault() ;
}
//input with increase/decrease---------------------
//input with increase/decrease---------------------
//input with increase/decrease---------------------
function NumberHandler(wrapper){
    this.wrapper = wrapper ;
    this.increase = this.wrapper.querySelector('.increase') ;
    this.decrease = this.wrapper.querySelector('.decrease') ;
    this.input = this.wrapper.querySelector('input') ;
    this.max = parseFloat(this.input.getAttribute('data-max')) ;
    this.min = parseFloat(this.input.getAttribute('data-min')) ;
    this.step = parseFloat(this.input.getAttribute('data-step')) ;
    this.increase.addEventListener('click',this.add.bind(this)) ;
    this.decrease.addEventListener('click',this.minus.bind(this)) ;
}
NumberHandler.prototype.add = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val+this.step<=this.max?val+this.step:val ;
}
NumberHandler.prototype.minus = function(e){
    let val = parseFloat(this.input.value) ;
    this.input.value = val-this.step>=this.min?val-this.step:val ;
}
//textarea autoExpand-------------------------
//textarea autoExpand-------------------------
//textarea autoExpand-------------------------
function AutoExpand(textarea,initHeight,maxHeight){
    this.textarea = textarea ;
    this.initHeight = initHeight ;
    this.maxHeight = maxHeight ;
    this.textarea.style.height = this.initHeight ;
    this.textarea.style.maxHeight = this.maxHeight ;
    this.textarea.addEventListener('input',this.setHeight.bind(this)) ;
}
AutoExpand.prototype.setHeight = function(e){
    this.textarea.style.height = 'auto' ;
    if(this.textarea.value != ''){
        let height = this.textarea.scrollHeight + 
            parseFloat(window.getComputedStyle(this.textarea,null).getPropertyValue('border-bottom')) ;        
        height = parseFloat(util.pxToEm(height,this.textarea)) ;
        if(height>parseFloat(this.maxHeight)) this.textarea.style.overflow = 'auto' ;
        else this.textarea.style.overflow = 'hidden' ;
        this.textarea.style.height = `${height}em` ;
    }
    else {
        this.textarea.style.height = this.initHeight ;
        this.textarea.style.overflow = 'hidden' ;
    }
}
//toggle ------------------------------------
//toggle ------------------------------------
//toggle ------------------------------------
function Toggle(wrapper){
    this.wrapper = wrapper ;
    this.switch = this.wrapper.querySelector('.switch') ;
    this.circle = this.switch.querySelector('.circle') ;
    this.rightText = this.wrapper.querySelector('.toggleText.right') ;
    this.leftText = this.wrapper.querySelector('.toggleText.left') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]') ;
    this.switch.addEventListener('click',this.toggle.bind(this)) ;
    this.init() ;
}
Toggle.prototype.init = function(){
    if(this.rightText.classList.contains('active')) this.hiddenInput.value = this.rightText.getAttribute('data-value') ;
    else this.hiddenInput.value = this.leftText.getAttribute('data-value') ;
}
Toggle.prototype.toggle = function(e){
    this.circle.classList.toggle('right') ;
    this.circle.classList.toggle('left') ;
    this.rightText.classList.toggle('active') ;
    this.leftText.classList.toggle('active') ;
    if(this.rightText.classList.contains('active')) this.hiddenInput.value = this.rightText.getAttribute('data-value') ;
    else this.hiddenInput.value = this.leftText.getAttribute('data-value') ;
}
//ranger ------------------------------------
//ranger ------------------------------------
//ranger ------------------------------------
function Ranger(wrapper){
    this.wrapper = wrapper;
    this.ranger = this.wrapper.querySelector('.ranger') ;
    this.min = parseFloat(this.ranger.getAttribute('data-min')) ;
    this.max = parseFloat(this.ranger.getAttribute('data-max')) ;
    this.step = parseFloat(this.ranger.getAttribute('data-step')) ;
    this.minHidden = this.wrapper.querySelector('input[type="hidden"].min') ;
    this.maxHidden = this.wrapper.querySelector('input[type="hidden"].max') ;
    this.text = this.wrapper.querySelector('.text') ;
    this.createRanger() ;
    this.init() ;
}
Ranger.prototype.init = function(){
    this.ranger.style.border = "none" ;
    let handlers = this.ranger.querySelectorAll('.noUi-handle') ;
    handlers.forEach((handler,i) => {
        handler.classList.add('circle') ;
        switch(i){
            case 0 :
                handler.classList.add('right') ;
                break ;
            case 1 :
                handler.classList.add('left') ;
                break ;
        }
        
    })
    this.minHidden.value = this.min ;
    this.maxHidden.value = this.max ;   
    this.text.textContent = `${this.min}تومان - ${this.max}تومان` ;
}
Ranger.prototype.createRanger = function(){
    noUiSlider.create(this.ranger,{
        orientation: 'horizontal' ,
        direction: 'rtl',
        animate: true,
        animationDuration: 300,
        behaviour: 'tap', 
        margin: this.step ,
        range: {
            'min': [this.min],
            'max': [this.max]
        },
        start: [this.min,this.max],
        connect: [false,true,false],
        step: this.step,
        tooltips: [
            wNumb({
                decimals: 0, 
                thousand: '.', 
                // suffix: ' تومان' 
            }) ,
            wNumb({
                decimals: 0, 
                thousand: '.', 
                // suffix: ' تومان' 
            })      
        ] ,
        format: wNumb({ 
            decimals: 0, 
            thousand: '' 
        })
    });
    this.ranger.noUiSlider.on('update',()=>{
        this.minHidden.value = this.ranger.noUiSlider.get()[0];
        this.maxHidden.value = this.ranger.noUiSlider.get()[1];   
        this.text.textContent = `${this.minHidden.value}تومان - ${this.maxHidden.value}تومان` ;
    })
}
//Timer ------------------------------------
//Timer ------------------------------------
//Timer ------------------------------------
function Timer(min,sec,timerElm){
    this.initMin = min ;
    this.initSec = sec ;
    this.min = min ;
    this.sec = sec ;
    this.timerElm = timerElm ;
    if(this.timerElm) {
        this.minElm = this.timerElm.querySelector('.min') ;
        this.secElm = this.timerElm.querySelector('.sec') ;
        this.validateTime() ;
    }
    this.clearTimer = setInterval(this.start.bind(this),1000) ;
}
Timer.prototype.start = function(){
    this.min = parseInt(this.min) ;
    this.sec = parseInt(this.sec) ;
    if(this.sec-1>=0) this.sec-- ;   
    else{
        this.sec = 59 ;
        if(this.min-1>=0) this.min-- ;      
        else{
            this.sec = '00' ;
            this.min = '00' ;
            //timer ends here and we can call cb function 
            //to alert ending of timer
            clearInterval(this.clearTimer) ;
            return ;
        }
    }
    this.validateTime() ;
    //for add '0' if min/sec gets bellow 10
    //for set timerElm
}
Timer.prototype.validateTime = function(){
    if(this.min<10) this.min = `0${this.min}` ;
    if(this.sec<10) this.sec = `0${this.sec}` ;
    if(this.timerElm){
        this.minElm.textContent = this.min ;
        this.secElm.textContent = this.sec ;
    }
}
Timer.prototype.resetTimer = function(){
    this.min = this.initMin ;
    this.sec = this.initSec ;
    this.validateTime() ;
    clearInterval(this.clearTimer) ;
    this.clearTimer = setInterval(this.start.bind(this),1000) ;
}
//GenerateCode(timer,resend,validate) --------------------------
//GenerateCode(timer,resend,validate) --------------------------
//GenerateCode(timer,resend,validate) --------------------------
let getRandInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min) ;
function getAlphaNumArray(){
    let num = '0123456789' ;
    let alphaLow = 'abcdefghijklmnopqrstuvwxyz' ;
    let alphaUp = alphaLow.toUpperCase() ;
    let special = `!@#$%^&*?`
    let allStr = num+alphaLow+alphaUp+special ;
    return allStr.split('') ;
}
function RandomCode(wrapper,digit,min,sec,timerElm){
    this.wrapper = wrapper ;
    this.digit = digit ;
    this.min = min ;
    this.sec = sec ;
    this.timerElm = timerElm ;
    this.input = this.wrapper.querySelector('input#code') ;
    this.timer = new Timer(this.min,this.sec,this.timerElm) ;
    this.resend = this.wrapper.querySelector('#resendCode') ;
    this.submit = this.wrapper.parentElement.querySelector('#validateCode') ;
    this.code = '' ;
    this.valid = false ;
    this.alphaNumArr = getAlphaNumArray() ;
    this.msg = this.wrapper.querySelector('.msg') ;
    this.generateCode() ;
    this.submit.addEventListener('click',this.validateCode.bind(this)) ;
    this.resend.addEventListener('click',this.resendCode.bind(this)) ;
}
RandomCode.prototype.generateCode = function(){
    this.code = '' ;
    for(let i=0 ; i<this.digit ; i++){
        this.code+= this.alphaNumArr[getRandInt(0,this.alphaNumArr.length-1)];
    }
    console.log(this.code) ;
}
RandomCode.prototype.validateCode = function(e){
    if(this.code == this.input.value && (this.timer.min!='00'||this.timer.sec!='00')) {
        console.log('validate') ;
        this.msg.classList.remove('show') ;
        this.valid = true ;
        return true ;
    }
    else {
        console.log('not valid') ;
        this.msg.classList.add('show') ;
        this.valid = false ;
    }
}
RandomCode.prototype.resendCode = function(e){    
    this.timer.resetTimer() ;
    this.generateCode() ;
}
//StarScore ----------------------------------------
//StarScore ----------------------------------------
//StarScore ----------------------------------------
function StarScore(wrapper){
    this.wrapper = wrapper ;
    this.starsWrapper = this.wrapper.querySelector('.stars') ;
    this.stars = this.starsWrapper.querySelectorAll('i') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]') ;
    this.submit = this.wrapper.querySelector('button') ;
    this.score = '' ;
    this.starsWrapper.addEventListener('mouseout',this) ;
    this.stars.forEach(star => star.addEventListener('mouseenter',this));
    this.stars.forEach(star=>star.addEventListener('click',this.setHiddenInput.bind(this)));
    //this.submit.addEventListener('click',this.sendScore.bind(this)) ;
}
StarScore.prototype.handleEvent = function(e){
    if(e.type == 'mouseenter'){//for each star
        this.score = e.currentTarget.getAttribute('data-score') ;
        this.stars.forEach((star,i)=>{
            if(i>this.score) star.classList.remove('active') ;
            else star.classList.add('active') ;
        })
    }
    else if(e.type == 'mouseout'){//for starsWrapper
        this.score = '' ;
        this.stars.forEach(star => {
            star.classList.remove('active') ;
        })
        this.hiddenInput.value = this.score ;
    }  
}
StarScore.prototype.setHiddenInput = function(e){
    this.starsWrapper.removeEventListener('mouseout',this) ;
    this.stars.forEach(star => star.removeEventListener('mouseenter',this));
    this.score = e.currentTarget.getAttribute('data-score') ;
    this.stars.forEach((star,i) => {
        if(i<=this.score) star.classList.add('active') ;
        else star.classList.remove('active') ;
    })
    this.hiddenInput.value = parseInt(this.score) + 1;
}
//Seperate each 3number ----------------------------
//Seperate each 3number ----------------------------
//Seperate each 3number ----------------------------
function Separate3Num(wrapper,separator){
    this.wrapper = wrapper ;
    this.separator = separator ;
    if(this.wrapper.classList.contains('inputWrapper')){//we are goint to add input event on input
        this.input = this.wrapper.querySelector('input') ;
        this.input.addEventListener('keypress',this.justNum.bind(this)) ;
        this.input.addEventListener('input',this.checkSeparator.bind(this)) ;
    }
    else{//we are goint to format textContent of <p> or <span> , ...
        this.wrapper.textContent = this.format(this.wrapper.textContent) ;
    }
}
Separate3Num.prototype.justNum = function(e){
    if(!e.key.match(/\d/)) e.preventDefault() ;
}
Separate3Num.prototype.checkSeparator = function(e){
    let tempVal = this.input.value.replace(/,/g,'') ;
    this.input.value = this.format(tempVal) ;
}
Separate3Num.prototype.format = function(num){
    //input is integer or float number and output is string(input number with separator)
    let str = num.toString() ;
    let res = null ;
    let addSeparate = (input)=>{
        let arr = input.split('') ;//covert number to array
        if(arr.length<=3) return input ;    
        else{
            let howMany = (arr.length%3==0)?(Math.floor(arr.length/3-1)):Math.floor((arr.length/3)); //how many ',' needed 
            let offset = 0 ;
            for(let i=0;i<howMany;i++){
                arr.splice(i*3+3+offset,0,this.separator) ;
                offset++ ;
            }
            return arr.join('') ;
        }      
    }
    if(!str.includes('.')) res = addSeparate(str) ; //for integer numbers
    else{//for float numbers
        let dotPos = str.indexOf('.') ; 
        let integerPart = str.slice(0,dotPos);
        let floatPart = str.slice(dotPos+1,str.length);
        integerPart = addSeparate(integerPart) ;
        res = `${integerPart}.${floatPart}` ;
    }
    return res ;
}
//searchList ---------------------------------------------
//searchList ---------------------------------------------
//searchList ---------------------------------------------
function SearchList(wrapper){
    this.wrapper = wrapper ;
    this.input = this.wrapper.querySelector('input[type="text"]') ;
    this.hiddenInput = this.wrapper.querySelector('input[type="hidden"]') ;
    this.ul = this.wrapper.querySelector('ul') ;
    this.initLis = this.ul.querySelectorAll('li') ;
    this.currLis = [] ;
    this.ul.innerHTML = '' ;
    this.label = this.wrapper.querySelector('label') ;
    this.input.addEventListener('input',this.search.bind(this)) ;
    document.addEventListener('click',this.closeSearch.bind(this)) ;
}
SearchList.prototype.closeSearch = function(e){
    e.stopPropagation() ;
    let clickedElm = e.target ;
    if(!this.ul.contains(clickedElm)) this.ul.classList.remove('show') ;
}
SearchList.prototype.search = function(e){
    this.ul.innerHTML = '' ;
    this.currLis = [] ;
    this.currLis.forEach(li => {
        li.removeEventListener('click',this) ;
    })
    let val = e.currentTarget.value ;
    this.initLis.forEach(li => {
        if(li.textContent.startsWith(val)) this.currLis.push(li) ;
    })
    if(this.currLis.length>0){
        this.currLis.forEach(li => {
            this.ul.appendChild(li) ;
            li.addEventListener('click',this) ;
        })
    }
    else{
        let li = document.createElement('li') ;
        li.setAttribute('data-search','none') ;
        li.textContent = 'هیچ موردی یافت نشد' ;
        this.ul.appendChild(li) ;
    }
    this.ul.classList.add('show') ;
}
SearchList.prototype.handleEvent = function(e){
    e.stopPropagation() ;
    let li = e.currentTarget ;
    if(li.nodeName.toLowerCase() == 'li'){//we click on lis
        this.input.value = li.textContent ;
        this.hiddenInput.value = li.getAttribute('data-search') ;
        this.ul.classList.remove('show') ;
        this.label.classList.add('top') ;
    }
}
//form validation--------------------------------
//form validation--------------------------------
//form validation--------------------------------
// let form = document.querySelector('form.validate') ;
// let formSubmit = form.querySelector('button.final') ;
// let inputs = form.querySelectorAll('.validate') ;
// new FormValidate(form,formSubmit,inputs,true,null) ;
//OR
// let form = document.querySelector('form.validate') ;
// let formSubmit = form.querySelector('button.final') ;
// let inputs = form.querySelectorAll('.validate') ;
// new FormValidate(form,formSubmit,inputs,false,<instance-of-Modal>) ;
// //Select--------------------------------
// let selects = document.querySelectorAll('.inputWrapper.select') ;
// selects = [...selects] ;
// selects.forEach(select => {
//     let otherSelects = selects.filter(other => {
//         return (select!=other)
//     }) 
//     new Select(select,otherSelects) ;
// })
// //selectSearchs--------------------------------
// let selectSearchs = document.querySelectorAll('.inputWrapper.selectSearch') ;
// selectSearchs = [...selectSearchs] ;
// selectSearchs.forEach(selectSearch => {
//     let otherSelectSearchs = selectSearchs.filter(other => {
//         return (selectSearch!=other)
//     }) 
//     new SelectSearch(selectSearch,otherSelectSearchs) ;
// })
// //LabelHandler--------------------------------
// document.querySelectorAll('.labelHandler').forEach(labelHandler => {
//     new LabelHandler(labelHandler) ;
// })
// //NumberInput--------------------------------
// document.querySelectorAll('input[type="number"]').forEach(number => {
//     new NumberInput(number) ;
// })
// //NumberHandler--------------------------------
// document.querySelectorAll('.inputWrapper.numberHandler').forEach(numberHandler => {
//     new NumberHandler(numberHandler) ;
// })
// //AutoExpand--------------------------------
// document.querySelectorAll('textarea.autoExpand').forEach(autoExpand => {
//     new AutoExpand(textarea,'2.6em','15em') ;
// })
// //Toggle--------------------------------
// document.querySelectorAll('.inputWrapper.toggle').forEach(toggle => {
//     new Toggle(toggle) ;
// })
// //Ranger--------------------------------
// document.querySelectorAll('.inputWrapper.range').forEach(ranger => {
//     new Ranger(ranger) ;
// });
// //Timer--------------------------------
// //RandomCode--------------------------------
// let codeWrapper = form.querySelector('.inputWrapper.text.code');
// new RandomCode(codeWrapper,6,0,5,codeWrapper.querySelector('#timer')) ;
// //StarScore--------------------------------
// document.querySelectorAll('.inputWrapper.star').forEach(star => {
//     new StarScore(star) ;
// })
// //Separate3Num--------------------------------
// document.querySelectorAll('.separate3Num').forEach(separate3Num=>{
//     new Separate3Num(separate3Num,',') ;
// })
// //SearchList--------------------------------
// document.querySelectorAll('.inputWrapper.searchList').forEach(searchList => {
//     new SearchList(searchList) ;
// })
//exports--------------------------------
//exports--------------------------------
//exports--------------------------------
export default{
	FormValidate,
	Select,
	SelectSearch,
	LabelHandler,
	NumberInput,
	NumberHandler,
	AutoExpand,
	Toggle,
	Ranger,
	Timer,
	getRandInt,
	getAlphaNumArray,
	RandomCode,
	StarScore,
	Separate3Num,
	SearchList
}