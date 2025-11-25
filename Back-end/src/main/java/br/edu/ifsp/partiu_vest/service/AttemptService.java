package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AttemptQuestionRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptQuestionResponse;
import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.repository.AttemptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttemptService {
    private final AttemptRepository attempt_repository;

    public AttemptService(AttemptRepository attemptRepository) {
        attempt_repository = attemptRepository;
    }

    public Attempt getAttemptById(AttemptRequest dto) {
        return attempt_repository.findById(dto.getId()).get();
    }

    public List<Attempt> getAttemptsByQuestionBook(AttemptRequest dto) {
        return attempt_repository.findByQuestionBook(dto.getQuestion_book());
    }

    public AttemptQuestionResponse commitQuestionAnswer(AttemptQuestionRequest dto) {

    }
}
