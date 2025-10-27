package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.Role;
import jakarta.persistence.*;

import java.security.MessageDigest;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
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
    @Column(nullable = false)
    private int points;
    @Column(nullable = false)
    private int xp;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;
    @Column(nullable = false)
    private Boolean enabled;

    @ManyToMany
    @JoinTable(name = "item",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> items;

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        if(points != 0){
            this.points += points;
        } else{
            this.points = 0;
        }
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        if(xp != 0){
            this.xp += xp;
        } else{
            this.xp = 0;
        }
    }
    private void resetStreak(){
        this.streak = 0;
    }
}
