package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "question_book")
public class QuestionBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date creation_date;

    @Column
    private String model;

    @Column
    private boolean r_generated;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question_book")
    private Set<Attempt> attempts;

    @ManyToMany
    @JoinTable(
            name = "book_question",
            joinColumns = @JoinColumn(name = "question_book_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private Set<Question> questions;

    public QuestionBook(User user, String model, boolean r_generated) {
        this.user = user;
        setCreation_date();
        setModel(model);
        setR_generated(r_generated);
    }

    public QuestionBook(String model) {
        setCreation_date();
        setModel(model);
        setR_generated(false);
    }

    public QuestionBook() {
    }

    public Long getId() {
        return id;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public void setCreation_date() {
        this.creation_date = new Date();
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public boolean isR_generated() {
        return r_generated;
    }

    public void setR_generated(boolean r_generated) {
        this.r_generated = r_generated;
    }

    // --- Getters e Setters do User ---
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Attempt> getAttempts() {
        return attempts;
    }

    public void setAttempts(Set<Attempt> attempts) {
        this.attempts = attempts;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "QuestionBook{" +
                "id=" + id +
                ", creation_date=" + creation_date +
                ", model='" + model + '\'' +
                ", r_generated=" + r_generated +
                ", user_id=" + (user != null ? user.getId() : "null") +
                ", attempts=" + attempts +
                ", questions=" + questions +
                '}';
    }
}