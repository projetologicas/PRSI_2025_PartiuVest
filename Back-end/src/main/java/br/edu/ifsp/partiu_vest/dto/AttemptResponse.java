package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

public class AttemptResponse {
    private Long id;
    private QuestionBook question_book;
    private User user;
    private Set<Question> questions;
    private Date start_date;
    private Date end_date;

    public AttemptResponse(Long id, QuestionBook question_book, User user, Set<Question> questions, Date start_date, Date end_date) {
        this.id = id;
        this.question_book = question_book;
        this.user = user;
        this.questions = questions;
        this.start_date = start_date;
        this.end_date = end_date;
    }
    public static AttemptResponse from(Attempt attempt) {
        var response = new AttemptResponse();
        response.id = attempt.getId();
        response.question_book = attempt.getQuestion_book();
        response.user = attempt.getUser();
        response.questions = attempt.getQuestion_book().getQuestions();
        response.start_date = attempt.getStart_date();
        response.end_date = attempt.getEnd_date();
        return response;
    }

    public AttemptResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
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
