$('.select2#state').select2({
    placeholder: 'استان خود را  انتخاب کنید'
});
$('.select2#city').select2({
    placeholder: 'شهر خود را  انتخاب کنید'
});
let wrapper = document.querySelector('.wrapper') ;

$('.select2').on('select2:open', function (e) {
    let inputs = document.querySelectorAll('input[type="search"].select2-search__field') ;
    inputs.forEach(input => {
        input.addEventListener('input',changeAlertMsg) ;
    })
});
function changeAlertMsg(e){
    let alerts = document.querySelectorAll('li[role="alert"]') ;
    alerts.forEach(alert => {
        alert.classList.add('alert') ;
        alert.textContent = "موردی یافت نشد" ;
        
    })
}