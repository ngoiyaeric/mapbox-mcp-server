import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HandlerRegistry } from "./registry.js";
import { NavigationHandler } from "./handlers/navigation.js";

export class MapboxServer {
  private server: Server;
  private registry: HandlerRegistry;

  constructor() {
    this.server = new Server(
      {
        name: "mcp-server/mapbox",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.registry = new HandlerRegistry();
    this.initializeHandlers();
  }

  private initializeHandlers() {
    // 注册所有业务处理器
    this.registry.register(new NavigationHandler());

    // 注册到服务器
    this.registry.registerAll(this.server);
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Mapbox MCP Server running on stdio");
  }
}
