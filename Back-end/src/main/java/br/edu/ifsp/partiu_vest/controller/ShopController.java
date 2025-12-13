package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping
    public ResponseEntity<List<Item>> listItems() {
        return ResponseEntity.ok(shopService.getAllItems());
    }

    @PostMapping("/buy/{itemId}")
    public ResponseEntity<User> buyItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        User updatedUser = shopService.buyItem(user.getId(), itemId);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/equip/{itemId}")
    public ResponseEntity<User> equipItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        User updatedUser = shopService.equipItem(user.getId(), itemId);
        return ResponseEntity.ok(updatedUser);
    }
}