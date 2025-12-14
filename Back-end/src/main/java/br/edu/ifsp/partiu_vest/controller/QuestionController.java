package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionResponse;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/question")
@Tag(name = "Questões (Question)", description = "Endpoints para obter dados brutos das questões por ID ou por Question Book.")
@SecurityRequirement(name = "Bearer Token")
public class QuestionController {
    private final QuestionService question_service;

    public QuestionController(QuestionService questionService) {
        question_service = questionService;
    }

    @GetMapping("/")
    @Operation(summary = "Obter Questão por ID",
            description = "Busca uma questão específica pelo seu ID.")
    @Parameter(name = "question_id", description = "ID da questão.", required = true, example = "10")
    @ApiResponse(responseCode = "200", description = "Questão encontrada.",
            content = @Content(schema = @Schema(implementation = QuestionResponse.class)))
    @ApiResponse(responseCode = "404", description = "Questão não encontrada.",
            content = @Content)
    public ResponseEntity<QuestionResponse> getQuestion(@RequestParam(required = true) Long question_id) {
        Question question = question_service.getQuestionById(question_id);
        return ResponseEntity.ok(QuestionResponse.from(question));
    }

    @GetMapping("/question_book")
    @Operation(summary = "Listar Questões de um Caderno",
            description = "Retorna uma lista de todas as questões pertencentes a um determinado `Question Book`.")
    @Parameter(name = "question_book_id", description = "ID do caderno de questões.", required = true, example = "1")
    @ApiResponse(responseCode = "200", description = "Lista de questões retornada com sucesso.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = QuestionResponse.class))))
    @ApiResponse(responseCode = "404", description = "Caderno de questões não encontrado.",
            content = @Content)
    public ResponseEntity<List<QuestionResponse>> getQuestionsByQuestionBook(@RequestParam(required = true) Long question_book_id) {
        List<Question> set = new LinkedList<>(question_service.getQuestionsByQuestionBook(question_book_id));
        Iterator<Question> iterator = set.iterator();
        List<QuestionResponse> response = new LinkedList<>();

        while (iterator.hasNext()) {
            QuestionResponse ar = QuestionResponse.from(iterator.next());
            response.add(ar);
        }
        response.sort(Comparator.comparing(QuestionResponse::getId));
        return ResponseEntity.ok(response);
    }
}