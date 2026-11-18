# Brasil Notícias

Plugin de notícias brasileiras com fontes, boletim inline e worker para coleta.

**Arquivos principais**

- [app/boletim.html](<app/boletim.html>)
- [worker/](<worker/>)
- [docs/](<docs/>)

<p align="center"><img src="assets/icon.png" alt="Brasil Notícias" width="160"></p>

# Brasil Notícias

Plugin gratuito de notícias brasileiras, em português, com boletim inline no chat. Consulte manchetes, filtre veículos e pergunte sobre uma matéria, com respostas orientadas a usar apenas as evidências recuperadas.

**Estado:** código público em desenvolvimento. A distribuição no diretório de plugins ainda não foi submetida nem aprovada.

## O que oferece

- Catálogo editorial de 44 fontes nacionais, regionais, emissoras, agências e veículos especializados.
- Filtros de tradicionais, emissoras, regionais, especializadas e institucionais.
- Fontes, links, horários da consulta e limites do material acessível.
- Leitura de matéria quando o corpo está disponível, sem contornar paywalls.
- Boletim inline com perguntas por notícia.

“Tradicionais” é um recorte editorial explícito, sem pontuação automática de confiabilidade. Marca consolidada não garante acurácia. O boletim distribui resultados entre veículos; não é um ranking das principais notícias do país. Manchetes de capa sem data podem ser antigas.

## Gratuidade e consumo de IA

O Brasil Notícias não cobra assinatura, consultas ou tokens e não exige uma chave de API do usuário. O servidor consulta fontes; não chama um modelo de IA. A interpretação e a resposta acontecem no modelo do host escolhido pelo usuário.

No ChatGPT/Codex, esse uso está sujeito ao plano, aos créditos e aos limites da conta do usuário. Em outro cliente, aplicam-se as regras do provedor configurado nele. A gratuidade do plugin não inclui planos de terceiros. Custos e limites da hospedagem do servidor continuam separados.

## Desenvolvimento

Requisito: Node.js 22 ou superior. Não há dependências de produção a instalar.

```sh
node scripts/build.mjs
node scripts/release-tests.mjs
node scripts/validate-artifact.mjs
```

O build gera `dist/server/index.js`, um Worker ESM independente com `fetch`. O arquivo `.openai/hosting.example.json` é um exemplo de hospedagem; configure a identidade do seu próprio projeto em `.openai/hosting.json`. Nenhum segredo ou identidade de hospedagem privada está incluído.

Teste com fontes reais (depende da disponibilidade dos veículos):

```sh
node scripts/check.mjs
```

O servidor atende JSON-RPC em `POST /mcp`. Ferramentas: `abrir_boletim`, `buscar_noticias`, `aprofundar_noticia`, `listar_fontes`. Outros caminhos não oferecem um site.

## Privacidade

O código não armazena perguntas nem adiciona analytics ou publicidade. Mantém apenas um cache temporário de manchetes públicas. As políticas da plataforma de chat, da hospedagem e dos veículos continuam aplicáveis. Consulte [privacidade](https://nivandosoares.github.io/brasil-noticias/privacidade.html).

## Versões e colaboração

As versões seguem SemVer. Consulte [CHANGELOG.md](CHANGELOG.md), [releases](https://github.com/nivandosoares/brasil-noticias/releases) e [como contribuir](CONTRIBUTING.md).

Suporte: [GitHub Issues](https://github.com/nivandosoares/brasil-noticias/issues) ou sidvandoni@gmail.com. Não publique dados pessoais ou segredos em issues.

## Licença

Código sob [MIT](LICENSE). Textos, marcas e conteúdo jornalístico pertencem aos respectivos titulares e não são abrangidos pela licença do código. Projeto independente, sem afiliação presumida aos veículos listados.

## Candidato ao diretório

O diretório `plugin/` contém um pacote candidato, com ícone e oito casos de revisão. Consulte [review/status.md](review/status.md) para os bloqueios atuais. Ainda não foi enviado à revisão. A versão do pacote candidato é 1.0.1, preservando a sequência do plugin privado; as releases deste repositório acompanham o código público em 0.x.
