package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.Area;
import br.edu.ifsp.partiu_vest.model.enums.Model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String image_url;
    @Column
    private int number;
    @Column
    private Character answer;
    @Column
    private Area area;

    public Question(String title, String image_url, int number, Character answer, Area area) {
        setTitle(title);
        setImage_url(image_url);
        setNumber(number);
        setAnswer(answer);
        setArea(area);
    }

    public Question() {

    }

    public Long getId() {
        return id;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Character getAnswer() {
        return answer;
    }

    public void setAnswer(Character answer) {
        this.answer = answer;
    }
}
