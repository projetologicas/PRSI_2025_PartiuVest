package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.dto.QuestionRequest;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository question_repository;

    public QuestionService(QuestionRepository questionRepository) {
        question_repository = questionRepository;
    }

    public Question getQuestionById(Long question_id) {
        return question_repository.findById(question_id).get();
    }

    public List<Question> getQuestionsByQuestionBook(Long question_book_id) {
        return question_repository.findQuestionsByQuestionBookId(question_book_id);
    }
}
