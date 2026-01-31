AOS.init({ duration:1000, once:true });
emailjs.init("hI8OiqHEH2HacNog6");

const form = document.getElementById("form");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const data = {
    nombre: form.name.value,
    email: form.email.value,
    mensaje: form.message.value
  };

  // 👉 GUARDAR EN SQLITE
  fetch("/guardar-mensaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  // 👉 ENVIAR CORREO (LO QUE YA TENÍAS)
  emailjs.sendForm("service_smappgmail", "contacto", this)
    .then(() => emailjs.sendForm("service_smappgmail", "respuesta", this))
    .then(() => {
      alert("Mensaje enviado correctamente");
      form.reset();
    })
    .catch(() => {
      alert("Error al enviar el mensaje");
    });
});
