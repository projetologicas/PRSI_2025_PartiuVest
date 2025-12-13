package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.QuestionBookDTO; // ou QuestionBookRequestDTO se tiver alterado
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionBookService {
    private final QuestionBookRepository question_book_repository;
    private final QuestionRepository question_repository;

    public QuestionBookService(QuestionBookRepository question_book_repository, QuestionRepository question_repository) {
        this.question_book_repository = question_book_repository;
        this.question_repository = question_repository;
    }

    public List<Question> getQuestionsFromQuestionBook(Long question_book_id) {
        return question_repository.findQuestionsByQuestionBookId(question_book_id);
    }

    public QuestionBook getQuestionBook(Long question_book_id) {
        return question_book_repository.findById(question_book_id).orElseThrow();
    }

    public Set<QuestionBook> getAllQuestionBook() {
        return new HashSet<>(question_book_repository.findAll());
    }

    @Transactional
    public QuestionBook createRandomExam(){
        List<Question> allQuestions = question_repository.findAll();
        final int count = 90;

        if(allQuestions.size() < count){
            throw new IllegalStateException("Não existem questoes suficientes");
        }
        Collections.shuffle(allQuestions);
        Set<Question> randomQuestions = new HashSet<>(allQuestions.subList(0, count));

        return saveNewBook(randomQuestions, "Aleatorio");
    }

    @Transactional
    public QuestionBook createCustom(QuestionBookDTO request) {
        int amount = request.amount();
        List<Long> sourceIds = request.yearsIds();

        if (sourceIds == null || sourceIds.isEmpty()) {
            throw new IllegalArgumentException("Selecione pelo menos um ano para gerar o simulado.");
        }

        List<Question> poolOfQuestions = new ArrayList<>();

        for (Long bookId : sourceIds) {
            poolOfQuestions.addAll(question_repository.findQuestionsByQuestionBookId(bookId));
        }

        Set<Question> uniquePool = new HashSet<>(poolOfQuestions);
        List<Question> finalPool = new ArrayList<>(uniquePool);

        if (finalPool.size() < amount) {
            throw new IllegalStateException("Não há questões suficientes nos cadernos selecionados. " +
                    "Disponível: " + finalPool.size() + ", Solicitado: " + amount);
        }

        Collections.shuffle(finalPool);
        Set<Question> selectedQuestions = new HashSet<>(finalPool.subList(0, amount));

        return saveNewBook(selectedQuestions, "Personalizado (" + amount + " questões)");
    }

    @Transactional
    public void deleteQuestionBook(Long id) {
        QuestionBook book = question_book_repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Caderno não encontrado"));

        if (!book.isR_generated()) {
            throw new IllegalArgumentException("Não é permitido deletar cadernos oficiais (vestibulares originais).");
        }

        question_book_repository.delete(book);
    }

    private QuestionBook saveNewBook(Set<Question> questions, String modelName) {
        QuestionBook newBook = new QuestionBook();
        newBook.setCreation_date();
        newBook.setModel(modelName);
        newBook.setR_generated(true);
        newBook.setQuestions(questions);

        return question_book_repository.save(newBook);
    }
}