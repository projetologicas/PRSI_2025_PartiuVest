package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.service.QuestionBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@RestController
@RequestMapping("/question_book")
public class QuestionBookController {
    private final QuestionBookService questionBookService;

    public QuestionBookController(QuestionBookService questionBookService) {
        this.questionBookService = questionBookService;
    }

    @GetMapping("/")
    public ResponseEntity<Set<QuestionBookResponse>> getAllQuestionBook() {
        Iterator<QuestionBook> iterator = questionBookService.getAllQuestionBook().iterator();
        HashSet<QuestionBookResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(QuestionBookResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/id")
    public ResponseEntity<QuestionBookResponse> getQuestionBook(@RequestParam(required = true) Long question_book_id) {
        QuestionBook questionBook = questionBookService.getQuestionBook(question_book_id);
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new")
    public ResponseEntity<QuestionBookResponse> addRandomQuestionBook() {
        QuestionBook questionBook = questionBookService.createRandomExam();
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }
}
