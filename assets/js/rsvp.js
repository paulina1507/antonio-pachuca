document
  .getElementById("rsvpForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const rsvp = window.invitationData?.rsvp;

    if (!rsvp) {
      alert("Falta configuración RSVP.");
      return;
    }

    const nombre = document.getElementById("rsvpName").value.trim();
    const asistencia = document.getElementById("rsvpAttendance").value;
    const mensaje = document.getElementById("rsvpMessage").value.trim();

    if (!nombre) {
      alert("Por favor escribe tu nombre 😊");
      return;
    }

    if (!asistencia) {
      alert("Selecciona tu respuesta 😊");
      return;
    }

    const numeroFiesta = rsvp.phone;

    if (!numeroFiesta) {
      alert("Falta configurar el WhatsApp.");
      return;
    }

    const nombreEvento =
      window.invitationData?.hero?.names || "nuestro evento";

    const tipoEvento =
      window.invitationData?.hero?.pretitle || "la celebración";

    const confirmacion =
      asistencia === rsvp.fields.attendanceOptions[0];

    let textoWA = "";

    if (confirmacion) {
      textoWA = `
Hola
Soy ${nombre}.

Con mucha alegría confirmo mi asistencia a ${tipoEvento} de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "Nos vemos pronto 🤍"}
      `;
    } else {
      textoWA = `
Hola
Soy ${nombre}.

Lamentablemente no podré acompañarlos en ${tipoEvento} de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "Les mando un abrazo 🤍"}
      `;
    }

    const url = `https://wa.me/${numeroFiesta}?text=${encodeURIComponent(textoWA)}`;

    window.open(url, "_blank");

    const ok = document.getElementById("rsvpSuccess");

    if (ok) {
      ok.classList.remove("hidden");

      ok.textContent = confirmacion
        ? `¡Gracias ${nombre}! ${rsvp.success} 🤍`
        : `Gracias ${nombre} por avisarnos 🤍`;
    }

    this.reset();
  });