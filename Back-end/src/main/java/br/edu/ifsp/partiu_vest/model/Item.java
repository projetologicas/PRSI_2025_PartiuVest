package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.ItemType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String image_url;
    @Column
    private ItemType type;
    @Column
    private int price;

    @ManyToMany(mappedBy = "items")
    private Set<User> users;

    public Item(String name, String image_url, ItemType type, int price) {
        setName(name);
        setImage_url(image_url);
        setType(type);
        setPrice(price);
    }

    public Item() {

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public ItemType getType() {
        return type;
    }

    public void setType(ItemType type) {
        this.type = type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image_url='" + image_url + '\'' +
                ", type=" + type +
                ", price=" + price +
                '}';
    }
}
