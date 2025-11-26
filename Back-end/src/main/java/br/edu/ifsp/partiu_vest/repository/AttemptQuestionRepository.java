package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptQuestionRepository extends JpaRepository<AttemptQuestion, Long> {
}
