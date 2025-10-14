package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user_item")
public class UserItem {
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private Item class_;
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Column
    private Date date;

    public UserItem(Item class_, User user) {
        this.class_ = class_;
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

    public Item getClass_() {
        return class_;
    }

    public void setClass_(Item class_) {
        this.class_ = class_;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
