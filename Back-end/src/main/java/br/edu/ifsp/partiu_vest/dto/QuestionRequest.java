package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionRequest {
    private long question_id;
    private long question_book_id;

    public QuestionRequest(long question_id, long question_book_id) {
        this.question_id = question_id;
        this.question_book_id = question_book_id;
    }

    public QuestionRequest() {
    }

    public long getQuestion_book_id() {
        return question_book_id;
    }

    public void setQuestion_book_id(long question_book_id) {
        this.question_book_id = question_book_id;
    }

    public long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(long question_id) {
        this.question_id = question_id;
    }
}
