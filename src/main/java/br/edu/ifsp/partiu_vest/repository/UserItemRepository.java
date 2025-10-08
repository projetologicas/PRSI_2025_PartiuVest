package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {}


