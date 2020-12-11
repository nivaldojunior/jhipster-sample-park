package com.jhipster.park.web.rest;

import com.jhipster.park.domain.Estadia;
import com.jhipster.park.repository.EstadiaRepository;
import com.jhipster.park.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.park.domain.Estadia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstadiaResource {

    private final Logger log = LoggerFactory.getLogger(EstadiaResource.class);

    private static final String ENTITY_NAME = "estadia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadiaRepository estadiaRepository;

    public EstadiaResource(EstadiaRepository estadiaRepository) {
        this.estadiaRepository = estadiaRepository;
    }

    /**
     * {@code POST  /estadias} : Create a new estadia.
     *
     * @param estadia the estadia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadia, or with status {@code 400 (Bad Request)} if the estadia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estadias")
    public ResponseEntity<Estadia> createEstadia(@RequestBody Estadia estadia) throws URISyntaxException {
        log.debug("REST request to save Estadia : {}", estadia);
        if (estadia.getId() != null) {
            throw new BadRequestAlertException("A new estadia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estadia result = estadiaRepository.save(estadia);
        return ResponseEntity.created(new URI("/api/estadias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estadias} : Updates an existing estadia.
     *
     * @param estadia the estadia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadia,
     * or with status {@code 400 (Bad Request)} if the estadia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estadias")
    public ResponseEntity<Estadia> updateEstadia(@RequestBody Estadia estadia) throws URISyntaxException {
        log.debug("REST request to update Estadia : {}", estadia);
        if (estadia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estadia result = estadiaRepository.save(estadia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estadias} : get all the estadias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadias in body.
     */
    @GetMapping("/estadias")
    public List<Estadia> getAllEstadias() {
        log.debug("REST request to get all Estadias");
        return estadiaRepository.findAll();
    }

    /**
     * {@code GET  /estadias/:id} : get the "id" estadia.
     *
     * @param id the id of the estadia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estadias/{id}")
    public ResponseEntity<Estadia> getEstadia(@PathVariable Long id) {
        log.debug("REST request to get Estadia : {}", id);
        Optional<Estadia> estadia = estadiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadia);
    }

    /**
     * {@code DELETE  /estadias/:id} : delete the "id" estadia.
     *
     * @param id the id of the estadia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estadias/{id}")
    public ResponseEntity<Void> deleteEstadia(@PathVariable Long id) {
        log.debug("REST request to delete Estadia : {}", id);
        estadiaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
