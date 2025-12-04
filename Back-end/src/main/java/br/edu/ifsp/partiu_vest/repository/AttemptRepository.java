package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    @Query(value = "SELECT a.* FROM attempt a " +
            "JOIN question_book qb ON a.question_book_id = qb.id " +
            "WHERE a.question_book_id = :question_book_id",
            nativeQuery = true)
    public List<Attempt> findByQuestionBook(@Param("number") Long question_book_id);
    @Query(value = "SELECT * FROM attempt " +
            "WHERE user_id = :user_id AND question_book_id = :question_book_id",
            nativeQuery = true)
    public List<Attempt> findByQuestionBookUser(@Param("question_book_id") Long question_book_id, @Param("user_id") Long user_id);

}


