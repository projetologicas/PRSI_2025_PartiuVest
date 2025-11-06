package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.Model;
import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String image_desc;
    @Column
    private String enum_a;
    @Column
    private String enum_b;
    @Column
    private String enum_c;
    @Column
    private String enum_d;
    @Column
    private String enum_e;
    @Column
    private int number;
    @Column
    private Character answer;
    @Column
    @ManyToMany(mappedBy = "questions")
    private Set<Attempt> attempts;

    @ManyToMany(mappedBy = "questions")
    private Set<QuestionBook> question_books;

    public Question(String title, String image_desc, String enum_a, String enum_b, String enum_c, String enum_d, String enum_e, int number, Character answer) {
        setTitle(title);
        setImage_desc(image_desc);
        setNumber(number);
        setEnum_a(enum_a);
        setEnum_b(enum_b);
        setEnum_c(enum_c);
        setEnum_d(enum_d);
        setEnum_e(enum_e);
        setAnswer(answer);
    }

    private void setImage_desc(String imageDesc) {
        this.image_desc = imageDesc;
    }

    public Question() {

    }

    public Question(String id, Integer number, String question, String descImg, String enunA, String enunB, String enunC, String enunD, String enunE, String label) {
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

    public String getImage_desc() {
        return image_desc;
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

    public String getEnum_a() {
        return enum_a;
    }

    public void setEnum_a(String enum_a) {
        this.enum_a = enum_a;
    }

    public String getEnum_b() {
        return enum_b;
    }

    public void setEnum_b(String enum_b) {
        this.enum_b = enum_b;
    }

    public String getEnum_c() {
        return enum_c;
    }

    public void setEnum_c(String enum_c) {
        this.enum_c = enum_c;
    }

    public String getEnum_d() {
        return enum_d;
    }

    public void setEnum_d(String enum_d) {
        this.enum_d = enum_d;
    }

    public String getEnum_e() {
        return enum_e;
    }

    public void setEnum_e(String enum_e) {
        this.enum_e = enum_e;
    }
}
