package com.jhipster.park.repository;

import com.jhipster.park.domain.Nota;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Nota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
}
