# Complemento enviado — diagnóstico

Arquivo original: Screencast From 2026-11-16 10-56-56.mp4
Duração: 35,16 s. Resolução: 1440 × 900. H.264, sem faixa de áudio detectada.

A gravação mostra o pedido de abrir o boletim e a resposta como texto. Nos quadros inspecionados não aparecem painel inline, filtros ou botões por notícia. Isso documenta uma falha/limitação de apresentação; não é uma falha na gravação do usuário.

Na investigação, a ferramenta abrir_boletim foi encontrada no catálogo atualizado e respondeu em produção com notícias e filtros. A mera resposta da ferramenta não comprova que o host exibiu a interface. A instrução de roteamento foi adicionada ao plugin privado na versão 1.0.1: pedidos de abrir o boletim devem invocar abrir_boletim, sem substituir a interface por texto ou alegar que controles foram mostrados.

A confirmação visual no host real permanece pendente. Não solicitar nova gravação antes de observar a interface funcionando.
