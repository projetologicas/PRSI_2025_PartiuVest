package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.model.Item;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/shop")
@Tag(name = "Loja (Shop)", description = "Endpoints para listar, comprar e equipar itens cosméticos do usuário.")
@SecurityRequirement(name = "Bearer Token")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping
    @Operation(summary = "Listar Todos os Itens da Loja",
            description = "Retorna a lista completa de todos os itens cosméticos disponíveis para compra.")
    @ApiResponse(responseCode = "200", description = "Lista de itens retornada com sucesso.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Item.class))))
    public ResponseEntity<List<Item>> listItems() {
        return ResponseEntity.ok(shopService.getAllItems());
    }

    @PostMapping("/buy/{itemId}")
    @Operation(summary = "Comprar Item",
            description = "Permite que o usuário logado compre um item da loja, debitando os pontos/moedas.")
    @Parameter(name = "itemId", description = "ID do item a ser comprado.", required = true, example = "1")
    @ApiResponse(responseCode = "200", description = "Compra bem-sucedida. Retorna o perfil do usuário atualizado.",
            content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "400", description = "Item já possuído ou Pontos insuficientes.",
            content = @Content)
    public ResponseEntity<User> buyItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        User updatedUser = shopService.buyItem(user.getId(), itemId);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/equip/{itemId}")
    @Operation(summary = "Equipar Item",
            description = "Define um item já comprado (avatar, título, tema) como ativo no perfil do usuário.")
    @Parameter(name = "itemId", description = "ID do item a ser equipado.", required = true, example = "1")
    @ApiResponse(responseCode = "200", description = "Item equipado com sucesso. Retorna o perfil do usuário atualizado.",
            content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "400", description = "Item não possuído.",
            content = @Content)
    public ResponseEntity<User> equipItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        User updatedUser = shopService.equipItem(user.getId(), itemId);
        return ResponseEntity.ok(updatedUser);
    }
}