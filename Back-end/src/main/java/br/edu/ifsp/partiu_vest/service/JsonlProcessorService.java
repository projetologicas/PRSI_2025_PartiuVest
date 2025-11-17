package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.JsonlSource;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class JsonlProcessorService {
    private final ObjectMapper objectMapper;
    private final QuestionRepository questionRepository;
    private final QuestionBookRepository questionBookRepository;

    public JsonlProcessorService(ObjectMapper objectMapper, QuestionRepository questionRepository, QuestionBookRepository questionBookRepository) {
        this.objectMapper = objectMapper;
        this.questionRepository = questionRepository;
        this.questionBookRepository = questionBookRepository;
    }

    @Transactional
    public void importQuestions(String nomeArquivo) {
        String[] parts = nomeArquivo.split("[/\\\\]");
        String filename = parts[parts.length - 1];
        String bookName = filename.split("\\.")[0];

        QuestionBook questionBook = findOrCreateQuestionBook(bookName);

        URL resource = getClass().getClassLoader().getResource(nomeArquivo);

        if (resource == null) {
            System.err.println("Erro critico: Arquivo " + nomeArquivo + " não encontrado na pasta resources!");
            return;
        }

        Path path;
        try {
            path = Paths.get(resource.toURI());
        } catch (URISyntaxException ex) {
            System.err.println("Erro: Caminho do arquivo inválido: " + ex.getMessage());
            return;
        }

        try(Stream<String> lines = Files.lines(path)){
            List<Question> questions = lines
                    // 2. CORREÇÃO DE ESCOPO: Passa questionBook para o mapeamento
                    .map(line -> mapLineToQuestion(line, questionBook))
                    .filter(q -> q != null)
                    .collect(Collectors.toList());

            System.out.println(">>>> Encontradas " + questions.size() + " questões válidas para salvar. <<<<");

            if (!questions.isEmpty()) {
                questionRepository.saveAll(questions);
                System.out.println("SUCESSO: Salvas " + questions.size() + " questões para a Prova [" + bookName + "].");
            } else {
                System.err.println("AVISO: A lista de questões está vazia. O arquivo pode estar vazio ou ocorreu um erro de mapeamento CRÍTICO (Verifique o System.err acima).");
            }
        }catch(IOException ex){
            System.err.println("ERRO DE I/O ao ler arquivo: " + ex.getMessage());
        }

    }

    private QuestionBook findOrCreateQuestionBook(String name) {
        return questionBookRepository.findByModel(name)
                .orElseGet(() -> {
                    QuestionBook newBook = new QuestionBook();
                    newBook.setModel(name);
                    newBook.setCreation_date();
                    newBook.setR_generated(false);

                    System.out.println("Criando nova QuestionBook: " + name);
                    return questionBookRepository.save(newBook);
                });
    }

    private Question mapLineToQuestion(String line, QuestionBook questionBook){
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

            Question newQuestion = new Question(
                    number,
                    source.getQuestion(),
                    descImg,
                    enunA,
                    enunB,
                    enunC,
                    enunD,
                    enunE,
                    source.getLabel());

            Set<QuestionBook> questionBooksSet = new HashSet<>();
            questionBooksSet.add(questionBook);
            newQuestion.setQuestionBook(questionBooksSet);
            return newQuestion;

        }catch(Exception ex) {
            System.err.println("Erro critico ao processar linha JSONL. Linha ignorada.");
            System.err.println("Causa: " + ex.getMessage());
            ex.printStackTrace(System.err);
            System.err.println("Linha que causou o erro: " + line.substring(0, Math.min(line.length(), 100)) + "...");
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