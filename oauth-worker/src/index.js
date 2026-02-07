export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const client_id = env.GITHUB_CLIENT_ID;
    const client_secret = env.GITHUB_CLIENT_SECRET;

    // 1. Redirect to GitHub Auth
    if (url.pathname === '/auth') {
      return Response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`,
        302
      );
    }

    // 2. Handle Callback & Exchange Code for Token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({ client_id, client_secret, code })
      });

      const result = await response.json();
      
      // 3. Send Token back to Decap CMS via postMessage
      if (result.error) {
        return new Response(JSON.stringify(result), { status: 400 });
      }

      const content = `
        <script>
          const receiveMessage = (message) => {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(result)}', 
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        </script>
      `;

      return new Response(content, {
        headers: { 'content-type': 'text/html;charset=UTF-8' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
