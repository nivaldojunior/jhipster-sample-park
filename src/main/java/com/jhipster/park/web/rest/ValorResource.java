package com.jhipster.park.web.rest;

import com.jhipster.park.domain.Valor;
import com.jhipster.park.repository.ValorRepository;
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
 * REST controller for managing {@link com.jhipster.park.domain.Valor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ValorResource {

    private final Logger log = LoggerFactory.getLogger(ValorResource.class);

    private static final String ENTITY_NAME = "valor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValorRepository valorRepository;

    public ValorResource(ValorRepository valorRepository) {
        this.valorRepository = valorRepository;
    }

    /**
     * {@code POST  /valors} : Create a new valor.
     *
     * @param valor the valor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valor, or with status {@code 400 (Bad Request)} if the valor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valors")
    public ResponseEntity<Valor> createValor(@RequestBody Valor valor) throws URISyntaxException {
        log.debug("REST request to save Valor : {}", valor);
        if (valor.getId() != null) {
            throw new BadRequestAlertException("A new valor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Valor result = valorRepository.save(valor);
        return ResponseEntity.created(new URI("/api/valors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valors} : Updates an existing valor.
     *
     * @param valor the valor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valor,
     * or with status {@code 400 (Bad Request)} if the valor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valors")
    public ResponseEntity<Valor> updateValor(@RequestBody Valor valor) throws URISyntaxException {
        log.debug("REST request to update Valor : {}", valor);
        if (valor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Valor result = valorRepository.save(valor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, valor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /valors} : get all the valors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valors in body.
     */
    @GetMapping("/valors")
    public List<Valor> getAllValors() {
        log.debug("REST request to get all Valors");
        return valorRepository.findAll();
    }

    /**
     * {@code GET  /valors/:id} : get the "id" valor.
     *
     * @param id the id of the valor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valors/{id}")
    public ResponseEntity<Valor> getValor(@PathVariable Long id) {
        log.debug("REST request to get Valor : {}", id);
        Optional<Valor> valor = valorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(valor);
    }

    /**
     * {@code DELETE  /valors/:id} : delete the "id" valor.
     *
     * @param id the id of the valor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valors/{id}")
    public ResponseEntity<Void> deleteValor(@PathVariable Long id) {
        log.debug("REST request to delete Valor : {}", id);
        valorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
