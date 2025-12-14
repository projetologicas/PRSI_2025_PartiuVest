package br.edu.ifsp.partiu_vest.config;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import br.edu.ifsp.partiu_vest.repository.ItemRepository;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ItemRepository itemRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (itemRepository.count() == 0) {
            System.out.println("🛒 Criando itens da loja e Temas...");

            itemRepository.saveAll(Arrays.asList(
                    new Item("Robô da NASA", "https://api.dicebear.com/9.x/bottts/svg?seed=Nasa", ItemType.AVATAR, 100),
                    new Item("Aventureiro", "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix", ItemType.AVATAR, 250),
                    new Item("Gamer 8-bit", "https://api.dicebear.com/9.x/pixel-art/svg?seed=Gamer", ItemType.AVATAR, 500),
                    new Item("Monstrinho Roxo", "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Spooky", ItemType.AVATAR, 800),
                    new Item("Hacker Anônimo", "https://api.dicebear.com/9.x/identicon/svg?seed=Hacker", ItemType.AVATAR, 150)
            ));

            itemRepository.saveAll(Arrays.asList(
                    new Item("Novato Dedicado", "Novato Dedicado 📚", ItemType.TITLE, 50),
                    new Item("O Vestibulando", "O Vestibulando 🎓", ItemType.TITLE, 200),
                    new Item("Mestre do Java", "Mestre do Java ☕", ItemType.TITLE, 1000),
                    new Item("Gênio da Matemática", "Gênio da Matemática 📐", ItemType.TITLE, 1500)
            ));

            itemRepository.saveAll(Arrays.asList(
                    new Item("Modo Claro", "light", ItemType.THEME, 50),
                    new Item("Matrix", "matrix", ItemType.THEME, 50),
                    new Item("Cyberpunk Neon", "neon", ItemType.THEME, 50)
            ));

            System.out.println("✅ Loja populada com sucesso!");
        } else {
            System.out.println("ℹ️ Itens já existem no banco. Pular criação.");
        }
    }
}