package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.QuestionRequest;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository question_repository;

    public QuestionService(QuestionRepository questionRepository) {
        question_repository = questionRepository;
    }

    public Question getQuestionById(QuestionRequest dto) {
        return question_repository.findById(dto.getQuestion_id()).get();
    }
}
