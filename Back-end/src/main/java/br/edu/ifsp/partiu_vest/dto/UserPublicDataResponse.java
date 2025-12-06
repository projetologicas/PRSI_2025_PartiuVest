package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;

import java.util.Date;

public class UserPublicDataResponse {
    private Long id;
    private String name;
    private Date sign_date;
    private int streak;
    private int points;
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
