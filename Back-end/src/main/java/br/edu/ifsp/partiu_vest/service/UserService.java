package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.exceptions.EmailAlreadyUsedException;
import br.edu.ifsp.partiu_vest.exceptions.InvalidCredentialsException;
import br.edu.ifsp.partiu_vest.exceptions.UserNotFoundException;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<UserResponse> findAllUsers() {
        return repository.findAll()
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        if (!repository.existsById(id)) {
            throw new UserNotFoundException("Usuário não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    // ----------------------------------------

    public UserResponse register(RegisterRequest dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyUsedException("E-mail já está em uso.");
        }

        var user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setSign_date();
        user.setPoints(0);
        user.setXp(0);
        user.setStreak();
        var saved = repository.save(user);
        return UserResponse.from(saved);
    }

    public UserResponse checkCredentials(AuthRequest dto) {
        String email = dto.getEmail().toLowerCase();
        User user = repository.findByEmail(email);

        if (user == null) {
            throw new UserNotFoundException("Usuário não encontrado com e-mail: " + email);
        }
        if (!encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Credenciais inválidas.");
        }
        return UserResponse.from(user);
    }

    public User checkCredentialsAndReturnUser(AuthRequest dto) {
        User user = repository.findByEmail(dto.getEmail().toLowerCase());
        if (user == null) {
            throw new UserNotFoundException("Usuário não encontrado");
        }
        if (!encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Credenciais inválidas");
        }
        return user;
    }

    public UserPublicDataResponse getPublicUserData(UserDataRequest dto) {
        User user = repository.findById(dto.getId()).get();
        return UserPublicDataResponse.from(user);
    }

    public void createAdminUser() {
        User user = new User();
        user.setName("admin");
        user.setEmail("admin@admin.com");
        user.setPassword(encoder.encode("admin"));
        user.setRole(Role.ADMIN);
        user.setEnabled(true);
        user.setSign_date();
        user.setPoints(0);
        user.setXp(0);
        user.setStreak();
        var saved = repository.save(user);
        repository.save(user); // Nota: Parece haver uma duplicação aqui no seu código original, mas mantive como estava.
    }

    public Page<UserPublicDataResponse> getXpRanking(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAllByOrderByXpDesc(pageable)
                .map(UserPublicDataResponse::from);
    }

    public Page<UserPublicDataResponse> getStreakRanking(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAllByOrderByStreakDesc(pageable)
                .map(UserPublicDataResponse::from);
    }

    public void updateUser(Long userId, UserUpdateRequest dto) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            user.setName(dto.getName());
        }

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            if (!dto.getEmail().equals(user.getEmail()) && repository.existsByEmail(dto.getEmail())) {
                throw new EmailAlreadyUsedException("Este e-mail já está em uso.");
            }
            user.setEmail(dto.getEmail());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(encoder.encode(dto.getPassword()));
        }

        repository.save(user);
    }
}