package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AttemptQuestionRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptQuestionResponse;
import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.repository.AttemptQuestionRepository;
import br.edu.ifsp.partiu_vest.repository.AttemptRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttemptService {
    private final AttemptRepository attempt_repository;
    private final QuestionRepository question_repository;
    private final AttemptQuestionRepository attempt_question_repository;

    public AttemptService(AttemptRepository attemptRepository, QuestionRepository questionRepository, AttemptQuestionRepository attemptQuestionRepository) {
        attempt_repository = attemptRepository;
        question_repository = questionRepository;
        attempt_question_repository = attemptQuestionRepository;
    }

    public Attempt getAttemptById(AttemptRequest dto) {
        return attempt_repository.findById(dto.getId()).get();
    }

    public List<Attempt> getAttemptsByQuestionBook(AttemptRequest dto) {
        return attempt_repository.findByQuestionBook(dto.getQuestion_book());
    }

    public AttemptQuestionResponse commitQuestionAnswer(AttemptQuestionRequest dto) {
        Attempt attempt = dto.getAttempt();
        AttemptQuestion user_attempt_question = attempt_question_repository.findById(dto.getId()).get();
        user_attempt_question.setDate(LocalDate.now());
        user_attempt_question.setUser_answer(dto.getUser_answer());
        attempt_question_repository.save(user_attempt_question);

        return new AttemptQuestionResponse(user_attempt_question, attempt, dto.getUser(), dto.getUser_answer(), user_attempt_question.getQuestion().getAnswer());
    }
}
