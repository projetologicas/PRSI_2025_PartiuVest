package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {}

