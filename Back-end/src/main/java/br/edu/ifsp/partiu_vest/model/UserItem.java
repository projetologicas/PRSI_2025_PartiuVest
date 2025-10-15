package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user_item")
public class UserItem {
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private Item item;
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Column
    private Date date;

    public UserItem(Item item, User user) {
        this.item = item;
        this.user = user;
    }

    public UserItem() {

    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public void setDate() {
        this.date = new Date();
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
