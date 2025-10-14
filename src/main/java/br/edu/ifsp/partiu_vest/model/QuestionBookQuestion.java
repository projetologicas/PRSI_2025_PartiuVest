package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "question_question_book")
public class QuestionBookQuestion {
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private Question question;
    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private QuestionBook question_book;

    public QuestionBookQuestion(Question question, QuestionBook question_book) {
        setQuestion(question);
        setQuestion_book(question_book);
    }

    public QuestionBookQuestion() {

    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public QuestionBook getQuestion_book() {
        return question_book;
    }

    public void setQuestion_book(QuestionBook question_book) {
        this.question_book = question_book;
    }
}
