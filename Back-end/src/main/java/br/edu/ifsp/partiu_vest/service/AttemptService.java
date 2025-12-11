package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AttemptQuestionRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptQuestionResponse;
import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptResponse;
import br.edu.ifsp.partiu_vest.model.*;
import br.edu.ifsp.partiu_vest.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class AttemptService {
    private final AttemptRepository attempt_repository;
    private final QuestionRepository question_repository;
    private final QuestionBookRepository question_book_repository;
    private final AttemptQuestionRepository attempt_question_repository;
    private final UserRepository user_repository;

    public AttemptService(AttemptRepository attemptRepository,
                          QuestionRepository questionRepository,
                          QuestionBookRepository questionBookRepository,
                          AttemptQuestionRepository attemptQuestionRepository,
                          UserRepository userRepository) {
        this.attempt_repository = attemptRepository;
        this.question_repository = questionRepository;
        this.question_book_repository = questionBookRepository;
        this.attempt_question_repository = attemptQuestionRepository;
        this.user_repository = userRepository;
    }

    public Attempt getAttemptById(AttemptRequest dto) {
        return attempt_repository.findById(dto.getId()).get();
    }

    public AttemptQuestion getAttemptQuestionById(Long id) {
        return attempt_question_repository.findById(id).get();
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

    public Question getQuestionByAttemptQuestionId(Long attempt_question_id) {
        return attempt_question_repository.findById(attempt_question_id).get().getQuestion();
    }

    public AttemptQuestionResponse commitQuestionAnswer(AttemptQuestionRequest dto) {
        Attempt attempt = attempt_repository.findById(dto.getAttempt_id()).get();
        AttemptQuestion user_attempt_question = attempt_question_repository.findById(dto.getId()).get();
        user_attempt_question.setDate(LocalDate.now());
        user_attempt_question.setUser_answer(dto.getUser_answer());
        attempt_question_repository.save(user_attempt_question);

        return new AttemptQuestionResponse(user_attempt_question.getId(), user_attempt_question.getQuestion().getId(), attempt.getId(), dto.getUser_answer(), user_attempt_question.getQuestion().getAnswer());
    }

    public AttemptResponse newAttempt(Long question_book_id, User user) {
        Attempt attempt = new Attempt();
        QuestionBook questionBook = question_book_repository.findById(question_book_id).get();
        attempt.setUser(user);
        attempt.setQuestion_book(questionBook);
        attempt.setStart_date(LocalDate.now());

        attempt_repository.save(attempt);

        List<Question> questions = question_repository.findQuestionsByQuestionBookId(question_book_id);
        questions.sort(Comparator.comparing(Question::getId));
        Iterator<Question> iterator = questions.iterator();
        HashSet<AttemptQuestion> attempt_questions = new HashSet<>();
        while (iterator.hasNext()) {
            AttemptQuestion aq = new AttemptQuestion(attempt, iterator.next(), null, null);
            attempt_questions.add(aq);

            attempt_question_repository.save(aq);
        }
        System.out.println(attempt);
        System.out.println(questions.size());
        System.out.println(questions);
        System.out.println(attempt_questions.size());
        System.out.println(attempt_questions);
        attempt.setQuestions(attempt_questions);

        AttemptResponse response = AttemptResponse.from(attempt);

        System.out.println(response.getQuestions_id());

        return response;
    }

    @Transactional
    public AttemptResponse finishAttempt(Long attemptId) {
        Attempt attempt = attempt_repository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Tentativa não encontrada"));

        User user = attempt.getUser();
        int acertos = 0;

        for (AttemptQuestion aq : attempt.getQuestions()) {
            if (aq.getUser_answer() != null &&
                    aq.getUser_answer().equalsIgnoreCase(aq.getQuestion().getAnswer())) {
                acertos++;
            }
        }

        int reward = acertos * 10;

        user.setXp(user.getXp() + reward);
        user.setPoints(user.getPoints() + reward);

        if (reward > 0) {
            user.setStreak();
        }

        attempt.setEnd_date(LocalDate.now());

        attempt_repository.save(attempt);
        user_repository.save(user);

        return AttemptResponse.from(attempt);
    }
}