package br.edu.ifsp.partiu_vest.repository;

import br.edu.ifsp.partiu_vest.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}