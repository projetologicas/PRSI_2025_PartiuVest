package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {}


