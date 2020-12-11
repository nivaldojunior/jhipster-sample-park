package com.jhipster.park.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.park.web.rest.TestUtil;

public class EstadiaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estadia.class);
        Estadia estadia1 = new Estadia();
        estadia1.setId(1L);
        Estadia estadia2 = new Estadia();
        estadia2.setId(estadia1.getId());
        assertThat(estadia1).isEqualTo(estadia2);
        estadia2.setId(2L);
        assertThat(estadia1).isNotEqualTo(estadia2);
        estadia1.setId(null);
        assertThat(estadia1).isNotEqualTo(estadia2);
    }
}
