package com.jhipster.park.web.rest;

import com.jhipster.park.domain.Nota;
import com.jhipster.park.repository.NotaRepository;
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
 * REST controller for managing {@link com.jhipster.park.domain.Nota}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NotaResource {

    private final Logger log = LoggerFactory.getLogger(NotaResource.class);

    private static final String ENTITY_NAME = "nota";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NotaRepository notaRepository;

    public NotaResource(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    /**
     * {@code POST  /notas} : Create a new nota.
     *
     * @param nota the nota to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nota, or with status {@code 400 (Bad Request)} if the nota has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notas")
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to save Nota : {}", nota);
        if (nota.getId() != null) {
            throw new BadRequestAlertException("A new nota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.created(new URI("/api/notas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notas} : Updates an existing nota.
     *
     * @param nota the nota to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nota,
     * or with status {@code 400 (Bad Request)} if the nota is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nota couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notas")
    public ResponseEntity<Nota> updateNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to update Nota : {}", nota);
        if (nota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nota.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /notas} : get all the notas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notas in body.
     */
    @GetMapping("/notas")
    public List<Nota> getAllNotas() {
        log.debug("REST request to get all Notas");
        return notaRepository.findAll();
    }

    /**
     * {@code GET  /notas/:id} : get the "id" nota.
     *
     * @param id the id of the nota to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nota, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notas/{id}")
    public ResponseEntity<Nota> getNota(@PathVariable Long id) {
        log.debug("REST request to get Nota : {}", id);
        Optional<Nota> nota = notaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nota);
    }

    /**
     * {@code DELETE  /notas/:id} : delete the "id" nota.
     *
     * @param id the id of the nota to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notas/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        log.debug("REST request to delete Nota : {}", id);
        notaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
