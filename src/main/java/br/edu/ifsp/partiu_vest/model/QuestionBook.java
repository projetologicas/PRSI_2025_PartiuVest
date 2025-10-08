package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question_book")
public class QuestionBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id")
    private User user_id;
    @Column
    private Date creation_date;

    public QuestionBook(User user_id, Date creation_date) {
        this.user_id = user_id;
        this.creation_date = creation_date;
    }

    public QuestionBook() {

    }

    public Long getId() {
        return id;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }
}
