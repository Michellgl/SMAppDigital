AOS.init({ duration:1000, once:true });

// 🔑 TU PUBLIC KEY
emailjs.init("hI8OiqHEH2HacNog6");

const form = document.getElementById("form");

form.addEventListener("submit", function(e){
  e.preventDefault();

  // 1️⃣ ENVÍA CORREO A TU GMAIL
  emailjs.sendForm(
    "service_smappgmail",
    "template_contacto_admin",
    this
  ).then(() => {

  
    emailjs.sendForm(
      "service_smappgmail",
      "template_respuesta_clien",
      this
    ).then(() => {
      alert("Mensaje enviado correctamente 🚀");
      form.reset();
    });

  }).catch(() => {
    alert("Error al enviar el mensaje ❌");
  });
});
