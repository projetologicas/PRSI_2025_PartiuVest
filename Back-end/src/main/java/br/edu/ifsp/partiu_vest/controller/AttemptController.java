package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.AttemptService;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/attempt")
public class AttemptController {
    private final AttemptService attempt_service;

    public AttemptController(AttemptService attemptService) {
        attempt_service = attemptService;
    }

    @PostMapping("/")
    public ResponseEntity<AttemptResponse> getAttemptById(@Valid @RequestBody AttemptRequest dto) {
        Attempt attempt = attempt_service.getAttemptById(dto);
        AttemptResponse response = new AttemptResponse();
        return ResponseEntity.ok(response.from(attempt));
    }

    @PostMapping("/question_book")
    public ResponseEntity<HashSet<AttemptResponse>> getAttemptsByQuestionBook(@Valid @RequestBody AttemptRequest dto) {
        Set<Attempt> set = new HashSet<>(attempt_service.getAttemptsByQuestionBook(dto));
        Iterator<Attempt> iterator = set.iterator();
        HashSet<AttemptResponse> response = new HashSet<>();

        while (iterator.hasNext()) {
            AttemptResponse ar = AttemptResponse.from(iterator.next());
            response.add(ar);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/question_book_user")
    public ResponseEntity<Set<AttemptResponse>> getAttemptsByQuestionBookUser(@RequestParam(required = true) Long question_book_id, @AuthenticationPrincipal User user) {
        Set<Attempt> set = new HashSet<>(attempt_service.getAttemptsByQuestionBookUser(question_book_id, user));
        System.out.println(set);
        Iterator<Attempt> iterator = set.iterator();
        HashSet<AttemptResponse> response = new HashSet<>();

        while (iterator.hasNext()) {
            AttemptResponse ar = AttemptResponse.from(iterator.next());
            response.add(ar);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/attempted_questions")
    public ResponseEntity<Set<AttemptQuestionResponse>> getAttemptQuestions(@RequestParam(required = true) Long attempt_book_id) {
        HashSet<AttemptQuestion> set = new HashSet<>(attempt_service.getQuestionsByAttempt(attempt_book_id));
        Iterator<AttemptQuestion> iterator = set.iterator();
        HashSet<AttemptQuestionResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(AttemptQuestionResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/question_commit")
    public ResponseEntity<AttemptQuestionResponse> commitAttemptQuestion(@Valid @RequestBody AttemptQuestionRequest dto) {
        return ResponseEntity.ok(attempt_service.commitQuestionAnswer(dto));
    }
    @GetMapping("/question")
    public ResponseEntity<QuestionResponse> getQuestionByAttemptQuestionId(@RequestParam(required = true) Long attempt_question_id) {
        return ResponseEntity.ok(QuestionResponse.from(attempt_service.getQuestionByAttemptQuestionId(attempt_question_id)));
    }
    @GetMapping("/attempt_question")
    public ResponseEntity<AttemptQuestionResponse> getAttemptQuestionById(@RequestParam(required = true) Long attempt_question_id) {
        return ResponseEntity.ok(AttemptQuestionResponse.from(attempt_service.getAttemptQuestionById(attempt_question_id)));
    }

    @PostMapping("/new")
    public ResponseEntity<AttemptResponse> newAttempt(@Valid @RequestBody AttemptRequest dto, @AuthenticationPrincipal User user) {
        System.out.println(dto.getQuestion_book_id());
        return ResponseEntity.ok(attempt_service.newAttempt(dto.getQuestion_book_id(), user));
    }

    @PostMapping("/finish")
    public ResponseEntity<AttemptResponse> finishAttempt(@RequestBody AttemptRequest dto) {
        return ResponseEntity.ok(attempt_service.finishAttempt(dto.getId()));
    }
}
