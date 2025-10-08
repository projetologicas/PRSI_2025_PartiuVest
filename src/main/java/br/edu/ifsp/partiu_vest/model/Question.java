package br.edu.ifsp.partiu_vest.model;

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
    private Date sign_date;
    @Column
    private Character answer;
    @Column
    private Model model;

    public Question(String title, String image_url, int number, Date sign_date, Character answer, Model model) {
        this.title = title;
        this.image_url = image_url;
        this.number = number;
        this.sign_date = sign_date;
        this.answer = answer;
        this.model = model;
    }

    public Question() {

    }

    public Long getId() {
        return id;
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

    public Date getSign_date() {
        return sign_date;
    }

    public void setSign_date(Date sign_date) {
        this.sign_date = sign_date;
    }

    public Character getAnswer() {
        return answer;
    }

    public void setAnswer(Character answer) {
        this.answer = answer;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }
}
