AOS.init({ duration:1000, once:true });

emailjs.init("hI8OiqHEH2HacNog6");

const form = document.getElementById("form");

form.addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm(
    "service_smappgmail",
    "contacto",
    this
  ).then(() => {

  
    emailjs.sendForm(
      "service_smappgmail",
      "respuesta",
      this
    ).then(() => {
      alert("Mensaje enviado correctamente ");
      form.reset();
    });

  }).catch(() => {
    alert("Error al enviar el mensaje");
  });
});
