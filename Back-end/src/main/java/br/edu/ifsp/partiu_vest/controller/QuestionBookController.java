package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionBookRequest;
import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.service.QuestionBookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question_book")
public class QuestionBookController {
    private final QuestionBookService questionBookService;

    public QuestionBookController(QuestionBookService questionBookService) {
        this.questionBookService = questionBookService;
    }

    @PostMapping("/")
    public ResponseEntity<QuestionBookResponse> getQuestionBook(@Valid @RequestBody QuestionBookRequest dto) {
        QuestionBook questionBook = questionBookService.getQuestionBook(dto);
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new")
    public ResponseEntity<QuestionBookResponse> addRandomQuestionBook() {
        QuestionBook questionBook = questionBookService.createRandomExam();
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }
}
