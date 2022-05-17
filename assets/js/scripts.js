$(document).ready(function () { //inicio jquey
  $('form').submit(function(event){
    event.preventDefault();

    var heroID = $('#inputID').val(); //doy inicio a la accion del boton
    var validacioninput = /[0-9]/gim; //valido los datos ingresados por el usuario
    let validacionID = validacioninput.test(heroID); //funcion .test para validar
    console.log(heroID);

    if(!validacionID){
      alert('Por favor ingrese sólo números'); //alert si el usuario no digita numeros
    }
    //llamamos a la api
    $.ajax({
      type: 'GET', //GET para traer la api
      url:`https://www.superheroapi.com/api.php/4905856019427443/${heroID}`, //ingreso url api !!importante: agregar api.php
      dataType:'json',
      success:function(data){
        console.log(data.connections);

        //pasamos img api a dom
        $('#heroimagen').html(` <img src=" ${data.image.url}" alt="" width=100% height=auto></img>`);

        //pasamos datos biografia a Dom
        $('#heroinfo').html(`
          <h3 class="py-3"><${data.name}</h3>
         <p class="fw-bold"> Conexiones: <span class="fw-light">${data.connections["group-affiliation"]}. <br> ${data.connections.relatives}. </span></p>
         <p class="fw-bold"> Publicado por:  <span class="fw-light"> ${data.biography.publisher} </span></p>
          <p class="fw-bold"> Primera aparición:  <span class="fw-light"> ${data.biography["first-appearance"]}</span></p>
           <p class="fw-bold"> Altura  <span class="fw-light">  ${data.appearance.height[0]}/${data.appearance.height[1]} </span></p>
            <p class="fw-bold"> Peso:  <span class="fw-light"> ${data.appearance.weight[0]}/${data.appearance.weight[1]} </span></p>
            <p class="fw-bold">  Alias:  <span class="fw-light">  ${data.biography.aliases} </span></p>
          `);

          //escribo variables de tipo chart para grafico
          let dataStats =[
            {y:data.powerstats.intelligence, label:"Inteligencia"},
            {y:data.powerstats.strength, label:"fuerza"},
            {y:data.powerstats.speed, label:"velocidad"},
            {y:data.powerstats.durability, label:"durabilidad"},
            {y:data.powerstats.power, label:"poder"},
            {y:data.powerstats.combat, label:"combate"},
          ];
          console.log(dataStats);
          //genero grafico
          var chart = new CanvasJS.Chart("chartContainer", {
                                  theme: "light2",
                                  exportEnabled: true,
                                  animationEnabled: true,
                                  title:  {
                                      text: `Estadísticas de poder para ${data.name}`,
                                      fontWeight: "bold",
                                      fontSize: 30
                                  },
                                  data: [{
                                      type: "pie",
                                      startAngle: 25,
                                      toolTipContent: "<b>{label}</b>: {y}",
                                      showInLegend: "true",
                                      legendText: "{label}",
                                      indexLabelFontSize: 13,
                                      indexLabel: "{label} - {y}",
                                      dataPoints: dataStats
                                  }]


                });
                chart.render();
            }, //fin success
            error:function(error){
                console.log("API Error "+error);
      }
    }); //finaliza ajax
  }); //finaliza accion boton
});
