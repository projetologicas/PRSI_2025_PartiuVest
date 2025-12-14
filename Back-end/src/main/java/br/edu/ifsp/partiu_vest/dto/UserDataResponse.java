package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;

import java.util.Date;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta contendo todos os dados de perfil (privados e públicos) do usuário autenticado.")
public class UserDataResponse {
    @Schema(description = "ID único do usuário.", example = "1")
    private Long id;

    @Schema(description = "E-mail do usuário (campo privado).", example = "usuario.logado@email.com")
    private String email;

    @Schema(description = "Nome de exibição do usuário.", example = "João Teste")
    private String name;

    @Schema(description = "Data de cadastro do usuário.", example = "2023-01-15T10:30:00.000+00:00")
    private Date sign_date;

    @Schema(description = "Sequência de dias consecutivos de atividade (Streak).", example = "5")
    private int streak;

    @Schema(description = "Pontos/Moedas acumulados pelo usuário (moeda do jogo).", example = "1500")
    private int points;

    @Schema(description = "Experiência total acumulada (XP).", example = "10250")
    private int xp;

    @Schema(description = "Nível de permissão do usuário.", example = "USER")
    private Role role;

    @Schema(description = "Lista completa de itens cosméticos que o usuário possui.")
    private Set<Item> items;

    @Schema(description = "URL do avatar atualmente equipado.", example = "http://cdn.partiuvest.com/avatars/gold_hat.png", nullable = true)
    private String currentAvatarUrl;

    @Schema(description = "Título de perfil atualmente equipado.", example = "Guerreiro do ENEM", nullable = true)
    private String currentTitle;

    @Schema(description = "Tema de cor/layout atualmente equipado.", example = "Dark Blue", nullable = true)
    private String currentTheme;

    public UserDataResponse() {
    }

    public static UserDataResponse from(User user) {
        UserDataResponse response = new UserDataResponse();

        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setSign_date(user.getSign_date());
        response.setStreak(user.getStreak());
        response.setPoints(user.getPoints());
        response.setXp(user.getXp());
        response.setRole(user.getRole());

        response.setItems(user.getItems());
        response.setCurrentAvatarUrl(user.getCurrentAvatarUrl());
        response.setCurrentTitle(user.getCurrentTitle());
        response.setCurrentTheme(user.getCurrentTheme());

        return response;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Date getSign_date() { return sign_date; }
    public void setSign_date(Date sign_date) { this.sign_date = sign_date; }

    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Set<Item> getItems() { return items; }
    public void setItems(Set<Item> items) { this.items = items; }

    public String getCurrentAvatarUrl() { return currentAvatarUrl; }
    public void setCurrentAvatarUrl(String currentAvatarUrl) { this.currentAvatarUrl = currentAvatarUrl; }

    public String getCurrentTitle() { return currentTitle; }
    public void setCurrentTitle(String currentTitle) { this.currentTitle = currentTitle; }

    public String getCurrentTheme() { return currentTheme; }
    public void setCurrentTheme(String currentTheme) { this.currentTheme = currentTheme; }
}