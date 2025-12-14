package br.edu.ifsp.partiu_vest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class JsonlSource {
    private String id;
    private String exam;
    private String question;
    private List<String> description;

    @JsonProperty("alternatives")
    private List<String> alternatives;

    private String label;

    public JsonlSource() {}

    public String getId() { return id; }
    public String getQuestion() { return question; }
    public List<String> getDescription() { return description; }
    public List<String> getAlternatives() { return alternatives; }
    public String getLabel() { return label; }
    public void setId(String id) { this.id = id; }
    public void setExam(String exam) { /* ... */ }
    public void setQuestion(String question) { this.question = question; }
    public void setDescription(List<String> description) { this.description = description; }
    public void setAlternatives(List<String> alternatives) { this.alternatives = alternatives; }
    public void setLabel(String label) { this.label = label; }
}