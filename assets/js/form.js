
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const resultDiv = document.querySelector(".result");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Evita que recargue la página

        // Mostrar mensaje de carga
        resultDiv.innerHTML = '<p style="color:#888;">Enviando mensaje...</p>';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.status === "success") {
                resultDiv.innerHTML = `<p style="color:green;">${data.message}</p>`;
                form.reset(); // Limpia el formulario
            } else {
                resultDiv.innerHTML = `<p style="color:red;">${data.message}</p>`;
            }

        } catch (error) {
            resultDiv.innerHTML = `<p style="color:red;">Ocurrió un error. Intenta más tarde.</p>`;
            console.error("Error:", error);
        }
    });
});
