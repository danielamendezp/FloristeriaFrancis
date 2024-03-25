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
                    img.attr("src", image.url);
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
  var coord = { lat: 10.0957067, lng: -84.4707245 };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: coord
  });
  var marker = new google.maps.Marker({
      position: coord,
      map: map
  });
}