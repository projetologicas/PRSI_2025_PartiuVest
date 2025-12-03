package br.edu.ifsp.partiu_vest.model;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "attempt_question")
public class AttemptQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private Attempt attempt;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Column
    private String user_answer;
    @Column
    private LocalDate date;

    public AttemptQuestion(Attempt attempt, Question question, String user_answer, LocalDate date) {
        this.attempt = attempt;
        this.question = question;
        this.user_answer = user_answer;
        this.date = date;
    }

    public AttemptQuestion() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Attempt getAttempt() {
        return attempt;
    }

    public void setAttempt(Attempt attempt) {
        this.attempt = attempt;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "AttemptQuestion{" +
                "id=" + id +
                ", attempt=" + attempt.getId() +
                ", question=" + question.getId() +
                ", user_answer='" + user_answer + '\'' +
                ", date=" + date +
                '}';
    }
}