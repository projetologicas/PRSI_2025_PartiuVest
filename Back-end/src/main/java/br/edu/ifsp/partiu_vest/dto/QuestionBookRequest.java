package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionBookRequest {
    @NotBlank
    private long questionBookId;

    public QuestionBookRequest(long questionBookId) {
        this.questionBookId = questionBookId;
    }

    public QuestionBookRequest() {
    }

    public long getQuestionBookId() {
        return questionBookId;
    }

    public void setQuestionBookId(long questionBookId) {
        this.questionBookId = questionBookId;
    }
}
