# Deployment Guide

## Vercel Deployment (Recommended)

### Quick Deploy
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Netlify Deployment

### Via Git
1. Push to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Via CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

## Self-Hosted Deployment

### Prerequisites
- Node.js 18+ installed
- PM2 for process management (optional)

### Build and Start
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### With PM2
```bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start npm --name "money-tracker" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Docker Deployment

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run
```bash
# Build image
docker build -t money-tracker .

# Run container
docker run -p 3000:3000 money-tracker
```

## Environment Variables

This app doesn't require environment variables as all data is stored in localStorage.

If you add backend features in the future, create a `.env.local` file based on `.env.example`.

## Post-Deployment Checklist

- [ ] Test CSV upload with sample file
- [ ] Test manual transaction entry
- [ ] Test search functionality
- [ ] Test delete operations
- [ ] Verify mobile responsiveness
- [ ] Check localStorage persistence (refresh page)
- [ ] Test with real Chase CSV file
- [ ] Verify error handling

## Production Optimization

The build is already optimized with:
- ✅ Static page generation
- ✅ Code splitting
- ✅ Minification
- ✅ Image optimization (if using next/image)
- ✅ CSS optimization

## Custom Domain

### Vercel
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Configure DNS

## Monitoring

For production monitoring, consider:
- Vercel Analytics (built-in)
- Google Analytics
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

## Backup

Since data is stored in localStorage:
- Users should export CSV regularly
- Consider adding automatic backup feature in future
- No server-side backup needed

## Support

For deployment issues:
- Check build logs
- Verify Node.js version (18+)
- Ensure all dependencies are installed
- Check browser console for errors
