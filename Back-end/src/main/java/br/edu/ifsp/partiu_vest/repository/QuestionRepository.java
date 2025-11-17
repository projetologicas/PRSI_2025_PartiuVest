package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT q.* FROM question q " +
            "JOIN book_question bq ON q.id = bq.question_id " +
            "WHERE q.number = :number AND bq.question_book_id = :bookId LIMIT 1",
            nativeQuery = true)
    Question findByNumberAndQuestionBookId(@Param("number") Integer number, @Param("bookId") Long bookId);
}

