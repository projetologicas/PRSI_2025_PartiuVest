package br.edu.ifsp.partiu_vest.service;

import br.edu.ifsp.partiu_vest.dto.AuthRequest;
import br.edu.ifsp.partiu_vest.dto.RegisterRequest;
import br.edu.ifsp.partiu_vest.dto.UserResponse;
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
            return null;
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
        User user = repository.findByEmail(dto.getEmail().toLowerCase());
        if (user == null) return null;
        if (!encoder.matches(dto.getPassword(), user.getPassword())) {
            return null;
        }
        return UserResponse.from(user);
    }
}
