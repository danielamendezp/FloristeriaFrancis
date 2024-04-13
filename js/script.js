$('#enviarBtn').click(function(){
  var nombreCompleto = document.getElementById("nombreCompleto").value;
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var email = document.getElementById("email").value;
  var ingreso = document.getElementById("ingreso").value;
  var genero = document.getElementById("Genero").options[document.getElementById("Genero").selectedIndex].text;
  var gradoAcademico = document.getElementById("gradoAcademico").options[document.getElementById("gradoAcademico").selectedIndex].text;
  var Mensaje = document.getElementById("Mensaje").value;

  var cuerpoCorreo = "Nombre: " + nombreCompleto +
          "\n\nFecha de Nacimiento: " + fechaNacimiento +
          "\n\nEmail: " + email +
          "\n\nRango de Ingreso: " + ingreso +
          "\n\nGénero: " + genero +
          "\n\nGrado Académico: " + gradoAcademico+
          "\n\nMensaje: " + Mensaje ;

  var subject = "Consulta o cotización de " + nombreCompleto;
  var destinatario = 'mendez.daniela1199@gmail.com';

  var mailtoLink = 'mailto:' + destinatario + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(cuerpoCorreo);

  window.location.href = mailtoLink;

});

var jsonUrl = $("#json-gallery").data("json-url");
var jsonLoaded = false; 

function jsonGallery(jsonUrl) {
    var galleryContainer = $("#json-gallery");

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            if (!jsonLoaded) { 
                var tempImages = [];
                data.forEach(function(image) {
                    if (!tempImages.some(img => img.url === image.url)) {
                        tempImages.push(image);
                    }
                });

                tempImages.forEach(function(image) {
                    var col = $("<div>").addClass("gallery-item"); 
                    var img = $("<img>").addClass("img-fluid");
                    img.attr("src", "img/" + image.url);
                    img.attr("alt", image.alt);

                    col.append(img);
                    galleryContainer.append(col);
                });

                jsonLoaded = true; 
            }
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
}

document.addEventListener("DOMContentLoaded", function() {
    jsonGallery(jsonUrl);
});


function iniciarMap() {
  // Obtener la ubicación actual del usuario
  navigator.geolocation.getCurrentPosition(function(position) {
      var ubicacionActual = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };

      // Coordenadas del punto de negocio (ejemplo)
      var puntoNegocio = { lat: 10.0952946, lng: -84.4712706 }; 
      
      // Crear un nuevo mapa en el div #map
      /*Esta es una llamada al constructor de la clase
       Map del API de Google Maps JavaScript. 
       Crea una nueva instancia de un objeto de mapa de Google Maps.*/
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12, // Nivel de zoom inicial
          center: ubicacionActual // Centrar el mapa en la ubicación actual
      });

      // Crear marcador en la ubicación actual
      var marker = new google.maps.Marker({
          position: ubicacionActual,
          map: map, // Mapa donde se colocará el marcador
          title: 'Tu ubicación actual' // Título del marcador
      });

      // Crear marcador en el punto de negocio
      var negocioMarker = new google.maps.Marker({
          position: puntoNegocio,
          map: map,
          title: 'Punto de negocio' // Título del marcador
      });

      // Calcular ruta entre la ubicación actual y el punto de negocio

      /* El DirectionsService se utiliza para calcular rutas entre dos o más ubicaciones.
       Proporciona métodos para enviar solicitudes de rutas al servidor de Google 
       y recibir respuestas con la ruta calculada.*/
      var directionsService = new google.maps.DirectionsService();

      /**El DirectionsRenderer se utiliza para visualizar las rutas calculadas en el mapa.
       *  Es responsable de mostrar la línea de la ruta 
       * y los marcadores asociados en el mapa. */
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      var request = {
          origin: ubicacionActual,
          destination: puntoNegocio,
          travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
          if (status == 'OK') {
              directionsRenderer.setDirections(result);
              // Calcular la distancia entre los puntos

              var distancia = result.routes[0].legs[0].distance.text;
              document.getElementById('distance').textContent = distancia;
              console.log('Distancia: ' + distancia);
          } else {
              window.alert('No se pudo calcular la ruta: ' + status);
          }
      });
  });
}


