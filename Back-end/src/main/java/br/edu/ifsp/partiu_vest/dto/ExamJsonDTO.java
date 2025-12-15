package br.edu.ifsp.partiu_vest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

@Schema(description = "Estrutura completa para importação de um Simulado (Exam) e suas questões")
public record ExamJsonDTO(
        @NotBlank(message = "O título não pode estar em branco")
        @Schema(description = "Título do Simulado (ex: ENEM 2024)", example = "ENEM 2024 - Prova Azul")
        String title,

        @NotBlank(message = "A descrição não pode estar em branco")
        @Schema(description = "Breve descrição sobre o simulado", example = "Simulado contendo 90 questões de todas as áreas.")
        String description,

        @NotEmpty(message = "É necessário ter pelo menos uma questão")
        @Schema(description = "Lista de questões que compõem este simulado")
        List<QuestionJsonDTO> questions
) {}