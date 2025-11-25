package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import jakarta.persistence.Column;

public class QuestionResponse {
    private Long id;
    private String title;
    private String image_desc;
    private String enum_a;
    private String enum_b;
    private String enum_c;
    private String enum_d;
    private String enum_e;
    private String answer;
    private int number;

    public static QuestionResponse from(Question question) {
        var response = new QuestionResponse();
        response.id = question.getId();
        response.title = question.getTitle();
        response.image_desc = question.getImage_desc();
        response.enum_a = question.getEnum_a();
        response.enum_b = question.getEnum_b();
        response.enum_c = question.getEnum_c();
        response.enum_d = question.getEnum_d();
        response.enum_e = question.getEnum_e();
        response.answer = question.getAnswer();
        response.number = question.getNumber();
        return response;
    }

    public QuestionResponse(Long id, String title, String image_desc, String enum_a, String enum_b, String enum_c, String enum_d, String enum_e, String answer, int number) {
        this.id = id;
        this.title = title;
        this.image_desc = image_desc;
        this.enum_a = enum_a;
        this.enum_b = enum_b;
        this.enum_c = enum_c;
        this.enum_d = enum_d;
        this.enum_e = enum_e;
        this.answer = answer;
        this.number = number;
    }

    public QuestionResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setImage_desc(String image_desc) {
        this.image_desc = image_desc;
    }

    public String getEnum_a() {
        return enum_a;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
