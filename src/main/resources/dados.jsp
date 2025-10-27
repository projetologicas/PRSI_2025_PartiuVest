<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PartiuVest - Dados</title>
    <link rel="stylesheet" href="dados.css">
</head>
<body>
<div class="container">
    <header>
        <button class="home-btn">Home</button>
        <div class="logo">PartiuVest</div>
        <div class="sair-container">
            <span class="moedas">${usuario.moedas} $</span>
            <button class="sair-btn">Sair</button>
        </div>
    </header>

    <main>
        <div class="perfil">
            <img src="${usuario.fotoPerfil}" alt="Foto de Perfil" class="foto-perfil">
            <p>Lvl: ${usuario.lvl}</p>
        </div>

        <div class="dados">
            <h2>DADOS</h2>
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Exercícios feitos:</strong> ${usuario.exerciciosFeitos}</p>
            <p><strong>Streak:</strong> ${usuario.streak}</p>
            <p><strong>Rank:</strong> ${usuario.rank}</p>
        </div>

        <div class="conquistas">
            <div class="scroll-area">
                <c:forEach var="conquista" items="${conquistas}">
                    <div class="medalha">
                        <img src="${conquista.imagem}" alt="${conquista.nome}">
                        <p>${conquista.nome}</p>
                    </div>
                </c:forEach>
            </div>
        </div>
    </main>
</div>
</body>
</html>
