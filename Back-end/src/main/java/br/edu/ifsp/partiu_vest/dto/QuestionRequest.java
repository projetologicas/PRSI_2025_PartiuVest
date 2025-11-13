package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionRequest {
    @NotBlank
    private long questionBookId;

    public QuestionRequest(long questionBookId) {
        this.questionBookId = questionBookId;
    }

    public QuestionRequest() {
    }

    public long getQuestionBookId() {
        return questionBookId;
    }

    public void setQuestionBookId(long questionBookId) {
        this.questionBookId = questionBookId;
    }
}
