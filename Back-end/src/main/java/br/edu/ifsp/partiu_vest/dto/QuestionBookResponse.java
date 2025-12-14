package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta contendo os detalhes básicos de um 'Question Book'.")
public class QuestionBookResponse {
    @Schema(description = "ID único do Caderno de Questões.", example = "5")
    private Long id;

    @Schema(description = "Data de criação do caderno.", example = "2023-11-20")
    private Date creation_date;

    @Schema(description = "Modelo ou descrição do caderno (ex: 'Simulado ENEM 2022').", example = "Simulado Matemática ENEM")
    private String model;

    @Schema(description = "Indica se o caderno foi gerado aleatoriamente (randomly generated).", example = "true")
    boolean r_generated;

    @Schema(description = "Lista de IDs das questões que compõem este caderno.")
    private Set<Long> questions_id;

    public static QuestionBookResponse from(QuestionBook questionBook) {
        var response = new QuestionBookResponse();
        response.id = questionBook.getId();
        response.creation_date = questionBook.getCreation_date();
        response.model = questionBook.getModel();
        response.r_generated = questionBook.isR_generated();
        HashSet<Question> questions = new HashSet<>(questionBook.getQuestions());
        Iterator<Question> iterator = questions.iterator();
        response.questions_id = new HashSet<>();
        while (iterator.hasNext()) {
            response.questions_id.add(iterator.next().getId());
        }
        return response;
    }

    public QuestionBookResponse(Long id, Date creation_date, String model, boolean r_generated, Set<Question> questions) {
        this.id = id;
        this.creation_date = creation_date;
        this.model = model;
        this.r_generated = r_generated;
        Iterator<Question> iterator = questions.iterator();
        this.questions_id = new HashSet<>();
        while (iterator.hasNext()) {
            this.questions_id.add(iterator.next().getId());
        }
    }

    public QuestionBookResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public boolean isR_generated() {
        return r_generated;
    }

    public void setR_generated(boolean r_generated) {
        this.r_generated = r_generated;
    }

    public Set<Long> getQuestions_id() {
        return questions_id;
    }

    public void setQuestions_id(Set<Long> questions_id) {
        this.questions_id = questions_id;
    }
}