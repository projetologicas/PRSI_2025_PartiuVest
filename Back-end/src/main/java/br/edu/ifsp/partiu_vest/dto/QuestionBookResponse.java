package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;

import java.util.Date;
import java.util.Set;

public class QuestionBookResponse {
    private Long id;
    private Date creation_date;
    private String model;
    boolean r_generated;
    private Set<Question> questions;

    public static QuestionBookResponse from(QuestionBook questionBook) {
        var response = new QuestionBookResponse();
        response.id = questionBook.getId();
        response.creation_date = questionBook.getCreation_date();
        response.model = questionBook.getModel();
        response.r_generated = questionBook.isR_generated();
        response.questions = questionBook.getQuestions();
        return response;
    }

    public QuestionBookResponse(Long id, Date creation_date, String model, boolean r_generated, Set<Question> questions) {
        this.id = id;
        this.creation_date = creation_date;
        this.model = model;
        this.r_generated = r_generated;
        this.questions = questions;
    }

    public QuestionBookResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}
