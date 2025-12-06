package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptQuestionRepository extends JpaRepository<AttemptQuestion, Long> {
    @Query(value = "SELECT * FROM attempt_question " +
            "WHERE attempt_id = :attempt_id", nativeQuery = true)
    public List<AttemptQuestion> getAttemptQuestionsByAttemptId(@Param("attempt_id") Long Attempt_id);
}
