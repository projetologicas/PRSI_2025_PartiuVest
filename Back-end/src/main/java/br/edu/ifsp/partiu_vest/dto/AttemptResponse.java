package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.*;

import java.time.LocalDate;
import java.util.*;

public class AttemptResponse {
    private Long id;
    private Long question_book_id;
    private Long user_id;
    private List<Long> questions_id;
    private LocalDate start_date;
    private LocalDate end_date;

    public static AttemptResponse from(Attempt attempt) {
        var response = new AttemptResponse();
        response.id = attempt.getId();
        response.question_book_id = attempt.getQuestion_book().getId();
        List<AttemptQuestion> list = new LinkedList<>(attempt.getQuestions());
        list.sort(Comparator.comparing(AttemptQuestion::getId));
        System.out.println(list);
        Iterator<AttemptQuestion> iterator = list.iterator();
        response.questions_id = new LinkedList<>();
        while (iterator.hasNext()) {
            response.questions_id.add(iterator.next().getId());
        }
        System.out.println(response.questions_id);
        response.start_date = attempt.getStart_date();
        response.end_date = attempt.getEnd_date();
        response.user_id = attempt.getUser().getId();
        return response;
    }

    public AttemptResponse(Long id, Long question_book_id, Long user_id, List<Long> questions_id, LocalDate start_date, LocalDate end_date) {
        this.id = id;
        this.question_book_id = question_book_id;
        this.user_id = user_id;
        this.questions_id = questions_id;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public AttemptResponse() {
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestion_book_id() {
        return question_book_id;
    }

    public void setQuestion_book_id(Long question_book_id) {
        this.question_book_id = question_book_id;
    }

    public List<Long> getQuestions_id() {
        return questions_id;
    }

    public void setQuestions_id(List<Long> questions_id) {
        this.questions_id = questions_id;
    }

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }
}
