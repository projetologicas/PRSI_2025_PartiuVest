package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AuthRequest;
import br.edu.ifsp.partiu_vest.dto.QuestionRequest;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionBookRepository question_book_repository;
    private final QuestionRepository question_repository;

    public QuestionService(QuestionBookRepository question_book_repository, QuestionRepository question_repository) {
        this.question_book_repository = question_book_repository;
        this.question_repository = question_repository;
    }

    public List<Question> getQuestionsFromQuestionBook(QuestionRequest dto) {
        List<Question> question_list = question_repository.findQuestionsByQuestionBookId(dto.getQuestionBookId());
        return question_list;
    }
}
