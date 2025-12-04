package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "attempt")
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_book_id")
    private QuestionBook question_book;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(name = "attempt_question",
            joinColumns = @JoinColumn(name = "attempt_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private Set<AttemptQuestion> questions;

    @Column
    private LocalDate start_date;
    @Column
    private LocalDate end_date;

    public Attempt(QuestionBook question_book, User user, LocalDate start_date, LocalDate end_date) {
        this.question_book = question_book;
        this.user = user;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public Attempt() {

    }

    public Set<AttemptQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<AttemptQuestion> questions) {
        this.questions = questions;
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

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    @Override
    public String toString() {
        return "Attempt{" +
                "id=" + id +
                ", question_book=" + question_book.getId() +
                ", user=" + user.getId() +
                ", start_date=" + start_date +
                ", end_date=" + end_date +
                '}';
    }
}
