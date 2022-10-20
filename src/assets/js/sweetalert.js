var nome = $("#nome");
var email = $("#email");


let validator = false;


if(!nome.val() || nome.val().length < 5 || typeof nome.val == undefined || nome.val == null ){
    new swal({
        icon: 'info',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Continuar'})
    validator = true
 }

 if(!email.val()){
    new swal({
        icon: 'info',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Continuar'})
    validator = true;
 }
 

if(!validator){
    $(document).on('click', '#btn-submit', function(e) {
    e.preventDefault();
    new swal({
        icon: 'success',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Continuar',
    }).then(function () {
        $('#myForm').submit();
    })
});

}
