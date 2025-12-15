package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import br.edu.ifsp.partiu_vest.repository.ItemRepository;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import br.edu.ifsp.partiu_vest.dto.ItemRequestDTO;

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
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("Item não encontrado para exclusão.");
        }
        itemRepository.deleteById(id);
    }

    @Transactional
    public void updateItem(Long id, ItemRequestDTO dto) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado."));

        if (dto.name() != null && !dto.name().isBlank()) item.setName(dto.name());
        if (dto.price() > 0) item.setPrice(dto.price()); // Assume preço > 0
        if (dto.type() != null) item.setType(dto.type());
        if (dto.imageUrl() != null && !dto.imageUrl().isBlank()) item.setImage_url(dto.imageUrl());

        itemRepository.save(item);
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
        } else if (item.getType() == ItemType.THEME) {
            // Lógica de tema (opcionalmente auto-equipável ou não)
        }

        return userRepository.save(user);
    }

    @Transactional
    public User equipItem(Long userId, Long itemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));

        if (!user.getItems().contains(item)) {
            throw new IllegalStateException("Você não possui este item para equipar.");
        }

        switch (item.getType()) {
            case AVATAR -> user.setCurrentAvatarUrl(item.getImage_url());
            case TITLE -> user.setCurrentTitle(item.getImage_url());
            case THEME -> user.setCurrentTheme(item.getImage_url());
        }

        return userRepository.save(user);
    }

    @Transactional
    public Item createItem(ItemRequestDTO dto) {
        Item item = new Item();
        item.setName(dto.name());
        item.setPrice(dto.price());
        item.setType(dto.type());
        item.setImage_url(dto.imageUrl());

        return itemRepository.save(item);
    }
}