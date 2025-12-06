package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import java.util.*;

@Service
public class QuestionBookService {
    private final QuestionBookRepository question_book_repository;
    private final QuestionRepository question_repository;

    public QuestionBookService(QuestionBookRepository question_book_repository, QuestionRepository question_repository) {
        this.question_book_repository = question_book_repository;
        this.question_repository = question_repository;
    }

    public List<Question> getQuestionsFromQuestionBook(Long question_book_id) {
        List<Question> question_list = question_repository.findQuestionsByQuestionBookId(question_book_id);
        return question_list;
    }

    public QuestionBook getQuestionBook(Long question_book_id) {
        Optional<QuestionBook> questionBook = question_book_repository.findById(question_book_id);
        return questionBook.get();
    }

    public Set<QuestionBook> getAllQuestionBook() {
        return new HashSet<>(question_book_repository.findAll());
    }
    @Transactional
    public QuestionBook createRandomExam(){
        List<Question> allQuestions = question_repository.findAll();
        final int count = 90;

        if(allQuestions.size() < count){
            throw new IllegalStateException("Não existem questoes suficientes");
        }
        Collections.shuffle(allQuestions);
        Set<Question> randomQuestions = new HashSet<>(allQuestions.subList(0, count));

        QuestionBook randomExam = new QuestionBook();
        randomExam.setCreation_date();
        randomExam.setModel("Aleatorio");
        randomExam.setR_generated(true);
        randomExam.setQuestions(randomQuestions);

        QuestionBook savedExam = question_book_repository.save(randomExam);
        question_repository.saveAll(randomQuestions);
        return savedExam;
    }
}

