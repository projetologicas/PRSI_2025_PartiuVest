package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.JsonlSource;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JsonlProcessorService {
    private final ObjectMapper objectMapper;
    private final QuestionRepository questionRepository;
    public JsonlProcessorService(ObjectMapper objectMapper, QuestionRepository questionRepository) {
        this.objectMapper = objectMapper;
        this.questionRepository = questionRepository;
    }
    public void importQuestions(String paths){
        Path path = Path.of(paths);

        try(Stream<String> lines = Files.lines(path)){
            List<Question> questions = lines
                    .map(this::mapLineToQuestion)
                    .filter(q -> q != null)
                    .collect(Collectors.toList());
            questionRepository.saveAll(questions);
        }catch(IOException ex){
            System.err.println(ex.getMessage());
        }

    }
    private Question mapLineToQuestion(String line){
        try{
            JsonlSource source = objectMapper.readValue(line, JsonlSource.class);
            Integer number = extractQuestionNumber(source.getId());
            String descImg = String.join("\n", source.getDescription());
            List<String> alternatives = source.getAlternatives();
            String enunA = alternatives.size() > 0 ? alternatives.get(0) : "";
            String enunB = alternatives.size() > 1 ? alternatives.get(1) : "";
            String enunC = alternatives.size() > 2 ? alternatives.get(2) : "";
            String enunD = alternatives.size() > 3 ? alternatives.get(3) : "";
            String enunE = alternatives.size() > 4 ? alternatives.get(4) : "";
            return new Question(
                    source.getId(),
                    number,
                    source.getQuestion(),
                    descImg,
                    enunA,
                    enunB,
                    enunC,
                    enunD,
                    enunE,
                    source.getLabel());
        }catch(Exception ex) {
            System.err.println("Error in processing Jsonl file" + ex.getMessage());
            return null;
        }
    }
    private Integer extractQuestionNumber(String id){
        try{
            String numStr = id.substring(id.lastIndexOf('_')+1);
            return Integer.parseInt(numStr);
        }catch(Exception ex){
            return null;
        }
    }
}
