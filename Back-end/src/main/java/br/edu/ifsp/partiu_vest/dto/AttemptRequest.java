package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptRequest {
    private Long id;
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
