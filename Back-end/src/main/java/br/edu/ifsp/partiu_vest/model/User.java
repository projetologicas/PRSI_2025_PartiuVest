package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120, unique=true)
    private String email;

    @Column(nullable = false, length = 120)
    private String password;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false)
    private Date sign_date;

    @Column(nullable = false)
    private int streak;

    @Column(name = "last_streak_date")
    private java.time.LocalDate lastStreakDate;

    @Column(nullable = false)
    private int points;

    @Column(nullable = false)
    private int xp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Column(nullable = false)
    private Boolean enabled;

    @Column(name = "current_avatar_url")
    private String currentAvatarUrl;

    @Column(name = "current_title")
    private String currentTitle;

    @Column(name = "current_theme")
    private String currentTheme;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_inventory",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    private Set<Item> items = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<Attempt> attempts;

    public User(){}

    public User(String email, String password, String name){
        setEmail(email);
        setPassword(password);
        setName(name);
        setSign_date();
        setPoints(0);
        setXp(0);
        setStreak();
        this.enabled = true;
        this.role = Role.USER;
        this.currentTheme = "light";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public void setSign_date() {
        this.sign_date = new Date();
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak() {
        if(this.streak != 0){
            this.streak += 1;
        }else{
            this.streak = 0;
        }
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public void resetStreak(){
        this.streak = 0;
    }

    public java.time.LocalDate getLastStreakDate() {
        return lastStreakDate;
    }

    public void setLastStreakDate(java.time.LocalDate lastStreakDate) {
        this.lastStreakDate = lastStreakDate;
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

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public String getCurrentAvatarUrl() {
        return currentAvatarUrl;
    }

    public void setCurrentAvatarUrl(String currentAvatarUrl) {
        this.currentAvatarUrl = currentAvatarUrl;
    }

    public String getCurrentTitle() {
        return currentTitle;
    }

    public void setCurrentTitle(String currentTitle) {
        this.currentTitle = currentTitle;
    }

    public String getCurrentTheme() {
        return currentTheme;
    }

    public void setCurrentTheme(String currentTheme) {
        this.currentTheme = currentTheme;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", sign_date=" + sign_date +
                ", streak=" + streak +
                ", points=" + points +
                ", xp=" + xp +
                ", role=" + role +
                ", enabled=" + enabled +
                '}';
    }
}