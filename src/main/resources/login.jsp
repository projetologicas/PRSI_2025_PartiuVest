<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>PartiuVest - Login</title>
    <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
<div class="container">
    <div class="logo-area">
        <h1 class="titulo">PartiuVest</h1>
        <img src="cerebro.png" alt="Logo PartiuVest" class="logo">
    </div>

    <div class="login-box">
        <form action="LoginServlet" method="post">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Senha</label>
            <input type="password" id="senha" name="senha" required>

            <button type="submit" class="btn entrar">Entrar</button>
            <button type="button" class="btn criar" onclick="window.location.href='cadastro.jsp'">Criar Conta</button>
        </form>
    </div>
</div>
</body>
</html>
