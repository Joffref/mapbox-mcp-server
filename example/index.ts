import { BlaxelMcpClientTransport, env } from "@blaxel/core";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function connectToMapboxMCP() {
  const apiKey = env.BL_API_KEY;
  const workspace = env.BL_WORKSPACE;
  const serverName = env.MCP_SERVER_NAME || "mapbox-mcp-server";

  if (!apiKey || !workspace) {
    throw new Error("BL_API_KEY and BL_WORKSPACE environment variables must be set");
  }

  const headers = {
    "X-Blaxel-Authorization": `Bearer ${apiKey}`
  };

  // Create the transport with WebSocket URL and headers
  const transport = new BlaxelMcpClientTransport(
    `wss://run.blaxel.ai/${workspace}/functions/${serverName}`,
    headers
  );

  // Create the MCP client
  const client = new Client(
    {
      name: "mapbox-mcp-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  try {
    // Connect to the server
    await client.connect(transport);
    console.log("Connected to Mapbox MCP Server");

    // List available tools
    const response = await client.listTools();
    console.log(`Available tools: ${response.tools.length}`);
    response.tools.forEach(tool => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });

    // Example: Call the geocoding tool
    const geocodingResult = await client.callTool({
      name: "mapbox_geocoding",
      arguments: {
        searchText: "San Francisco",
        limit: 5
      }
    });
    console.log("\nGeocoding result:");
    console.log(JSON.stringify(geocodingResult, null, 2));

    // Example: Get directions between places
    const directionsResult = await client.callTool({
      name: "mapbox_directions_by_places",
      arguments: {
        places: ["San Francisco", "Los Angeles"],
        profile: "driving"
      }
    });
    console.log("\nDirections result:");
    console.log(JSON.stringify(directionsResult, null, 2));

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Clean up
    await client.close();
    await transport.close();
  }
}

connectToMapboxMCP().catch(console.error);