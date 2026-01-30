<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = trim($_POST["usuario"]);
    $password = trim($_POST["password"]);

    if (empty($usuario) || empty($password)) {
        echo "Debe llenar todos los campos.";
        exit;
    }

    // Consulta segura
    $stmt = $conexion->prepare("SELECT id, password FROM admins WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        // Depuración: imprimir el hash y la contraseña ingresada
        // echo "Ingresada: $password <br> Hash DB: $hashed_password"; exit;

        if (password_verify($password, $hashed_password)) {
            $_SESSION["admin_id"] = $id;
            $_SESSION["usuario"] = $usuario;
            header("Location: panel.php");
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
