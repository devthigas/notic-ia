# Pesquisa: Como Otimizar o Google Antigravity com a Criação de Skills

## 1. O que é o Google Antigravity
O **Google Antigravity** é uma plataforma e IDE "agent-first" voltada para o desenvolvimento de software auxiliado por inteligência artificial (agentes). Ele atua como um ecossistema que permite a agentes de IA planejar, codificar, depurar e testar de forma autônoma.

## 2. O que são Skills no Antigravity
No contexto do Antigravity, **Skills** (habilidades) são pacotes modulares de instruções que estendem as capacidades do agente. Elas funcionam como guias de boas práticas, definições de workflows, prompts pré-configurados e tarefas específicas.
- Permitem evitar a repetição de instruções em cada prompt.
- Podem ser globais (`~/.gemini/config/skills/`) ou locais por projeto (`.agents/skills/`).

## 3. Estrutura de uma Skill
Cada skill consiste em um diretório com o nome da skill que obrigatoriamente contém um arquivo `SKILL.md`.
```text
nome-da-skill/
├── SKILL.md                 # Instruções e YAML Frontmatter (Obrigatório)
├── scripts/                 # Scripts executáveis (Python, Bash) (Opcional)
├── examples/                # Código de exemplo (Opcional)
└── resources/               # Arquivos e templates de apoio (Opcional)
```
O `SKILL.md` requer um cabeçalho YAML contendo `name` e `description` para ser descoberto pelo agente.

## 4. Como Otimizar o Desenvolvimento Usando Skills
A otimização do Antigravity com skills ocorre de várias formas:
- **Padronização de Código (Code Style)**: Forçar o agente a seguir especificações rígidas do time/empresa sem poluir a janela de contexto com instruções recorrentes.
- **Automação de Pipelines Complexos**: Criar scripts dentro da pasta `scripts/` da skill para realizar builds, deploys ou testes locais automatizados pelo agente.
- **Redução de Alucinações**: Ao fornecer exemplos reais em `examples/` e documentações em `references/`, o agente tem uma base de conhecimento atualizada e livre de desvios comuns.
- **Instruções Empacotadas para Tarefas Repetitivas**: Agilizar a escrita de posts, geração de documentações, auditoria de segurança ou refatoração.
