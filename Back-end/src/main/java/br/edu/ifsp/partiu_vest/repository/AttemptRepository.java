package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    public List<Attempt> findByQuestionBook(QuestionBook question_book);

}


