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
@Service
public class QuestionBookService {
    private final QuestionBookRepository questionBookRepository;
    private final QuestionRepository questionRepository;

    public QuestionBookService(QuestionBookRepository questionBookRepository, QuestionRepository questionRepository) {
        this.questionBookRepository = questionBookRepository;
        this.questionRepository = questionRepository;
    }

    @Transactional
    public QuestionBook createRandomExam(){
        List<Question> allQuestions = questionRepository.findAll();
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

        QuestionBook savedExam = questionBookRepository.save(randomExam);
        questionRepository.saveAll(randomQuestions);
        return savedExam;
    }
}
