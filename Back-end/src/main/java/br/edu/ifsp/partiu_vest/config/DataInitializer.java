package br.edu.ifsp.partiu_vest.config;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import br.edu.ifsp.partiu_vest.repository.ItemRepository;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

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
            System.out.println("🛒 Criando itens da loja com links blindados...");


            itemRepository.save(new Item(
                    "Robô da NASA",
                    "https://api.dicebear.com/9.x/bottts/svg?seed=Nasa",
                    ItemType.AVATAR,
                    100
            ));

            itemRepository.save(new Item(
                    "Aventureiro",
                    "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix",
                    ItemType.AVATAR,
                    250
            ));

            itemRepository.save(new Item(
                    "Gamer 8-bit",
                    "https://api.dicebear.com/9.x/pixel-art/svg?seed=Gamer",
                    ItemType.AVATAR,
                    500
            ));

            itemRepository.save(new Item(
                    "Monstrinho Roxo",
                    "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Spooky",
                    ItemType.AVATAR,
                    800
            ));

            itemRepository.save(new Item(
                    "Hacker Anônimo",
                    "https://api.dicebear.com/9.x/identicon/svg?seed=Hacker",
                    ItemType.AVATAR,
                    150
            ));

            itemRepository.save(new Item(
                    "Novato Dedicado",
                    "Novato Dedicado 📚", // Esse é o texto que aparecerá no perfil
                    ItemType.TITLE,
                    50
            ));

            itemRepository.save(new Item(
                    "O Vestibulando",
                    "O Vestibulando 🎓",
                    ItemType.TITLE,
                    200
            ));

            itemRepository.save(new Item(
                    "Mestre do Java",
                    "Mestre do Java ☕",
                    ItemType.TITLE,
                    1000
            ));

            itemRepository.save(new Item(
                    "Gênio da Matemática",
                    "Gênio da Matemática 📐",
                    ItemType.TITLE,
                    1500
            ));

            itemRepository.save(new Item(
                    "Modo Matrix",
                    "matrix-theme",
                    ItemType.THEME,
                    2000
            ));

            System.out.println("✅ Loja populada com sucesso!");
        }
    }
}