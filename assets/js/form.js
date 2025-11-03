document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("No se encontró el formulario #contact-form");
    return;
  }

  const resultDiv = form.querySelector(".result") || document.querySelector(".result");

  // Buscar el botón submit dentro del form
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Limpia mensajes previos
    if (resultDiv) resultDiv.innerHTML = "";

    // Simple validación cliente (puedes expandirla)
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      if (resultDiv) resultDiv.innerHTML = '<p style="color:red;">Por favor completa los campos obligatorios.</p>';
      return;
    }

    // Deshabilitar botón y mostrar texto de carga
    let originalBtnHtml = null;
    if (submitBtn) {
      originalBtnHtml = submitBtn.innerHTML;
      const loadingText = submitBtn.getAttribute("data-loading-text") || "Enviando...";
      submitBtn.disabled = true;
      // Mostrar loading si es botón
      try { submitBtn.innerHTML = loadingText; } catch (err) {}
    }

    // Preparar datos
    const formData = new FormData(form);

    // Si tu archivo PHP está en la misma carpeta usa ruta relativa, por ejemplo:
    // form.action = "assets/inc/sendemail.php";
    // Si el action actual es externo, asegúrate de que el servidor permita CORS.

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        credentials: "same-origin" // ajustar si necesitas cookies o cross-site (omit, include)
      });

      // Checar estado HTTP
      if (!response.ok) {
        const text = await response.text().catch(()=>"");
        throw new Error("HTTP error: " + response.status + " - " + text);
      }

      // Intentar parsear JSON; si no viene JSON, usar texto
      let data;
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        // intentamos convertir a JSON si la respuesta tiene formato JSON en texto
        try { data = JSON.parse(text); } catch (err) { data = { status: "unknown", message: text || "Envío completado." }; }
      }

      // Manejo de respuesta
      if (data.status === "success" || data.status === "ok") {
        if (resultDiv) resultDiv.innerHTML = `<p style="color:green;">${data.message || "Tu mensaje ha sido enviado exitosamente."}</p>`;
        form.reset();
      } else {
        if (resultDiv) resultDiv.innerHTML = `<p style="color:red;">${data.message || "Ocurrió un error al enviar el formulario."}</p>`;
      }

    } catch (err) {
      console.error("Error enviando formulario:", err);
      if (resultDiv) resultDiv.innerHTML = `<p style="color:red;">Ocurrió un error al enviar.</p>`;
      // Si sospechas CORS, lo indicamos
      if (err.message && err.message.toLowerCase().includes("failed to fetch")) {
        if (resultDiv) resultDiv.innerHTML += `<p style="color:orange;">Nota: Puede ser un problema de red o CORS (ruta del action en otro dominio sin permisos).</p>`;
      }
    } finally {
      // Restaurar botón
      if (submitBtn) {
        submitBtn.disabled = false;
        try { submitBtn.innerHTML = originalBtnHtml; } catch (err) {}
      }
    }
  });
});