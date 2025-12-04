package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AttemptQuestionRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptQuestionResponse;
import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptResponse;
import br.edu.ifsp.partiu_vest.model.*;
import br.edu.ifsp.partiu_vest.repository.AttemptQuestionRepository;
import br.edu.ifsp.partiu_vest.repository.AttemptRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

@Service
public class AttemptService {
    private final AttemptRepository attempt_repository;
    private final QuestionRepository question_repository;
    private final QuestionBookRepository question_book_repository;
    private final AttemptQuestionRepository attempt_question_repository;

    public AttemptService(AttemptRepository attemptRepository, QuestionRepository questionRepository, QuestionBookRepository questionBookRepository, AttemptQuestionRepository attemptQuestionRepository) {
        attempt_repository = attemptRepository;
        question_repository = questionRepository;
        question_book_repository = questionBookRepository;
        attempt_question_repository = attemptQuestionRepository;
    }

    public Attempt getAttemptById(AttemptRequest dto) {
        return attempt_repository.findById(dto.getId()).get();
    }

    public List<Attempt> getAttemptsByQuestionBook(AttemptRequest dto) {
        return attempt_repository.findByQuestionBook(dto.getQuestion_book_id());
    }
    public List<Attempt> getAttemptsByQuestionBookUser(Long question_book_id, User user) {
        return attempt_repository.findByQuestionBookUser(question_book_id, user.getId());
    }

    public List<AttemptQuestion> getQuestionsByAttempt(Long attempt_book_id) {
        return attempt_question_repository.getAttemptQuestionsByAttemptId(attempt_book_id);
    }

    public AttemptQuestionResponse commitQuestionAnswer(AttemptQuestionRequest dto) {
        Attempt attempt = attempt_repository.findById(dto.getAttempt_id()).get();
        AttemptQuestion user_attempt_question = attempt_question_repository.findById(dto.getId()).get();
        user_attempt_question.setDate(LocalDate.now());
        user_attempt_question.setUser_answer(dto.getUser_answer());
        attempt_question_repository.save(user_attempt_question);

        return new AttemptQuestionResponse(user_attempt_question.getId(), attempt.getId(), dto.getUser_answer(), user_attempt_question.getQuestion().getAnswer());
    }

    public AttemptResponse newAttempt(Long question_book_id, User user) {
        Attempt attempt = new Attempt();
        QuestionBook questionBook = question_book_repository.findById(question_book_id).get();
        attempt.setUser(user);
        attempt.setQuestion_book(questionBook);
        attempt.setStart_date(LocalDate.now());

        System.out.println(attempt);

        attempt_repository.save(attempt);

        System.out.println(attempt);

        HashSet<Question> questions = new HashSet<>(question_repository.findQuestionsByQuestionBookId(question_book_id));
        System.out.println(questions.size());
        Iterator<Question> iterator = questions.iterator();
        HashSet<AttemptQuestion> attempt_questions = new HashSet<>();
        while (iterator.hasNext()) {
            AttemptQuestion aq = new AttemptQuestion(attempt, iterator.next(), null, null);
            attempt_questions.add(aq);

            attempt_question_repository.save(aq);
        }
        System.out.println(attempt_questions.size());
        attempt.setQuestions(attempt_questions);

        AttemptResponse response = AttemptResponse.from(attempt);

        System.out.println(response);

        return response;
    }
}
