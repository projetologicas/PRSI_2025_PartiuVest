<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>PartiuVest - Cadastro</title>
    <link rel="stylesheet" type="text/css" href="cadastro.css">
</head>
<body>
<header>
    <div class="topo">
        <span class="titulo">PartiuVest</span>
    </div>
</header>

<main>
    <div class="cadastro-box">
        <form action="CadastroServlet" method="post" enctype="multipart/form-data">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>

            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha" required>

            <label for="nick">Nick</label>
            <input type="text" id="nick" name="nick" required>

            <div class="upload-area">
                <label for="foto" class="upload-icone">
                    <img src="upload.png" alt="Upload Ícone">
                </label>
                <input type="file" id="foto" name="foto" accept="image/*" hidden>
            </div>

            <div class="perfil-icone">
                <img src="perfil.png" alt="Foto de Perfil">
            </div>

            <button type="submit" class="btn cadastrar">Cadastrar</button>
        </form>
    </div>
</main>
</body>
</html>
