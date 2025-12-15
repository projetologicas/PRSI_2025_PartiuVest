package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.data.domain.Page;      // <--- Importante
import org.springframework.data.domain.Pageable;  // <--- Importante
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);

    Page<User> findAllByOrderByXpDesc(Pageable pageable);

    Page<User> findAllByOrderByStreakDesc(Pageable pageable);

    List<User> findByItemsId(Long itemId);
}