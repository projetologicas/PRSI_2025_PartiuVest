package br.edu.ifsp.partiu_vest.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para criar um 'Question Book' personalizado.")
public record QuestionBookDTO(
        @Schema(description = "Número de questões desejadas para o caderno.", example = "50")
        Integer amount,
        @Schema(description = "Lista de IDs dos anos (ou temas) que devem ser incluídos nas questões (Ex: [2022, 2021]).", example = "[1, 3, 5]")
        List<Long> yearsIds
) {}