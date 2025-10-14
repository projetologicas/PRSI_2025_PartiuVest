package br.edu.ifsp.partiu_vest.model;

import br.edu.ifsp.partiu_vest.model.enums.Model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question_book")
public class QuestionBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Date creation_date;
    @Column
    private Model model;
    @Column boolean r_generated;

    public QuestionBook(User user_id, Model model, boolean r_generated) {
        setCreation_date();
        setModel(model);
        setR_generated(r_generated);
    }

    public QuestionBook() {

    }

    public Long getId() {
        return id;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public boolean isR_generated() {
        return r_generated;
    }

    public void setR_generated(boolean r_generated) {
        this.r_generated = r_generated;
    }

    public void setCreation_date() {
        this.creation_date = new Date();
    }
}
