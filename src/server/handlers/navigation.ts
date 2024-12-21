/*
 * @Author: AidenYangX
 * @Email: xscs709560271@gmail.com
 * @Date: 2024-12-21 23:58:32
 * @Description:
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { BaseHandler } from "./base.js";
import { DirectionsArgsSchema } from "../../schemas/navigation/direction.js";
import { handleDirections } from "../../tools/handlers/navigation/direction.js";
import { DIRECTIONS_TOOL } from "../../tools/definitions/navigation/direction.js";

export class NavigationHandler extends BaseHandler {
  constructor() {
    super();
    this.tools.add("mapbox_directions");
    this.toolDefinitions.push(DIRECTIONS_TOOL);
  }

  async handle({ name, args }: { name: string; args: any }) {
    switch (name) {
      case "mapbox_directions": {
        const { coordinates, profile } = DirectionsArgsSchema.parse(args);
        return await handleDirections(coordinates, profile);
      }
      default:
        throw new Error(`Unsupported navigation tool: ${name}`);
    }
  }
}
