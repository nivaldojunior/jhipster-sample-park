package com.jhipster.park.web.rest;

import com.jhipster.park.JhipsterSampleParkApp;
import com.jhipster.park.domain.Valor;
import com.jhipster.park.repository.ValorRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ValorResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleParkApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ValorResourceIT {

    private static final Long DEFAULT_PRIMEIRA_HORA = 1L;
    private static final Long UPDATED_PRIMEIRA_HORA = 2L;

    private static final Long DEFAULT_DEMAIS_HORAS = 1L;
    private static final Long UPDATED_DEMAIS_HORAS = 2L;

    @Autowired
    private ValorRepository valorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restValorMockMvc;

    private Valor valor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valor createEntity(EntityManager em) {
        Valor valor = new Valor()
            .primeiraHora(DEFAULT_PRIMEIRA_HORA)
            .demaisHoras(DEFAULT_DEMAIS_HORAS);
        return valor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valor createUpdatedEntity(EntityManager em) {
        Valor valor = new Valor()
            .primeiraHora(UPDATED_PRIMEIRA_HORA)
            .demaisHoras(UPDATED_DEMAIS_HORAS);
        return valor;
    }

    @BeforeEach
    public void initTest() {
        valor = createEntity(em);
    }

    @Test
    @Transactional
    public void createValor() throws Exception {
        int databaseSizeBeforeCreate = valorRepository.findAll().size();
        // Create the Valor
        restValorMockMvc.perform(post("/api/valors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valor)))
            .andExpect(status().isCreated());

        // Validate the Valor in the database
        List<Valor> valorList = valorRepository.findAll();
        assertThat(valorList).hasSize(databaseSizeBeforeCreate + 1);
        Valor testValor = valorList.get(valorList.size() - 1);
        assertThat(testValor.getPrimeiraHora()).isEqualTo(DEFAULT_PRIMEIRA_HORA);
        assertThat(testValor.getDemaisHoras()).isEqualTo(DEFAULT_DEMAIS_HORAS);
    }

    @Test
    @Transactional
    public void createValorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valorRepository.findAll().size();

        // Create the Valor with an existing ID
        valor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValorMockMvc.perform(post("/api/valors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valor)))
            .andExpect(status().isBadRequest());

        // Validate the Valor in the database
        List<Valor> valorList = valorRepository.findAll();
        assertThat(valorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllValors() throws Exception {
        // Initialize the database
        valorRepository.saveAndFlush(valor);

        // Get all the valorList
        restValorMockMvc.perform(get("/api/valors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valor.getId().intValue())))
            .andExpect(jsonPath("$.[*].primeiraHora").value(hasItem(DEFAULT_PRIMEIRA_HORA.intValue())))
            .andExpect(jsonPath("$.[*].demaisHoras").value(hasItem(DEFAULT_DEMAIS_HORAS.intValue())));
    }
    
    @Test
    @Transactional
    public void getValor() throws Exception {
        // Initialize the database
        valorRepository.saveAndFlush(valor);

        // Get the valor
        restValorMockMvc.perform(get("/api/valors/{id}", valor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(valor.getId().intValue()))
            .andExpect(jsonPath("$.primeiraHora").value(DEFAULT_PRIMEIRA_HORA.intValue()))
            .andExpect(jsonPath("$.demaisHoras").value(DEFAULT_DEMAIS_HORAS.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingValor() throws Exception {
        // Get the valor
        restValorMockMvc.perform(get("/api/valors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValor() throws Exception {
        // Initialize the database
        valorRepository.saveAndFlush(valor);

        int databaseSizeBeforeUpdate = valorRepository.findAll().size();

        // Update the valor
        Valor updatedValor = valorRepository.findById(valor.getId()).get();
        // Disconnect from session so that the updates on updatedValor are not directly saved in db
        em.detach(updatedValor);
        updatedValor
            .primeiraHora(UPDATED_PRIMEIRA_HORA)
            .demaisHoras(UPDATED_DEMAIS_HORAS);

        restValorMockMvc.perform(put("/api/valors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedValor)))
            .andExpect(status().isOk());

        // Validate the Valor in the database
        List<Valor> valorList = valorRepository.findAll();
        assertThat(valorList).hasSize(databaseSizeBeforeUpdate);
        Valor testValor = valorList.get(valorList.size() - 1);
        assertThat(testValor.getPrimeiraHora()).isEqualTo(UPDATED_PRIMEIRA_HORA);
        assertThat(testValor.getDemaisHoras()).isEqualTo(UPDATED_DEMAIS_HORAS);
    }

    @Test
    @Transactional
    public void updateNonExistingValor() throws Exception {
        int databaseSizeBeforeUpdate = valorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restValorMockMvc.perform(put("/api/valors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(valor)))
            .andExpect(status().isBadRequest());

        // Validate the Valor in the database
        List<Valor> valorList = valorRepository.findAll();
        assertThat(valorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteValor() throws Exception {
        // Initialize the database
        valorRepository.saveAndFlush(valor);

        int databaseSizeBeforeDelete = valorRepository.findAll().size();

        // Delete the valor
        restValorMockMvc.perform(delete("/api/valors/{id}", valor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Valor> valorList = valorRepository.findAll();
        assertThat(valorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
