package br.edu.ifsp.partiu_vest.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtTokenRevocationHandler implements LogoutHandler {
    private final Set<String> revokedTokens = new HashSet<>();

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = extractJwtFromRequest(request);
        if (token != null) {
            revokedTokens.add(token);
            System.out.println("Token revoked: " + token);
        }
    }

    public boolean isTokenRevoked(String token) {
        return revokedTokens.contains(token);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
