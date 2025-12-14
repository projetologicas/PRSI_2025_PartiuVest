package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionBookDTO;
import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.service.QuestionBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/question_book")
@Tag(name = "Livro de Questões", description = "Gerenciamento e listagem de cadernos e provas de questões (Question Books).")
@SecurityRequirement(name = "Bearer Token")
public class QuestionBookController {
    private final QuestionBookService questionBookService;

    public QuestionBookController(QuestionBookService questionBookService) {
        this.questionBookService = questionBookService;
    }

    @GetMapping("/")
    @Operation(summary = "Listar todos os Cadernos de Questões",
            description = "Retorna uma lista de todos os 'Question Books' disponíveis no sistema.")
    @ApiResponse(responseCode = "200", description = "Lista de cadernos retornada com sucesso.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = QuestionBookResponse.class)))) // Usa ArraySchema para retornar uma lista/Set
    public ResponseEntity<Set<QuestionBookResponse>> getAllQuestionBook() {
        Iterator<QuestionBook> iterator = questionBookService.getAllQuestionBook().iterator();
        HashSet<QuestionBookResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(QuestionBookResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/id")
    @Operation(summary = "Obter Caderno de Questões por ID",
            description = "Retorna os detalhes de um 'Question Book' específico usando seu ID.")
    @Parameter(name = "question_book_id", description = "ID do caderno de questões.", required = true, example = "1")
    @ApiResponse(responseCode = "200", description = "Caderno de questões encontrado.",
            content = @Content(schema = @Schema(implementation = QuestionBookResponse.class)))
    @ApiResponse(responseCode = "404", description = "Caderno de questões não encontrado.",
            content = @Content)
    public ResponseEntity<QuestionBookResponse> getQuestionBook(@RequestParam(required = true) Long question_book_id) {
        QuestionBook questionBook = questionBookService.getQuestionBook(question_book_id);
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new")
    @Operation(summary = "Criar Novo Caderno Aleatório",
            description = "Cria e salva um novo 'Question Book' com uma seleção aleatória de questões (útil para provas simuladas).")
    @ApiResponse(responseCode = "200", description = "Caderno criado e retornado com sucesso.",
            content = @Content(schema = @Schema(implementation = QuestionBookResponse.class)))
    public ResponseEntity<QuestionBookResponse> addRandomQuestionBook() {
        QuestionBook questionBook = questionBookService.createRandomExam();
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new/custom")
    @Operation(summary = "Criar Novo Caderno Personalizado",
            description = "Cria um novo 'Question Book' com base em critérios fornecidos no corpo da requisição.")
    @ApiResponse(responseCode = "200", description = "Caderno personalizado criado e retornado.",
            content = @Content(schema = @Schema(implementation = QuestionBook.class)))
    public ResponseEntity<QuestionBook> createCustomBook(
            @RequestBody QuestionBookDTO request
    ) {
        QuestionBook questionBook = questionBookService.createCustom(request);
        return ResponseEntity.ok(questionBook);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir Caderno de Questões",
            description = "Exclui um 'Question Book' pelo seu ID. Requer permissão de Admin (embora não esteja no AdminController, assume-se que é uma ação administrativa).")
    @Parameter(name = "id", description = "ID do Caderno de Questões a ser excluído.", required = true, example = "5")
    @ApiResponse(responseCode = "204", description = "Exclusão bem-sucedida (No Content).",
            content = @Content)
    @ApiResponse(responseCode = "404", description = "Caderno de questões não encontrado.",
            content = @Content)
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        questionBookService.deleteQuestionBook(id);
        return ResponseEntity.noContent().build();
    }
}