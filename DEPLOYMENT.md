# Deployment Guide

## ⚠️ Important: Docker Socket Requirement

Your application requires access to the Docker daemon (`/var/run/docker.sock`), which is **NOT available** on:
- ❌ Vercel (serverless)
- ❌ Netlify (serverless)
- ❌ Render Free Tier (containerized, no Docker socket)

## ✅ Recommended Deployment Platforms

### Option 1: Railway (Easiest - Recommended)
Railway provides Docker socket access and is the easiest to deploy.

**Steps:**
1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `Docker-Automation` repository
4. Railway will auto-detect and deploy
5. Add environment variable:
   - `PORT` = `5000`
6. In Settings → Networking, enable public domain
7. Copy the generated URL (e.g., `https://your-app.railway.app`)

**Update Client:**
```env
REACT_APP_API_URL=https://your-app.railway.app
```

---

### Option 2: Render (VPS/Docker)
Render requires a paid plan for Docker socket access.

**Steps:**
1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Environment**: Docker
   - **Dockerfile Path**: `./server/Dockerfile`
   - **Docker Context**: `./server`
5. Add environment variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
6. Deploy (Note: Free tier won't work - you need paid plan for Docker socket)

---

### Option 3: DigitalOcean App Platform
**Steps:**
1. Go to [DigitalOcean](https://cloud.digitalocean.com/apps)
2. Create new App → Select your GitHub repo
3. Configure server component:
   - **Type**: Web Service
   - **Dockerfile**: `server/Dockerfile`
   - **HTTP Port**: `5000`
4. Deploy and get URL

---

### Option 4: VPS/Self-Hosted (Full Control)
Deploy on any VPS (DigitalOcean Droplet, AWS EC2, Google Cloud VM, etc.)

**Steps:**
1. SSH into your server
2. Install Docker and Node.js
3. Clone your repository:
   ```bash
   git clone https://github.com/Harihkvent/Docker-Automation.git
   cd Docker-Automation/server
   ```
4. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
5. Create `.env` file:
   ```
   PORT=5000
   ```
6. Run with PM2 (process manager):
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name docker-api
   pm2 save
   pm2 startup
   ```
7. Configure Nginx as reverse proxy (optional)
8. Get your server IP/domain

---

## Frontend Deployment (Vercel/Netlify)

### Deploy Frontend to Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-backend-url.com`
5. Deploy

### Deploy Frontend to Netlify:
1. Go to [netlify.com](https://netlify.com)
2. Import from GitHub
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-backend-url.com`
5. Deploy

---

## Quick Start with Railway (Fastest)

1. **Deploy Backend:**
   - Go to https://railway.app/new
   - Connect GitHub repo
   - Select `Docker-Automation`
   - Railway auto-deploys
   - Get URL from deployment

2. **Update Client .env:**
   ```bash
   cd client
   # Edit .env file
   REACT_APP_API_URL=https://your-railway-url.railway.app
   ```

3. **Deploy Frontend to Vercel:**
   ```bash
   cd client
   npm install -g vercel
   vercel --prod
   ```

4. **Done!** 🎉

---

## Testing Your Deployment

After deployment, test these endpoints:

```bash
# List containers
curl https://your-backend-url.com/list

# Get container info
curl https://your-backend-url.com/containers

# Check health
curl https://your-backend-url.com/api/status
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

---

## Troubleshooting

**Issue: Docker socket error**
- Solution: Make sure you're using Railway or a VPS with Docker installed

**Issue: Mixed Content / HTTPS errors**
- Solution: When deploying the frontend to HTTPS (e.g. Vercel), the `REACT_APP_API_URL` must also use `https://`. Using `http://` will cause the browser to block requests. The client includes an automatic upgrade from `http://` to `https://` when served over HTTPS, but it is best to configure the correct URL.

**Issue: CORS errors**
- Solution: Verify CORS is enabled in server and the frontend URL matches

**Issue: 404 on routes**
- Solution: Check that REACT_APP_API_URL is set correctly and has no trailing slash

---

## Cost Comparison

| Platform | Free Tier | Docker Support | Difficulty |
|----------|-----------|----------------|------------|
| Railway | 500 hrs/month | ✅ Yes | Easy ⭐⭐⭐ |
| Render | Limited | ⚠️ Paid only | Medium ⭐⭐ |
| DigitalOcean | No | ✅ Yes | Medium ⭐⭐ |
| VPS | No ($5-10/mo) | ✅ Yes | Hard ⭐ |
| Vercel | Yes | ❌ No | N/A |

**Recommendation**: Use Railway for backend + Vercel for frontend
