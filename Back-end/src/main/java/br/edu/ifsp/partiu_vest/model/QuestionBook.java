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
    @Column boolean r_generated;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question_book")
    private Set<Attempt> attempts;

    @ManyToMany
    @JoinTable(
            name = "book_question", // Nome da nova tabela de junção
            joinColumns = @JoinColumn(name = "question_book_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private Set<Question> questions;

    public QuestionBook(User user_id, String model, boolean r_generated) {
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

    public void setCreation_date() {
        this.creation_date = new Date();
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
}
