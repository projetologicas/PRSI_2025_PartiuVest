package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptRequest {
    private Long id;
    private QuestionBook question_book;
    private User user;

    public AttemptRequest(Long id, QuestionBook question_book, User user) {
        this.id = id;
        this.question_book = question_book;
        this.user = user;
    }

    public AttemptRequest() {
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
}
