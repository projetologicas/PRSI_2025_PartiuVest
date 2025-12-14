package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para buscar uma questão específica, geralmente usado em endpoints POST.")
public class QuestionRequest {
    @Schema(description = "ID da questão que está sendo solicitada.", example = "10")
    private long question_id;

    @Schema(description = "ID do Question Book ao qual a questão pertence.", example = "5", nullable = true)
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