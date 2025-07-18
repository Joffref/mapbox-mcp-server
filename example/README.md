# Mapbox MCP Client Example

This example demonstrates how to connect to a Mapbox MCP Server deployed on Blaxel.

## Prerequisites

1. A Blaxel account with API credentials. See [here](https://docs.blaxel.ai/Security/Access-tokens#api-keys) for more details.
2. The Mapbox MCP Server deployed on your Blaxel workspace
3. Node.js 16 or higher

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the example directory with your credentials:
   ```env
   # Blaxel API credentials
   BL_API_KEY=your-blaxel-api-key
   BL_WORKSPACE=your-blaxel-workspace-slug

   # MCP Server name (optional, defaults to "mapbox-mcp-server")
   MCP_SERVER_NAME=mapbox-mcp-server
   ```

   Note: The `MAPBOX_ACCESS_TOKEN` should be configured on the server side in Blaxel, not in the client.

## Running the Example

```bash
npm run example
```

Or with TypeScript directly:

```bash
npx tsx index.ts
```

## What the Example Does

1. **Connects to the MCP Server**: Establishes a WebSocket connection to your Mapbox MCP Server hosted on Blaxel
2. **Lists Available Tools**: Shows all the tools exposed by the server
3. **Geocoding Example**: Searches for "San Francisco" and returns location details
4. **Directions Example**: Gets driving directions from San Francisco to Los Angeles

## Available Tools

The Mapbox MCP Server provides these tools:

- `mapbox_geocoding`: Search for places and convert addresses to coordinates
- `mapbox_directions`: Get directions between coordinates
- `mapbox_directions_by_places`: Get directions between places using names
- `mapbox_matrix`: Calculate travel time/distance matrix between coordinates
- `mapbox_matrix_by_places`: Calculate travel time/distance matrix between places

## Customizing the Example

You can modify the example to:

1. Use different tools by changing the `callTool` parameters
2. Search for different locations
3. Try different routing profiles (driving, walking, cycling)
4. Calculate travel matrices between multiple locations

## Troubleshooting

- **Connection Error**: Ensure your Blaxel credentials are correct and the server is deployed
- **Tool Not Found**: Check that the tool name matches exactly (case-sensitive)
- **Invalid Arguments**: Refer to the tool definitions in the server documentation 