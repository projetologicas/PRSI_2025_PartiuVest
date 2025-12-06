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

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }
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
        User user = new User("admin@admin.com", "admin", "admin");
        repository.save(user);
    }

}
