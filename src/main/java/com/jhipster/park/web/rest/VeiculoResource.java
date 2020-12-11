package com.jhipster.park.web.rest;

import com.jhipster.park.domain.Veiculo;
import com.jhipster.park.repository.VeiculoRepository;
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
 * REST controller for managing {@link com.jhipster.park.domain.Veiculo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VeiculoResource {

    private final Logger log = LoggerFactory.getLogger(VeiculoResource.class);

    private static final String ENTITY_NAME = "veiculo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VeiculoRepository veiculoRepository;

    public VeiculoResource(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    /**
     * {@code POST  /veiculos} : Create a new veiculo.
     *
     * @param veiculo the veiculo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new veiculo, or with status {@code 400 (Bad Request)} if the veiculo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/veiculos")
    public ResponseEntity<Veiculo> createVeiculo(@RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to save Veiculo : {}", veiculo);
        if (veiculo.getId() != null) {
            throw new BadRequestAlertException("A new veiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Veiculo result = veiculoRepository.save(veiculo);
        return ResponseEntity.created(new URI("/api/veiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /veiculos} : Updates an existing veiculo.
     *
     * @param veiculo the veiculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated veiculo,
     * or with status {@code 400 (Bad Request)} if the veiculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the veiculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/veiculos")
    public ResponseEntity<Veiculo> updateVeiculo(@RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to update Veiculo : {}", veiculo);
        if (veiculo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Veiculo result = veiculoRepository.save(veiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, veiculo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /veiculos} : get all the veiculos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of veiculos in body.
     */
    @GetMapping("/veiculos")
    public List<Veiculo> getAllVeiculos() {
        log.debug("REST request to get all Veiculos");
        return veiculoRepository.findAll();
    }

    /**
     * {@code GET  /veiculos/:id} : get the "id" veiculo.
     *
     * @param id the id of the veiculo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the veiculo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/veiculos/{id}")
    public ResponseEntity<Veiculo> getVeiculo(@PathVariable Long id) {
        log.debug("REST request to get Veiculo : {}", id);
        Optional<Veiculo> veiculo = veiculoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(veiculo);
    }

    /**
     * {@code DELETE  /veiculos/:id} : delete the "id" veiculo.
     *
     * @param id the id of the veiculo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/veiculos/{id}")
    public ResponseEntity<Void> deleteVeiculo(@PathVariable Long id) {
        log.debug("REST request to delete Veiculo : {}", id);
        veiculoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
