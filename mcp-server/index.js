#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE_URL = "https://notic-ia-t269.onrender.com";

// Inicializa o servidor MCP
const server = new Server(
  {
    name: "notic-ia-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define as ferramentas disponíveis
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_posts",
        description: "Lista as postagens de notícias mais recentes do blog Notic-ia.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "search_posts",
        description: "Busca notícias no blog Notic-ia por um termo no título.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Termo de busca (ex: 'Inteligência Artificial')",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "create_post",
        description: "Publica uma nova notícia no blog Notic-ia.",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Título da notícia (obrigatório, curto e chamativo)",
            },
            description: {
              type: "string",
              description: "Descrição ou resumo rápido da notícia (obrigatório)",
            },
            body: {
              type: "string",
              description: "Conteúdo completo da notícia (obrigatório, suporta Markdown)",
            },
          },
          required: ["title", "description", "body"],
        },
      },
    ],
  };
});

// Manipulador das chamadas de ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "list_posts") {
      const response = await fetch(`${API_BASE_URL}/posts.json`);
      if (!response.ok) {
        throw new Error(`Erro na API Rails: ${response.statusText}`);
      }
      const posts = await response.json();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(posts, null, 2),
          },
        ],
      };
    } 
    
    if (name === "search_posts") {
      const query = args.query;
      const response = await fetch(`${API_BASE_URL}/posts.json?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Erro na API Rails: ${response.statusText}`);
      }
      const posts = await response.json();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(posts, null, 2),
          },
        ],
      };
    } 
    
    if (name === "create_post") {
      const { title, description, body } = args;
      const token = process.env.NOTIC_IA_API_TOKEN || "noticia_secret_mcp_token_2026";
      
      const response = await fetch(`${API_BASE_URL}/posts.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            body
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Erro ao criar postagem (${response.status}): ${JSON.stringify(errorData)}`,
            },
          ],
        };
      }

      const createdPost = await response.json();
      return {
        content: [
          {
            type: "text",
            text: `Postagem criada com sucesso!\n\n${JSON.stringify(createdPost, null, 2)}`,
          },
        ],
      };
    }

    throw new McpError(ErrorCode.MethodNotFound, `Ferramenta desconhecida: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Erro de execução: ${error.message}`,
        },
      ],
    };
  }
});

// Executa o servidor sobre stdio
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Notic-ia MCP Server rodando na entrada/saída padrão (stdio)...");
}

run().catch((error) => {
  console.error("Erro fatal ao rodar o servidor MCP:", error);
  process.exit(1);
});
