package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.AttemptResponse;
import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.dto.QuestionRequest;
import br.edu.ifsp.partiu_vest.dto.QuestionResponse;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@RestController
@RequestMapping("/question")
public class QuestionController {
    private final QuestionService question_service;

    public QuestionController(QuestionService questionService) {
        question_service = questionService;
    }

    @GetMapping("/")
    public ResponseEntity<QuestionResponse> getQuestion(@RequestParam(required = true) Long question_id) {
        Question question = question_service.getQuestionById(question_id);
        return ResponseEntity.ok(QuestionResponse.from(question));
    }

    @GetMapping("/question_book")
    public ResponseEntity<Set<QuestionResponse>> getQuestionsByQuestionBook(@RequestParam(required = true) Long question_book_id) {
        Set<Question> set = new HashSet<>(question_service.getQuestionsByQuestionBook(question_book_id));
        Iterator<Question> iterator = set.iterator();
        HashSet<QuestionResponse> response = new HashSet<>();

        while (iterator.hasNext()) {
            QuestionResponse ar = QuestionResponse.from(iterator.next());
            response.add(ar);
        }
        return ResponseEntity.ok(response);
    }
}
