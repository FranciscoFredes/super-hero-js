// Defino expresion regular para validar el input 
const regExNumero = /^[0-9]+$/;
// Defino url de API
const urlApi = "https://superheroapi.com/api.php/";
// Defino el access token para usarlo en la URL
const accessToken = 10230258684227482;


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
    return numeroHeroe;
}}
function obtenerHeroes(numeroHeroe){
    $.ajax({
                    type: "GET",
                    url: `${urlApi}${accessToken}/${numeroHeroe}`,
                    dataType: "json",
                    // funcion para almacenar los datos e inyecar los datos en la card de bootsrap 
                    success: function(datosHeroe){
                        // Definiendo variables para almacenar los datos que nos devuelve la API                        
                        var powerstats = datosHeroe.powerstats;
                        var imageUrl = datosHeroe.image.url;
                        var heroName = datosHeroe.name;
                        var heroHeight = datosHeroe.appearance.height;
                        var heroWeight = datosHeroe.appearance.weight;
                        var heroPublisher = datosHeroe.biography.publisher;                        
                        var heroWork = datosHeroe.work.occupation;
                        var heroRelatives = datosHeroe.connections.relatives;
                        var heroAlliance = datosHeroe.connections["group-affiliation"];
                        var heroFirstAppearance = datosHeroe.biography["first-appearance"];
                        console.log(datosHeroe);
                        var dataPoints = [];  
                        // Inyectando datos en la card                                        
                        $("#hero-name").text(heroName); 
                        $("#hero-image").attr("src", imageUrl);  
                        $("#hero-height").text(heroHeight);
                        $("#hero-weight").text(heroWeight);  
                        $("#hero-publisher").text(heroPublisher);
                        $("#hero-work").text(heroWork);
                        $("#hero-contacts").text(heroRelatives);
                        $("#hero-alliance").text(heroAlliance);
                        $("#hero-first-appearance").text(heroFirstAppearance);
                        // funcion para inyectar los datos en canvas Js 
                        for (var key in powerstats) {
                        if (powerstats.hasOwnProperty(key)) {
                        dataPoints.push({label :key, y: parseInt(powerstats[key])}); 
                            }         
                        }                                                                                  
                    
                    chart.options.data[0].dataPoints = dataPoints;
                    chart.render(); 
                },
                    error: function(error){
                        console.log(error);                       
                    },
                })
            }         

            var chart = new CanvasJS.Chart("chartContainer", {
                theme: "dark1",
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: ` Powerstats del heroe` 
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: true,
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [] 
                }]
            });

//  Evento que llama a la funcion validarNumero al hacer click 
$(document).ready(function() {     
    $("button").click(function(){
        var numeroHeroeValidado = validarNumero();
        if (numeroHeroeValidado !== null) {
            obtenerHeroes(numeroHeroeValidado);
        }            
    })
    });