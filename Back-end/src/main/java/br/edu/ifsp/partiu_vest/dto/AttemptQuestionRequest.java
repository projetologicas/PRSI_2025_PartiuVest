package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para registrar a resposta de um usuário em uma questão específica.")
public class AttemptQuestionRequest {
    @Schema(description = "ID opcional da relação AttemptQuestion (se estiver atualizando uma resposta).", example = "205", nullable = true)
    private Long id;

    @Schema(description = "ID da questão original.", example = "50", required = true)
    private Long question_id;

    @Schema(description = "ID da tentativa em andamento (Attempt).", example = "101", required = true)
    private Long attempt_id;


    @Schema(description = "Resposta do usuário (ex: 'A', 'B', 'C', etc.).", example = "C", required = true)
    private String user_answer;

    public AttemptQuestionRequest(Long id, Long question_id, Long attempt_id, User user, String user_answer) {
        this.id = id;
        this.question_id = question_id;
        this.attempt_id = attempt_id;
        this.user_answer = user_answer;
    }

    public AttemptQuestionRequest() {
    }
    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}