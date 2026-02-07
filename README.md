# Decap CMS Static Blog

A production-ready static blog on GitHub Pages with Decap CMS and Cloudflare Workers for auth.

## 🚀 Setup Checklist

### 1. GitHub Repository
1. Create a new repo.
2. Push this code to `main`.
3. Go to **Settings > Pages** -> Source: `GitHub Actions` (Jekyll).

### 2. GitHub OAuth App
1. Go to **Developer Settings > OAuth Apps**.
2. Create New App:
   - **Homepage URL**: `https://your-username.github.io/decap-cms-blog`
   - **Callback URL**: `https://your-worker.workers.dev/callback`
3. Copy **Client ID** and **Client Secret**.

### 3. Cloudflare Worker (Auth Proxy)
1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Navigate to `oauth-worker/`
4. Set secrets:
   ```bash
   wrangler secret put GITHUB_CLIENT_ID
   wrangler secret put GITHUB_CLIENT_SECRET
   ```
5. Deploy: `wrangler deploy`
6. Copy your Worker URL (e.g., `https://oauth-proxy.user.workers.dev`)

### 4. Connect CMS
1. Open `admin/config.yml`.
2. Update `repo`: `your-username/repo-name`.
3. Update `base_url`: Your Cloudflare Worker URL.

### 5. Start Writing
Go to `/admin`, login with GitHub, and create posts!
