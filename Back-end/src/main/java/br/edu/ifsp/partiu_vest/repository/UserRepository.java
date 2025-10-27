package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}

