package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

public class AttemptResponse {
    private Set<Attempt> attempts;

    public AttemptResponse(Set<Attempt> attempts) {
        this.attempts = attempts;
    }
    public static AttemptResponse from(Attempt attempt) {
        var response = new AttemptResponse();
        response.attempts.add(attempt);
        return response;
    }

    public AttemptResponse() {
    }

    public Set<Attempt> getAttempts() {
        return attempts;
    }

    public void setAttempts(Set<Attempt> attempts) {
        this.attempts = attempts;
    }
}
