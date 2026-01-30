<?php
// ===============================
// Login administrador
// ===============================

session_start(); // Inicia sesión
include("conexion.php"); // Conecta con la BD

// Verificar que se envió por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = trim($_POST["usuario"]);
    $password = trim($_POST["password"]);

    // Validar campos obligatorios
    if (empty($usuario) || empty($password)) {
        echo "Debe llenar todos los campos.";
        exit;
    }

    // Preparar consulta segura
    $stmt = $conexion->prepare("SELECT id, password FROM admins WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        // Verificar contraseña
        if (password_verify($password, $hashed_password)) {
            $_SESSION["admin_id"] = $id;
            $_SESSION["usuario"] = $usuario;

            // Redirigir al panel de administración
            header("Location: admin/panel.php");
            exit;
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }

    $stmt->close();

} else {
    echo "Acceso no permitido.";
}
?>
