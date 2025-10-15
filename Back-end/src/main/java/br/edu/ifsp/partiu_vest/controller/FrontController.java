package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class FrontController {
    private final UserRepository repository;

    public FrontController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public String home() {
        return "home";
    }
    @GetMapping("/login_page")
    public String login_page() {
        return "login_page";
    }
    @GetMapping("/sign_page")
    public String sign_page() {
        return "sign_page";
    }
}
