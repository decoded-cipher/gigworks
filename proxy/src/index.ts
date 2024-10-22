const websiteUrl = "https://gigworks-client.pages.dev";
const apiUrl = "https://gigworks-server.devmorphix.workers.dev";

// Handle requests
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api")) {
    return proxyRequest(apiUrl + url.pathname, request);
  } else {
    return proxyRequest(websiteUrl + url.pathname, request);
  }
}

// Proxy request to target URL
async function proxyRequest(targetUrl: string, request: Request): Promise<Response> {
  const init: RequestInit = {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
  };

  const response = await fetch(targetUrl, init);
  const modifiedResponse = new Response(response.body, response);

  if (targetUrl.startsWith(apiUrl)) {
    modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
    modifiedResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    modifiedResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return modifiedResponse;
}

// Export fetch handler
export default {
  async fetch(request: Request): Promise<Response> {
    return handleRequest(request);
  }
};