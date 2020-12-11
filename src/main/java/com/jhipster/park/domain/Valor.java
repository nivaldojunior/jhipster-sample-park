package com.jhipster.park.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Valor.
 */
@Entity
@Table(name = "valor")
public class Valor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primeira_hora")
    private Long primeiraHora;

    @Column(name = "demais_horas")
    private Long demaisHoras;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrimeiraHora() {
        return primeiraHora;
    }

    public Valor primeiraHora(Long primeiraHora) {
        this.primeiraHora = primeiraHora;
        return this;
    }

    public void setPrimeiraHora(Long primeiraHora) {
        this.primeiraHora = primeiraHora;
    }

    public Long getDemaisHoras() {
        return demaisHoras;
    }

    public Valor demaisHoras(Long demaisHoras) {
        this.demaisHoras = demaisHoras;
        return this;
    }

    public void setDemaisHoras(Long demaisHoras) {
        this.demaisHoras = demaisHoras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Valor)) {
            return false;
        }
        return id != null && id.equals(((Valor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Valor{" +
            "id=" + getId() +
            ", primeiraHora=" + getPrimeiraHora() +
            ", demaisHoras=" + getDemaisHoras() +
            "}";
    }
}
