package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.QuestionBookDTO;
import br.edu.ifsp.partiu_vest.dto.QuestionBookResponse;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.QuestionBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @Operation(summary = "Listar Cadernos de Questões Disponíveis",
            description = "Retorna todos os cadernos oficiais E os cadernos personalizados criados pelo próprio usuário.")
    public ResponseEntity<Set<QuestionBookResponse>> getAllQuestionBook(@AuthenticationPrincipal User user) {
        // Passamos o usuário para o serviço filtrar
        Iterator<QuestionBook> iterator = questionBookService.getAvailableBooks(user).iterator();
        HashSet<QuestionBookResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(QuestionBookResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/id")
    @Operation(summary = "Obter Caderno de Questões por ID")
    public ResponseEntity<QuestionBookResponse> getQuestionBook(@RequestParam(required = true) Long question_book_id) {
        QuestionBook questionBook = questionBookService.getQuestionBook(question_book_id);
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new")
    @Operation(summary = "Criar Novo Caderno Aleatório")
    public ResponseEntity<QuestionBookResponse> addRandomQuestionBook(@AuthenticationPrincipal User user) {
        // Passamos o usuário para definir o dono
        QuestionBook questionBook = questionBookService.createRandomExam(user);
        return ResponseEntity.ok(QuestionBookResponse.from(questionBook));
    }

    @PostMapping("/new/custom")
    @Operation(summary = "Criar Novo Caderno Personalizado")
    public ResponseEntity<QuestionBook> createCustomBook(
            @RequestBody QuestionBookDTO request,
            @AuthenticationPrincipal User user
    ) {
        QuestionBook questionBook = questionBookService.createCustom(request, user);
        return ResponseEntity.ok(questionBook);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir Caderno de Questões",
            description = "Exclui um caderno. Usuários comuns só podem excluir seus próprios cadernos personalizados.")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id, @AuthenticationPrincipal User user) {
        questionBookService.deleteQuestionBook(id, user);
        return ResponseEntity.noContent().build();
    }
}