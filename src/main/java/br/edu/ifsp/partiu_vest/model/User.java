package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.security.MessageDigest;
import java.util.Date;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private Date sign_date;
    @Column
    private int streak;
    @Column
    private int points;
    @Column
    private int xp;

    public User(){}

    public User(String email, String password, String name,Boolean newUser){
        setEmail(email);
        if(newUser){
            setPassword(sha256(password));
        } else{
            setPassword(password);
        }
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

    public void setEmail(String email) throws RuntimeException{
        String regex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.com$";

        try {
            if (email.contains(regex)){
                this.email = email;
            }
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
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

    //Criptografia da senha do usuario
    private static String sha256(String senha) {
        try {
            var digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(senha.getBytes());

            var string_builder = new StringBuilder();
            for (byte b : bytes) {
                String h = Integer.toHexString(0xff & b);
                if (h.length() == 1) {
                    string_builder.append('0');
                }
                string_builder.append(h);
            }
            return string_builder.toString();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    //Verifica as informações se a senha e o email estão corretas
    public Boolean verify(String password, String email) {
        if (sha256(password).equals(this.password) && email.equals(this.email)) {
            return true;
        }
        return false;
    }

    //Caso o usuario errar uma questão, o Streak dele é resetado.
    private void resetStreak(){
        this.streak = 0;
    }
}
