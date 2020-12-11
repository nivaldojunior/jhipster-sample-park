package com.jhipster.park.repository;

import com.jhipster.park.domain.Valor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Valor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValorRepository extends JpaRepository<Valor, Long> {
}
