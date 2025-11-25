package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.dto.QuestionRequest;
import br.edu.ifsp.partiu_vest.dto.QuestionResponse;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class QuestionController {
    private final QuestionService question_service;

    public QuestionController(QuestionService questionService) {
        question_service = questionService;
    }

    @PostMapping("/")
    public ResponseEntity<QuestionResponse> getQuestion(@Valid @RequestBody QuestionRequest dto) {
        Question question = question_service.getQuestionById(dto);
        return ResponseEntity.ok(QuestionResponse.from(question));
    }
}
