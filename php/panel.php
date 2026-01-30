<?php
session_start();

// Evitar cache del navegador
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Verificar sesión
if (!isset($_SESSION["admin_id"]) || empty($_SESSION["admin_id"])) {
    header("Location: ../login.html");
    exit;
}
?>

// Panel de administración - versión interfaz vacía
session_start();

// Verificar que el admin esté logeado
if (!isset($_SESSION["admin_id"])) {
    header("Location: ../login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel Administrador | SM</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        header { margin-bottom: 20px; }
        nav a { margin-right: 15px; text-decoration: none; color: #333; }
        nav a.logout { color: red; }
        main { margin-top: 20px; }
        .panel-box { border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9; }
    </style>
</head>
<body>

<header>
    <h1>Panel de Administración</h1>
    <p>Bienvenido, <?php echo $_SESSION["usuario"]; ?></p>
</header>

<nav>
    
    <a class="logout" href="logout.php">Cerrar sesión</a>
</nav>

<main>
    <div class="panel-box">
        <h2>Interesados</h2>
        <p>Aquí se mostrarán todos los interesados en los servicios de SM.</p>
        <p>(La tabla se agregará cuando se conecte a la base de datos)</p>
    </div>
</main>

<script>
window.history.forward();
window.onunload = function() { null };
</script>

</body>
</html>
