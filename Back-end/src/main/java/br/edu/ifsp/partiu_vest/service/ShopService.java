package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import br.edu.ifsp.partiu_vest.repository.ItemRepository;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ShopService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Transactional
    public User buyItem(Long userId, Long itemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
        if (user.getItems().contains(item)) {
            throw new IllegalStateException("Você já possui este item!");
        }

        if (user.getPoints() < item.getPrice()) {
            throw new IllegalStateException("Saldo insuficiente.");
        }

        user.setPoints(user.getPoints() - item.getPrice());
        user.getItems().add(item);

        if (item.getType() == ItemType.AVATAR) {
            user.setCurrentAvatarUrl(item.getImage_url());
        } else if (item.getType() == ItemType.TITLE) {
            user.setCurrentTitle(item.getImage_url());
        }

        return userRepository.save(user);
    }
}