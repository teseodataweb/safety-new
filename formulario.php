<?php
header('Content-Type: application/json'); // Devolvemos JSON

$to = "h0m3r02004@gmail.com"; // <-- CAMBIA esto por tu correo
$subject = "Nuevo mensaje desde el formulario de contacto";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = strip_tags(trim($_POST["name"] ?? ""));
    $email   = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $phone   = strip_tags(trim($_POST["phone"] ?? ""));
    $company = strip_tags(trim($_POST["subject"] ?? ""));
    $message = strip_tags(trim($_POST["message"] ?? ""));

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "Por favor completa todos los campos obligatorios."]);
        exit;
    }

    $email_content  = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n";
    $email_content .= "Nombre: $name\n";
    $email_content .= "Correo: $email\n";
    $email_content .= "Teléfono: $phone\n";
    $email_content .= "Empresa: $company\n\n";
    $email_content .= "Mensaje:\n$message\n";

    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Tu mensaje ha sido enviado exitosamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al enviar el mensaje. Intenta nuevamente."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método de solicitud no permitido."]);
}
?>
