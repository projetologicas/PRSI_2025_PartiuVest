package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question_book_attempt")
public class QuestionBookAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id")
    private QuestionBook question_book;
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Column
    private Date start_date;
    @Column
    private Date end_date;

    public QuestionBookAttempt(QuestionBook question_book, User user, Date start_date, Date end_date) {
        this.question_book = question_book;
        this.user = user;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public QuestionBookAttempt() {

    }

    public Long getId() {
        return id;
    }

    public QuestionBook getQuestion_book() {
        return question_book;
    }

    public void setQuestion_book(QuestionBook question_book) {
        this.question_book = question_book;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }
}
