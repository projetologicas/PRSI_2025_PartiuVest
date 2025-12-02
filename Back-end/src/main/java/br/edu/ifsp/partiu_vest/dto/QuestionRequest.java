package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionRequest {
    @NotBlank
    private long question_id;

    public QuestionRequest(long question_id) {
        this.question_id = question_id;
    }

    public QuestionRequest() {
    }

    public long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(long question_id) {
        this.question_id = question_id;
    }
}
