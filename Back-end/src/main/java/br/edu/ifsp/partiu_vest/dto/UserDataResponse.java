package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;

import java.util.Date;
import java.util.Set;

public class UserDataResponse {
    private Long id;
    private String email;
    private String name;
    private Date sign_date;
    private int streak;
    private int points;
    private int xp;
    private Role role;

    private Set<Item> items;
    private String currentAvatarUrl;
    private String currentTitle;
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