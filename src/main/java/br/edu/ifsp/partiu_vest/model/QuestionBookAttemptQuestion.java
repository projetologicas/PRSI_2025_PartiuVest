package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question_book_attempt_question")
public class QuestionBookAttemptQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private QuestionBookAttempt question_book_attempt;

    @Column
    private Character user_answer;
    @Column
    private Date date;

    public QuestionBookAttemptQuestion(QuestionBookAttempt question_book_attempt, Character user_answer, Date date) {
        this.question_book_attempt = question_book_attempt;
        this.user_answer = user_answer;
        this.date = date;
    }

    public QuestionBookAttemptQuestion() {

    }

    public Long getId() {
        return id;
    }

    public QuestionBookAttempt getQuestion_book_attempt() {
        return question_book_attempt;
    }

    public void setQuestion_book_attempt(QuestionBookAttempt question_book_attempt) {
        this.question_book_attempt = question_book_attempt;
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

    public void setDate(Date date) {
        this.date = date;
    }
}
