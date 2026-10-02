# Como editar os textos do site

Os textos do site ficam nesta pasta, um arquivo para cada parte. Para mudar alguma coisa:

1. Clique no arquivo (lista abaixo).
2. Clique no lápis ✏️, no canto direito, acima do texto.
3. Edite o texto.
4. Clique no botão verde **Commit changes...**, escreva o que mudou (ex.: "corrige bio") e confirme.

Em uns 2 minutos o site jessduma.com.br atualiza sozinho. Se algo estiver fora do formato, o site
**não quebra**: ele continua com a versão anterior, e o GitHub manda um e-mail avisando que falhou
em "build". Aí é só desfazer a última mudança ou chamar o Paulo.

| Arquivo | O que é |
|---|---|
| `bio.md` | Bio (seção "Bio") |
| `frase.md` | A frase grande logo abaixo da foto de capa |
| `drogas-modernas.md` | Texto da série Drogas Modernas |
| `des-util.md` | Texto da série des.útil |
| `fragmentos-do-que-se-e.md` | Texto da série Fragmentos do que se é |
| `cv.md` | Exposições coletivas e formação |

## Regras simples

- **Parágrafos:** deixe uma linha em branco entre eles.
- **Itálico:** coloque o trecho entre asteriscos: `*assim*` vira *assim*.
- **No `cv.md`**, cada item é uma linha começando com hífen, no formato:

  ```
  - 2026 — Nome da exposição — Lugar, Cidade
  ```

  Ano, travessão, título, travessão, lugar. Pode usar `-` no lugar de `—`, sempre com espaço dos
  dois lados. Para adicionar uma exposição, copie uma linha parecida e troque o texto. A ordem das
  linhas é a ordem no site (mais recente primeiro).
- Não renomeie nem apague os arquivos, nem os títulos `##` do `cv.md`.

Fotos, títulos e dados técnicos das obras (técnica, dimensões) não ficam aqui: peça ao Paulo.
