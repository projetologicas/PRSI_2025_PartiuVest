package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;

import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta contendo os dados de perfil públicos, usado para Leaderboards e perfis de outros usuários.")
public class UserPublicDataResponse {
    @Schema(description = "ID único do usuário.", example = "20")
    private Long id;

    @Schema(description = "Nome de exibição do usuário.", example = "Ana Competidora")
    private String name;

    @Schema(description = "Data de cadastro do usuário.", example = "2023-01-15T10:30:00.000+00:00")
    private Date sign_date;

    @Schema(description = "Sequência de dias consecutivos de atividade (Streak).", example = "10")
    private int streak;

    @Schema(description = "Pontos/Moedas acumulados pelo usuário (moeda do jogo).", example = "2500")
    private int points;

    @Schema(description = "Experiência total acumulada (XP).", example = "50000")
    private int xp;

    public UserPublicDataResponse(Long id, String name, Date sign_date, int streak, int points, int xp) {
        this.id = id;
        this.name = name;
        this.sign_date = sign_date;
        this.streak = streak;
        this.points = points;
        this.xp = xp;
    }

    public static UserPublicDataResponse from(User user) {
        UserPublicDataResponse response = new UserPublicDataResponse();
        response.id = user.getId();
        response.name = user.getName();
        response.sign_date = user.getSign_date();
        response.streak = user.getStreak();
        response.points = user.getPoints();
        response.xp = user.getXp();
        return response;
    }

    public UserPublicDataResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getSign_date() {
        return sign_date;
    }

    public void setSign_date(Date sign_date) {
        this.sign_date = sign_date;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }
}