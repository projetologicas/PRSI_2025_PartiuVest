package br.edu.ifsp.partiu_vest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Estrutura para a importação de uma única Questão (Question)")
public record QuestionJsonDTO(
        @NotBlank(message = "O enunciado da questão é obrigatório")
        @Schema(description = "Texto completo do enunciado da questão", example = "Qual é a capital do Brasil?")
        String statement,

        @NotBlank(message = "A resposta correta é obrigatória")
        @Size(max = 1, message = "A resposta deve ser uma única letra (A, B, C, D ou E)")
        @Schema(description = "Letra da opção correta (A, B, C, D ou E)", example = "C")
        String answer,

        @NotBlank(message = "A opção A é obrigatória")
        @Schema(description = "Texto da Opção A", example = "Rio de Janeiro")
        String optionA,

        @NotBlank(message = "A opção B é obrigatória")
        @Schema(description = "Texto da Opção B", example = "São Paulo")
        String optionB,

        @NotBlank(message = "A opção C é obrigatória")
        @Schema(description = "Texto da Opção C", example = "Brasília")
        String optionC,

        @NotBlank(message = "A opção D é obrigatória")
        @Schema(description = "Texto da Opção D", example = "Salvador")
        String optionD,

        @NotBlank(message = "A opção E é obrigatória")
        @Schema(description = "Texto da Opção E", example = "Belo Horizonte")
        String optionE,

        @NotBlank(message = "A explicação é obrigatória")
        @Schema(description = "Explicação detalhada da resposta correta", example = "A capital do Brasil é Brasília, desde 1960.")
        String explanation
) {}