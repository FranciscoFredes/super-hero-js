// Defino expresion regular para validar el input 
const regExNumero = /^[0-9]+$/;
// Funcion para validar que el caracter ingresado sea un numero.
function validarNumero(){
// Defino numeroHeroe para almacenar el valor ingresado por el usuario 
var numeroHeroe = $("#numeroHeroe").val();
// If para que el input valide que se ingresa un numero
if (!regExNumero.test(numeroHeroe) ){
    // alerta para que el usuario sepa que debe ingresa un numero 
    alert("Debe ingresar un numero");
}
else{
    console.log(numeroHeroe);
}}
//  Evento que llama a la funcion validarNumero al hacer click 
$(document).ready(function() {     
    $("button").click(function(){
        validarNumero();
    })
    });