package com.jhipster.park.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Nota.
 */
@Entity
@Table(name = "nota")
public class Nota implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "estadia_id")
    private Integer estadiaID;

    @Column(name = "valor_total")
    private Float valorTotal;

    @OneToOne
    @JoinColumn(unique = true)
    private Estadia estadiaID;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEstadiaID() {
        return estadiaID;
    }

    public Nota estadiaID(Integer estadiaID) {
        this.estadiaID = estadiaID;
        return this;
    }

    public void setEstadiaID(Integer estadiaID) {
        this.estadiaID = estadiaID;
    }

    public Float getValorTotal() {
        return valorTotal;
    }

    public Nota valorTotal(Float valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Float valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Estadia getEstadiaID() {
        return estadiaID;
    }

    public Nota estadiaID(Estadia estadia) {
        this.estadiaID = estadia;
        return this;
    }

    public void setEstadiaID(Estadia estadia) {
        this.estadiaID = estadia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Nota)) {
            return false;
        }
        return id != null && id.equals(((Nota) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Nota{" +
            "id=" + getId() +
            ", estadiaID=" + getEstadiaID() +
            ", valorTotal=" + getValorTotal() +
            "}";
    }
}
