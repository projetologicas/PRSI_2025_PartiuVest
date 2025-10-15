package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "attempt_question")
public class AttemptQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Attempt attempt;

    @Column
    private Character user_answer;
    @Column
    private Date date;
    @Column
    private boolean correct;

    public AttemptQuestion(Attempt attempt, Character user_answer, Date date, boolean correct) {
        setAttempt(attempt);
        setUser_answer(user_answer);
        setDate(date);
        setCorrect(correct);
    }

    public AttemptQuestion(Attempt attempt) {
        setAttempt(attempt);
        setUser_answer(null);
        setDate();
        setCorrect(false);
    }

    public AttemptQuestion() {

    }

    public Long getId() {
        return id;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public Attempt getAttempt() {
        return attempt;
    }

    public void setAttempt(Attempt attempt) {
        this.attempt = attempt;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Character getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(Character user_answer) {
        this.user_answer = user_answer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate() {
        this.date = new Date();
    }
}
