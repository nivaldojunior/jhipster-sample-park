package com.jhipster.park.repository;

import com.jhipster.park.domain.Estadia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Estadia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadiaRepository extends JpaRepository<Estadia, Long> {
}
