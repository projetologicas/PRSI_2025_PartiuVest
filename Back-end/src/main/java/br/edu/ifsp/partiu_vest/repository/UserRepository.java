package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.data.domain.Page;      // <--- Importante
import org.springframework.data.domain.Pageable;  // <--- Importante
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);

    Page<User> findAllByOrderByXpDesc(Pageable pageable);

    Page<User> findAllByOrderByStreakDesc(Pageable pageable);
}