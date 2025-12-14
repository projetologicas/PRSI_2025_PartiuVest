package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.ExamJsonDTO;
import br.edu.ifsp.partiu_vest.dto.QuestionBookDTO;
import br.edu.ifsp.partiu_vest.dto.QuestionJsonDTO;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;
import br.edu.ifsp.partiu_vest.repository.QuestionBookRepository;
import br.edu.ifsp.partiu_vest.repository.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public Set<QuestionBook> getAvailableBooks(User user) {
        List<QuestionBook> allBooks = question_book_repository.findAll();

        return allBooks.stream()
                .filter(book -> !book.isR_generated() || (book.getUser() != null && book.getUser().getId().equals(user.getId())))
                .collect(Collectors.toSet());
    }

    public Set<QuestionBook> getAllQuestionBook() {
        return new HashSet<>(question_book_repository.findAll());
    }

    @Transactional
    public QuestionBook createRandomExam(User user){
        List<Question> allQuestions = question_repository.findAll();
        final int count = 90;

        if(allQuestions.size() < count){
            throw new IllegalStateException("Não existem questoes suficientes");
        }
        Collections.shuffle(allQuestions);
        Set<Question> randomQuestions = new HashSet<>(allQuestions.subList(0, count));

        return saveNewBook(randomQuestions, "Aleatorio", user);
    }

    @Transactional
    public QuestionBook createCustom(QuestionBookDTO request, User user) {
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
            throw new IllegalStateException("Não há questões suficientes. Disponível: " + finalPool.size());
        }

        Collections.shuffle(finalPool);
        Set<Question> selectedQuestions = new HashSet<>(finalPool.subList(0, amount));

        return saveNewBook(selectedQuestions, "Personalizado (" + amount + " questões)", user);
    }

    @Transactional
    public void deleteQuestionBook(Long id, User user) {
        QuestionBook book = question_book_repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Caderno não encontrado"));

        if (!book.isR_generated()) {
            if (user.getRole() != Role.ADMIN) {
                throw new IllegalArgumentException("Não é permitido deletar cadernos oficiais.");
            }
        } else {
            boolean isOwner = book.getUser() != null && book.getUser().getId().equals(user.getId());
            boolean isAdmin = user.getRole() == Role.ADMIN;

            if (!isOwner && !isAdmin) {
                throw new SecurityException("Você não tem permissão para excluir este simulado.");
            }
        }

        question_book_repository.delete(book);
    }

    private QuestionBook saveNewBook(Set<Question> questions, String modelName, User user) {
        QuestionBook newBook = new QuestionBook();
        newBook.setCreation_date();
        newBook.setModel(modelName);
        newBook.setR_generated(true);
        newBook.setQuestions(questions);
        newBook.setUser(user);

        return question_book_repository.save(newBook);
    }

    @Transactional
    public QuestionBook createExamFromJSON(ExamJsonDTO dto) {
        QuestionBook book = new QuestionBook();
        book.setModel(dto.title());
        book.setCreation_date();
        book.setR_generated(false);

        QuestionBook savedBook = question_book_repository.save(book);

        Set<Question> questions = new HashSet<>();
        int questionNumber = 1;

        for (QuestionJsonDTO qDto : dto.questions()) {
            Question q = new Question(
                    questionNumber++,
                    qDto.statement(),
                    qDto.explanation(),
                    qDto.optionA(),
                    qDto.optionB(),
                    qDto.optionC(),
                    qDto.optionD(),
                    qDto.optionE(),
                    dto.title()
            );
            q.setQuestion_book(savedBook);
            questions.add(q);
        }
        question_repository.saveAll(questions);
        savedBook.setQuestions(questions);
        return question_book_repository.save(savedBook);
    }
}