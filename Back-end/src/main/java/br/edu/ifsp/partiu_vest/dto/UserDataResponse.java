package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public class UserDataResponse {
    private Long id;
    private String email;
    private String name;
    private Date sign_date;
    private int streak;
    private int points;
    private int xp;
    private Role role;

    public UserDataResponse(Long id, String email, String name, Date sign_date, int streak, int points, int xp, Role role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.sign_date = sign_date;
        this.streak = streak;
        this.points = points;
        this.xp = xp;
        this.role = role;
    }

    public static UserDataResponse from(User user) {
        UserDataResponse response = new UserDataResponse();
        response.id = user.getId();
        response.email = user.getEmail();
        response.name = user.getName();
        response.sign_date = user.getSign_date();
        response.streak = user.getStreak();
        response.points = user.getPoints();
        response.xp = user.getXp();
        response.role = user.getRole();
        return response;
    }

    public UserDataResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
