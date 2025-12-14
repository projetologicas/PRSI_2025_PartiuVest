package br.edu.ifsp.partiu_vest.dto;
import java.util.List;

public record ExamJsonDTO(
        String title,
        String description,
        List<QuestionJsonDTO> questions
) {}