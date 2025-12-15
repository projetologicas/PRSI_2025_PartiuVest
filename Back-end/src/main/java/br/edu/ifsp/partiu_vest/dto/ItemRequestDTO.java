package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Dados necessários para a criação de um novo item na loja (Shop)")
public record ItemRequestDTO(
        @NotBlank(message = "O nome não pode estar em branco")
        @Schema(description = "Nome do item", example = "Chapeu do Mago")
        String name,

        @NotBlank(message = "A descrição não pode estar em branco")
        @Schema(description = "Descrição detalhada do item", example = "Um chapéu místico que aumenta a sorte em 10%")
        String description,

        @NotNull(message = "O preço é obrigatório")
        @Min(value = 0, message = "O preço deve ser zero ou maior")
        @Schema(description = "Preço do item na moeda do jogo (Points)", example = "500")
        Integer price,

        @NotNull(message = "O tipo do item é obrigatório")
        @Schema(description = "Tipo do item (ex: AVATAR, TITLE, THEME)")
        ItemType type,

        @NotBlank(message = "A URL da imagem é obrigatória")
        @Schema(description = "URL do recurso visual do item", example = "https://partiu-vest.com/items/chapeu.png")
        String imageUrl
) {}