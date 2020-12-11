package com.jhipster.park.web.rest;

import com.jhipster.park.JhipsterSampleParkApp;
import com.jhipster.park.domain.Estadia;
import com.jhipster.park.repository.EstadiaRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EstadiaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleParkApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstadiaResourceIT {

    private static final Integer DEFAULT_VEICULO_ID = 1;
    private static final Integer UPDATED_VEICULO_ID = 2;

    private static final Instant DEFAULT_ENTRADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTRADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SAIDA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SAIDA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EstadiaRepository estadiaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadiaMockMvc;

    private Estadia estadia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estadia createEntity(EntityManager em) {
        Estadia estadia = new Estadia()
            .veiculoID(DEFAULT_VEICULO_ID)
            .entrada(DEFAULT_ENTRADA)
            .saida(DEFAULT_SAIDA);
        return estadia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estadia createUpdatedEntity(EntityManager em) {
        Estadia estadia = new Estadia()
            .veiculoID(UPDATED_VEICULO_ID)
            .entrada(UPDATED_ENTRADA)
            .saida(UPDATED_SAIDA);
        return estadia;
    }

    @BeforeEach
    public void initTest() {
        estadia = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadia() throws Exception {
        int databaseSizeBeforeCreate = estadiaRepository.findAll().size();
        // Create the Estadia
        restEstadiaMockMvc.perform(post("/api/estadias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadia)))
            .andExpect(status().isCreated());

        // Validate the Estadia in the database
        List<Estadia> estadiaList = estadiaRepository.findAll();
        assertThat(estadiaList).hasSize(databaseSizeBeforeCreate + 1);
        Estadia testEstadia = estadiaList.get(estadiaList.size() - 1);
        assertThat(testEstadia.getVeiculoID()).isEqualTo(DEFAULT_VEICULO_ID);
        assertThat(testEstadia.getEntrada()).isEqualTo(DEFAULT_ENTRADA);
        assertThat(testEstadia.getSaida()).isEqualTo(DEFAULT_SAIDA);
    }

    @Test
    @Transactional
    public void createEstadiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadiaRepository.findAll().size();

        // Create the Estadia with an existing ID
        estadia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadiaMockMvc.perform(post("/api/estadias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadia)))
            .andExpect(status().isBadRequest());

        // Validate the Estadia in the database
        List<Estadia> estadiaList = estadiaRepository.findAll();
        assertThat(estadiaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstadias() throws Exception {
        // Initialize the database
        estadiaRepository.saveAndFlush(estadia);

        // Get all the estadiaList
        restEstadiaMockMvc.perform(get("/api/estadias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadia.getId().intValue())))
            .andExpect(jsonPath("$.[*].veiculoID").value(hasItem(DEFAULT_VEICULO_ID)))
            .andExpect(jsonPath("$.[*].entrada").value(hasItem(DEFAULT_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].saida").value(hasItem(DEFAULT_SAIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getEstadia() throws Exception {
        // Initialize the database
        estadiaRepository.saveAndFlush(estadia);

        // Get the estadia
        restEstadiaMockMvc.perform(get("/api/estadias/{id}", estadia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadia.getId().intValue()))
            .andExpect(jsonPath("$.veiculoID").value(DEFAULT_VEICULO_ID))
            .andExpect(jsonPath("$.entrada").value(DEFAULT_ENTRADA.toString()))
            .andExpect(jsonPath("$.saida").value(DEFAULT_SAIDA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEstadia() throws Exception {
        // Get the estadia
        restEstadiaMockMvc.perform(get("/api/estadias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadia() throws Exception {
        // Initialize the database
        estadiaRepository.saveAndFlush(estadia);

        int databaseSizeBeforeUpdate = estadiaRepository.findAll().size();

        // Update the estadia
        Estadia updatedEstadia = estadiaRepository.findById(estadia.getId()).get();
        // Disconnect from session so that the updates on updatedEstadia are not directly saved in db
        em.detach(updatedEstadia);
        updatedEstadia
            .veiculoID(UPDATED_VEICULO_ID)
            .entrada(UPDATED_ENTRADA)
            .saida(UPDATED_SAIDA);

        restEstadiaMockMvc.perform(put("/api/estadias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadia)))
            .andExpect(status().isOk());

        // Validate the Estadia in the database
        List<Estadia> estadiaList = estadiaRepository.findAll();
        assertThat(estadiaList).hasSize(databaseSizeBeforeUpdate);
        Estadia testEstadia = estadiaList.get(estadiaList.size() - 1);
        assertThat(testEstadia.getVeiculoID()).isEqualTo(UPDATED_VEICULO_ID);
        assertThat(testEstadia.getEntrada()).isEqualTo(UPDATED_ENTRADA);
        assertThat(testEstadia.getSaida()).isEqualTo(UPDATED_SAIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadia() throws Exception {
        int databaseSizeBeforeUpdate = estadiaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadiaMockMvc.perform(put("/api/estadias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadia)))
            .andExpect(status().isBadRequest());

        // Validate the Estadia in the database
        List<Estadia> estadiaList = estadiaRepository.findAll();
        assertThat(estadiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadia() throws Exception {
        // Initialize the database
        estadiaRepository.saveAndFlush(estadia);

        int databaseSizeBeforeDelete = estadiaRepository.findAll().size();

        // Delete the estadia
        restEstadiaMockMvc.perform(delete("/api/estadias/{id}", estadia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estadia> estadiaList = estadiaRepository.findAll();
        assertThat(estadiaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
