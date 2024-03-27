function iniciarMap() {
    var coord = { lat: 10.0952946, lng: -84.4712706 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}

function sendEmail() {
    Email.send({
      Host: "smtp.elasticemail.com",
      Port: 2525, 
      Username: document.getElementById("email").value,
      Password: "D57375790DC548C725DAA2F64FF3D023CA1A",
      To: 'mendez.daniela1199@gmail.com',
      From: document.getElementById("email").value, 
      Subject: "Consulta o cotización de " + document.getElementById("nombreCompleto").value,
      Body: "Nombre: " + document.getElementById("nombreCompleto").value +
        "<br>Fecha de Nacimiento: " + document.getElementById("fechaNacimiento").value +
        "<br>Email: " + document.getElementById("email").value +
        "<br>Rango de Ingreso: " + document.getElementById("ingreso").value +
        "<br>Género: " + document.getElementById("genero").value +
        "<br>Grado Académico: " + document.getElementById("gradoAcademico").value
    }).then(
      message => {
        if (message === 'OK') {
          alert("Correo enviado correctamente");
        } else {
          console.error(message);
          alert("Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.");
        }
      }
    );
  }
  

  function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Port: 2525, 
        Username: document.getElementById("email").value,
        Password: "D57375790DC548C725DAA2F64FF3D023CA1A",
        To: 'mendez.daniela1199@gmail.com',
        From: document.getElementById("email").value, 
        Subject: "Consulta o cotización de " + document.getElementById("nombreCompleto").value,
        Body: "Nombre: " + document.getElementById("nombreCompleto").value +
            "<br>Fecha de Nacimiento: " + document.getElementById("fechaNacimiento").value +
            "<br>Email: " + document.getElementById("email").value +
            "<br>Rango de Ingreso: " + document.getElementById("ingreso").value +
            "<br>Género: " + document.getElementById("genero").value +
            "<br>Grado Académico: " + document.getElementById("gradoAcademico").value
    }).then(
        message => alert(message)
    );
}
