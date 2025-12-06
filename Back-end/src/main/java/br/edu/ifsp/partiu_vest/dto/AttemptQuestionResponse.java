package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.User;

import java.time.LocalDate;
import java.util.Date;

public class AttemptQuestionResponse {
    private Long id;
    private Long question_id;
    private Long attempt_id;
    private String user_answer;
    private String right_answer;
    private LocalDate date;

    public AttemptQuestionResponse(Long id, Long question_id, Long attempt, String user_answer, String right_answer) {
        this.id = id;
        this.question_id = question_id;
        this.attempt_id = attempt;
        this.user_answer = user_answer;
        this.right_answer = right_answer;
        this.date = LocalDate.now();
    }

    public static AttemptQuestionResponse from(AttemptQuestion attemptQuestion) {
        AttemptQuestionResponse response = new AttemptQuestionResponse();
        response.id = attemptQuestion.getId();
        response.attempt_id = attemptQuestion.getAttempt().getId();
        response.question_id = attemptQuestion.getQuestion().getId();
        response.right_answer = attemptQuestion.getQuestion().getAnswer();
        response.user_answer = attemptQuestion.getUser_answer();
        response.date = attemptQuestion.getDate();
        return response;
    }

    public AttemptQuestionResponse() {
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public Long getAttempt_id() {
        return attempt_id;
    }

    public void setAttempt_id(Long attempt_id) {
        this.attempt_id = attempt_id;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public String getRight_answer() {
        return right_answer;
    }

    public void setRight_answer(String right_answer) {
        this.right_answer = right_answer;
    }
}
