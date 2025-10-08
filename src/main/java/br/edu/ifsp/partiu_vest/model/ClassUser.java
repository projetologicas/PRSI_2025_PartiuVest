package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "class_user")
public class ClassUser {
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private Class class_;
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    public ClassUser(Class class_, User user) {
        this.class_ = class_;
        this.user = user;
    }

    public ClassUser() {

    }

    public Class getClass_() {
        return class_;
    }

    public void setClass_(Class class_) {
        this.class_ = class_;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
