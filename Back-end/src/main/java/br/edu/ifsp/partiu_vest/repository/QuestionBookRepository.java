package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.QuestionBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionBookRepository extends JpaRepository<QuestionBook, Long> {
    Optional<QuestionBook> findByModel(String model);
}


