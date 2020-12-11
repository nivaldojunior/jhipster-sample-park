package com.jhipster.park.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Estadia.
 */
@Entity
@Table(name = "estadia")
public class Estadia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "veiculo_id")
    private Integer veiculoID;

    @Column(name = "entrada")
    private Instant entrada;

    @Column(name = "saida")
    private Instant saida;

    @ManyToOne
    @JsonIgnoreProperties(value = "estadias", allowSetters = true)
    private Veiculo veiculoID;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVeiculoID() {
        return veiculoID;
    }

    public Estadia veiculoID(Integer veiculoID) {
        this.veiculoID = veiculoID;
        return this;
    }

    public void setVeiculoID(Integer veiculoID) {
        this.veiculoID = veiculoID;
    }

    public Instant getEntrada() {
        return entrada;
    }

    public Estadia entrada(Instant entrada) {
        this.entrada = entrada;
        return this;
    }

    public void setEntrada(Instant entrada) {
        this.entrada = entrada;
    }

    public Instant getSaida() {
        return saida;
    }

    public Estadia saida(Instant saida) {
        this.saida = saida;
        return this;
    }

    public void setSaida(Instant saida) {
        this.saida = saida;
    }

    public Veiculo getVeiculoID() {
        return veiculoID;
    }

    public Estadia veiculoID(Veiculo veiculo) {
        this.veiculoID = veiculo;
        return this;
    }

    public void setVeiculoID(Veiculo veiculo) {
        this.veiculoID = veiculo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estadia)) {
            return false;
        }
        return id != null && id.equals(((Estadia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Estadia{" +
            "id=" + getId() +
            ", veiculoID=" + getVeiculoID() +
            ", entrada='" + getEntrada() + "'" +
            ", saida='" + getSaida() + "'" +
            "}";
    }
}
