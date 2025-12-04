package br.edu.ifsp.partiu_vest.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String title;
    @Column(columnDefinition = "TEXT")
    private String image_desc;
    @Column(columnDefinition = "TEXT")
    private String enum_a;
    @Column(columnDefinition = "TEXT")
    private String enum_b;
    @Column(columnDefinition = "TEXT")
    private String enum_c;
    @Column(columnDefinition = "TEXT")
    private String enum_d;
    @Column(columnDefinition = "TEXT")
    private String enum_e;
    @Column
    private int number;
    @Column
    private String answer;
    @ManyToOne
    @JoinColumn(name = "question_book_id")
    private QuestionBook question_book;

    public Question(String title, String image_desc, String enum_a, String enum_b, String enum_c, String enum_d, String enum_e, int number, String answer) {
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

    public Question(Integer number, String question, String descImg, String enunA, String enunB, String enunC, String enunD, String enunE, String label) {
        setNumber(number);
        setTitle(question);
        setImage_desc(descImg);
        setEnum_a(enunA);
        setEnum_b(enunB);
        setEnum_c(enunC);
        setEnum_d(enunD);
        setEnum_e(enunE);
        setAnswer(label);
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
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

    public void setId(Long id) {
        this.id = id;
    }

    public QuestionBook getQuestion_book() {
        return question_book;
    }

    public void setQuestion_book(QuestionBook question_book) {
        this.question_book = question_book;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", image_desc='" + image_desc + '\'' +
                ", enum_a='" + enum_a + '\'' +
                ", enum_b='" + enum_b + '\'' +
                ", enum_c='" + enum_c + '\'' +
                ", enum_d='" + enum_d + '\'' +
                ", enum_e='" + enum_e + '\'' +
                ", number=" + number +
                ", answer='" + answer + '\'' +
                ", question_book=" + question_book.getId() +
                '}';
    }
}
