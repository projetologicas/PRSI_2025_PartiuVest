package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.enums.ItemType;

public record ItemRequestDTO(
        String name,
        String description,
        Integer price,
        ItemType type,
        String imageUrl
) {}