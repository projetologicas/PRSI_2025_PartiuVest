package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class QuestionBookRequest {
    @NotNull
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
