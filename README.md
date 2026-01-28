# 🎓 PRSI_2025_PartiuVest - Gamificação para o Vestibular

## 💡 Introdução: Transformando o Estudo em Jogo

A **preparação para o vestibular** tradicionalmente enfrenta um desafio crítico: a **crescente falta de engajamento e motivação** dos alunos. A monotonia e a dificuldade em visualizar o progresso levam a altas taxas de desistência e baixa retenção de conteúdo.

### Nossa Solução: Inovação e Gamificação

O **Partiu Vest** surge como uma solução inovadora, aplicando os princípios da **gamificação** para revolucionar a forma como os alunos estudam. Transformamos a jornada de aprendizado em uma experiência dinâmica e recompensadora através de:

* **Sistema de Pontuação (XP e Pontos):** Recompensas imediatas por acertos e conclusão de simulados.
* **Sequência de Estudos (Streak):** Incentivo à consistência diária no aprendizado.
* **Itens e Personalização:** Utilização de uma loja de itens para customizar o avatar, aumentando o senso de posse e exclusividade.

### Tecnologias Utilizadas no Sistema

| Área do Projeto | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Backend (API)** | **Spring Boot 3** (Java 21) | Robustez, segurança, alta escalabilidade e ampla adoção no mercado. |
| **Banco de Dados** | **MySQL** | Confiabilidade, desempenho e estabilidade para dados de usuários e questões. |
| **Documentação** | **Springdoc OpenAPI (Swagger)** | Geração automática e interativa da documentação da API, facilitando o consumo pelo frontend. |
| **Segurança** | **Spring Security** & **JWT** | Autenticação segura e autorização baseada em tokens para proteger todos os endpoints. |

## 🧑‍💻 Integrantes e Contribuidores

Abaixo estão os membros que tornaram o Partiu Vest possível:

| Nome Completo | Função | Contato (Ex: LinkedIn) |
| :--- | :--- | :--- |
| **[Rauan Caracciolo]** | **Desenvolvedor Backend (Líder)** | [https://www.linkedin.com/in/rauan-caracciolo-9a01aa269 https://github.com/RauanCaracciolo] |
| **[Guilherme Fragiacomo]** | Desenvolvedor Full Stack | [https://www.linkedin.com/in/guilherme-fragiacomo-9739a4271 https://github.com/guilhermefragiacomo] |
| **[Deivid Brito]** | Desenvolvedor Full Stack | [https://www.linkedin.com/in/deividpbrito https://github.com/deividbrito] |
| **[Luiz Francisco Junior]** | Desenvolvedor Frontend e UI/UX | [https://www.linkedin.com/in/luiz-francisco-rodrigues-junior-a36711265 https://github.com/Luiz-frj] |
## 📖 Documentação da API (OpenAPI / Swagger UI)

A documentação da API foi gerada automaticamente utilizando o **Springdoc OpenAPI** e o **Swagger UI**, garantindo que todos os endpoints estejam sempre atualizados com a última versão do código.

A documentação completa, interativa e funcional, pode ser acessada no momento em que a aplicação estiver em execução.

### Acesso à Documentação

Para explorar e testar todos os endpoints da API (incluindo autenticação, administração e questões):

**Link de Acesso:**
`http://localhost:8080/swagger-ui/index.html#/`

### Exemplo Visual

Uma imagem de demonstração da interface da documentação, que ilustra a lista de endpoints disponíveis, está disponível no arquivo:

* **`Documentacao.png`**

**Observação:** Como o projeto utiliza **Spring Security** com **JWT**, os endpoints protegidos (marcados com "Bearer Token") exigirão que você insira um token válido na interface do Swagger UI para testá-los.

## ⚙️ Setup e Execução Local do Backend

Esta seção detalha os pré-requisitos e os passos necessários para rodar a aplicação backend do **Partiu Vest** localmente.

### Pré-requisitos

* **Java Development Kit (JDK) 21** ou superior
* **Maven** (Gerenciador de dependências)
* **MySQL Server** (Recomendada a porta padrão: 3306)

### Configuração do Banco de Dados

1.  Crie um banco de dados vazio no seu MySQL Server. Sugestão de nome: `PartiuVestDB`.
2.  Localize e edite o arquivo de configuração principal da sua aplicação (geralmente `src/main/resources/application.properties` ou `application.yml`).
3.  Preencha as configurações de conexão com suas credenciais:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/PartiuVestDB
    spring.datasource.username=root
    spring.datasource.password=sua_senha
    # Configurações adicionais
    spring.jpa.hibernate.ddl-auto=update
    ```

### Como Rodar a Aplicação

1.  **Clone o repositório** do projeto para sua máquina local:

    ```bash
    git clone [https://docs.github.com/pt/issues/planning-and-tracking-with-projects/managing-your-project/adding-your-project-to-a-repository](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/managing-your-project/adding-your-project-to-a-repository)
    ```

2.  Navegue até o diretório raiz do projeto:

    ```bash
    cd partiu-vest
    ```

3.  **Compile e execute** o projeto Spring Boot usando o Maven:

    ```bash
    mvn spring-boot:run
    ```

4.  Aguarde o log indicar que o servidor Tomcat foi iniciado (deve iniciar na porta `8080`).

Após o servidor iniciar, você poderá acessar a documentação da API em: `http://localhost:8080/swagger-ui/index.html#/`

## 💻 Setup e Execução Local do Frontend

### 🛠️ Configuração e Inicialização do Frontend

#### Pré-requisitos

* **Node.js** (LTS - Long Term Support)
* **npm** ou **Yarn** (Gerenciador de pacotes)

#### Como Rodar o Frontend

1.  **Clone o repositório** do frontend:

    ```bash
    git clone [https://github.com/anamariasilva/front-end](https://github.com/anamariasilva/front-end)
    ```

2.  Navegue até o diretório do frontend:

    ```bash
    cd partiu-vest-frontend
    ```

3.  **Instale as dependências** do projeto:

    ```bash
    npm install 
    # ou yarn install
    ```

4.  **Inicie o servidor de desenvolvimento**:

    ```bash
    npm run dev 
    # ou npm start, dependendo da configuração
    ```

5.  O frontend estará acessível em `http://localhost:[Porta]`. **(A porta padrão costuma ser 3000 ou 5173)**.

**Lembrete:** O frontend só funcionará corretamente se a API (backend) estiver rodando em `http://localhost:8080`, pois ele dependerá dos endpoints de autenticação e dados para operar.


## 📷 Video do sistema funcionando

[![Assistir ao vídeo de apresentação]](https://youtu.be/PmoOnBKShxE?si=yvDUysQ-dEKr9Fv3)

