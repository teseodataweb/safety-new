<?php
// ==== CONFIGURACIÓN ====

// Dirección a la que se enviará el mensaje
$to = "h0m3r02004@gmail.com"; // <-- CAMBIA ESTO por tu correo real

// Asunto del correo
$subject = "Nuevo mensaje desde el formulario de contacto";

// ==== VALIDACIÓN Y PROCESAMIENTO ====
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitizar los datos
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone   = strip_tags(trim($_POST["phone"]));
    $company = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Validación básica
    if (empty($name) || empty($email) || empty($message)) {
        echo "Por favor completa todos los campos obligatorios.";
        exit;
    }

    // Cuerpo del mensaje
    $email_content  = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n";
    $email_content .= "Nombre: $name\n";
    $email_content .= "Correo: $email\n";
    $email_content .= "Teléfono: $phone\n";
    $email_content .= "Empresa: $company\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Cabeceras
    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviar correo
    if (mail($to, $subject, $email_content, $headers)) {
        echo "success"; // puedes usar esto si tu JS muestra mensajes dinámicos
    } else {
        echo "Error al enviar el mensaje. Intenta más tarde.";
    }

} else {
    echo "Método de solicitud no permitido.";
}
?>
