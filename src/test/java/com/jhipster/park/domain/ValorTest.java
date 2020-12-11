package com.jhipster.park.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.park.web.rest.TestUtil;

public class ValorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Valor.class);
        Valor valor1 = new Valor();
        valor1.setId(1L);
        Valor valor2 = new Valor();
        valor2.setId(valor1.getId());
        assertThat(valor1).isEqualTo(valor2);
        valor2.setId(2L);
        assertThat(valor1).isNotEqualTo(valor2);
        valor1.setId(null);
        assertThat(valor1).isNotEqualTo(valor2);
    }
}
