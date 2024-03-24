$(function() {
    var jsonUrl = $("#json-gallery").data("json-url");
    jsonGallery(jsonUrl);
  
    function jsonGallery(jsonUrl) {
        var galleryContainer = $("#json-gallery");
  
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
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
            })
            .catch(error => console.error("Error al cargar el JSON:", error));
    }
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