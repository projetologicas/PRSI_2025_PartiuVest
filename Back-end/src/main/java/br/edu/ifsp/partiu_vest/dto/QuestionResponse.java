package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import jakarta.persistence.Column;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta contendo todos os dados de uma questão, incluindo gabarito e alternativas.")
public class QuestionResponse {
    @Schema(description = "ID único da questão.", example = "10")
    private Long id;

    @Schema(description = "Enunciado da questão (corpo do texto principal).", example = "Qual é a capital do Brasil?")
    private String title;

    @Schema(description = "Descrição ou URL de imagem/mídia associada à questão, se houver.", example = "http://imagem.com/grafico1.png", nullable = true)
    private String image_desc;

    @Schema(description = "Texto da Alternativa A.", example = "São Paulo")
    private String enum_a;

    @Schema(description = "Texto da Alternativa B.", example = "Rio de Janeiro")
    private String enum_b;

    @Schema(description = "Texto da Alternativa C.", example = "Brasília")
    private String enum_c;

    @Schema(description = "Texto da Alternativa D.", example = "Salvador")
    private String enum_d;

    @Schema(description = "Texto da Alternativa E.", example = "Belo Horizonte", nullable = true)
    private String enum_e;

    @Schema(description = "Gabarito da questão (A, B, C, D ou E). Nota: Este campo é sensível e pode ser omitido em endpoints públicos.", example = "C")
    private String answer;

    @Schema(description = "Número sequencial da questão dentro do caderno de origem.", example = "1")
    private int number;

    @Schema(description = "ID do Question Book original que contém esta questão.", example = "5")
    private Long original_question_book_id;

    // Métodos (from, construtores, getters e setters - Mantidos)
    // ...
    public static QuestionResponse from(Question question) {
        var response = new QuestionResponse();
        response.id = question.getId();
        response.title = question.getTitle();
        response.image_desc = question.getImage_desc();
        response.enum_a = question.getEnum_a();
        response.enum_b = question.getEnum_b();
        response.enum_c = question.getEnum_c();
        response.enum_d = question.getEnum_d();
        response.enum_e = question.getEnum_e();
        response.answer = question.getAnswer();
        response.number = question.getNumber();
        response.original_question_book_id = question.getQuestion_book().getId();
        return response;
    }

    public QuestionResponse(Long id, String title, String image_desc, String enum_a, String enum_b, String enum_c, String enum_d, String enum_e, String answer, int number, Long original_question_book_id) {
        this.id = id;
        this.title = title;
        this.image_desc = image_desc;
        this.enum_a = enum_a;
        this.enum_b = enum_b;
        this.enum_c = enum_c;
        this.enum_d = enum_d;
        this.enum_e = enum_e;
        this.answer = answer;
        this.number = number;
        this.original_question_book_id = original_question_book_id;
    }

    public QuestionResponse() {
    }

    public Long getOriginal_question_book_id() {
        return original_question_book_id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getEnum_e() {
        return enum_e;
    }

    public void setEnum_e(String enum_e) {
        this.enum_e = enum_e;
    }

    public void setOriginal_question_book_id(Long original_question_book_id) {
        this.original_question_book_id = original_question_book_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage_desc() {
        return image_desc;
    }

    public void setImage_desc(String image_desc) {
        this.image_desc = image_desc;
    }

    public String getEnum_a() {
        return enum_a;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setEnum_a(String enum_a) {
        this.enum_a = enum_a;
    }

    public String getEnum_b() {
        return enum_b;
    }

    public void setEnum_b(String enum_b) {
        this.enum_b = enum_b;
    }

    public String getEnum_c() {
        return enum_c;
    }

    public void setEnum_c(String enum_c) {
        this.enum_c = enum_c;
    }

    public String getEnum_d() {
        return enum_d;
    }

    public void setEnum_d(String enum_d) {
        this.enum_d = enum_d;
    }
}