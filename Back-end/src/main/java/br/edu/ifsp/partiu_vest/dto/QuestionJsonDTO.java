package br.edu.ifsp.partiu_vest.dto;

public record QuestionJsonDTO(
        String statement,
        String answer,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        String optionE,
        String explanation
) {}