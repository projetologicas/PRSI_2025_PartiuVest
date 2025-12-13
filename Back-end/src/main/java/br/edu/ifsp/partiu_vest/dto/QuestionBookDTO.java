package br.edu.ifsp.partiu_vest.dto;

import java.util.List;

public record QuestionBookDTO(
        Integer amount,
        List<Long> yearsIds
) {}