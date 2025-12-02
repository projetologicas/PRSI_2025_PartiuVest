package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.AttemptQuestionRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptQuestionResponse;
import br.edu.ifsp.partiu_vest.dto.AttemptRequest;
import br.edu.ifsp.partiu_vest.dto.AttemptResponse;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.service.AttemptService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

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
        return ResponseEntity.ok(AttemptResponse.from(attempt));
    }

    @PostMapping("/attempts")
    public ResponseEntity<AttemptResponse> getAttemptsByQuestionBook(@Valid @RequestBody AttemptRequest dto) {
        Set<Attempt> set = new HashSet<Attempt>(attempt_service.getAttemptsByQuestionBook(dto));
        return ResponseEntity.ok(new AttemptResponse(set));
    }

    @PostMapping("/attempt/question")
    public ResponseEntity<AttemptQuestionResponse> commitAttemptQuestion(@Valid @RequestBody AttemptQuestionRequest dto) {
        return ResponseEntity.ok(attempt_service.commitQuestionAnswer(dto));
    }
}
