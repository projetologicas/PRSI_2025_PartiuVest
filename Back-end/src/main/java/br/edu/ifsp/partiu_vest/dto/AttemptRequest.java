package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição usado para iniciar ou referenciar uma tentativa.")
public class AttemptRequest {
    @Schema(description = "ID da tentativa (usado para buscar ou finalizar uma tentativa existente).", example = "101", nullable = true)
    private Long id;

    @Schema(description = "ID do Question Book (usado ao iniciar uma nova tentativa).", example = "5", nullable = true)
    private Long question_book_id;

    public AttemptRequest(Long id, Long question_book_id) {
        this.id = id;
        this.question_book_id = question_book_id;
    }

    public AttemptRequest() {
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getQuestion_book_id() {
        return question_book_id;
    }
    public void setQuestion_book(Long question_book_id) {
        this.question_book_id = question_book_id;
    }
}