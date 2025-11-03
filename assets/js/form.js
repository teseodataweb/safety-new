document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const resultDiv = form.querySelector(".result") || document.querySelector(".result");
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Evita recarga de página

        // Limpia mensajes anteriores
        resultDiv.innerHTML = "";

        // Validación simple antes de enviar
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            resultDiv.innerHTML = '<p style="color:red;">Por favor completa los campos obligatorios.</p>';
            return;
        }

        // Cambiar texto del botón mientras envía
        let originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";

        // Prepara los datos
        const formData = new FormData(form);

        try {
            const response = await fetch("assets/inc/sendemail.php", {
                method: "POST",
                body: formData
            });

            // Si el servidor no responde bien
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }

            const data = await response.json();

            if (data.status === "success") {
                resultDiv.innerHTML = `<p style="color:green;">${data.message}</p>`;
                form.reset(); // Limpia el formulario
            } else {
                resultDiv.innerHTML = `<p style="color:red;">${data.message}</p>`;
            }

        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = '<p style="color:red;">Ocurrió un error. Intenta más tarde.</p>';
        }

        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
});
