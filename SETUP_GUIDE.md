# 🏗️ Prow Constructions — Website & Email Setup Guide

> **Domain:** `prowconstructions.com` (GoDaddy)
> **GitHub Repo:** `Mindblender3094/prow-constructions`
> **Date Setup:** March 2026

---

## 📋 Table of Contents

1. [Website Hosting — GitHub Pages](#1-website-hosting--github-pages)
2. [Domain Configuration — GoDaddy DNS](#2-domain-configuration--godaddy-dns)
3. [Free Email Setup — ImprovMX + Gmail](#3-free-email-setup--improvmx--gmail)
4. [Final Checklist](#4-final-checklist)
5. [Future Hosting Options](#5-future-hosting-options)

---

## 1. Website Hosting — GitHub Pages

GitHub Pages is used to host this website **completely free**, with a global CDN and automatic SSL.

### How to Enable GitHub Pages

1. Go to the GitHub repo: `github.com/Mindblender3094/prow-constructions`
2. Click **Settings** (top menu)
3. In the left sidebar → click **Pages**
4. Under **"Source"** → select `Deploy from a branch`
5. Under **"Branch"** → select `main`, folder: `/ (root)`
6. Click **Save**

> ✅ Site initially available at: `https://mindblender3094.github.io/prow-constructions`

### Set Custom Domain

1. In the same **Pages settings** page
2. Under **"Custom domain"** → type `prowconstructions.com`
3. Click **Save**

> GitHub automatically creates a `CNAME` file in your repo.

### Enable HTTPS (after DNS propagates)

1. Go back to **Settings → Pages**
2. Check the **"Enforce HTTPS"** checkbox
3. GitHub provides a **free SSL certificate** via Let's Encrypt

---

## 2. Domain Configuration — GoDaddy DNS

These DNS records in GoDaddy connect `prowconstructions.com` to GitHub Pages and enable email.

### How to Access DNS Settings

1. Log in to [GoDaddy](https://godaddy.com)
2. Go to **My Products** → `prowconstructions.com` → **DNS** → **Manage DNS**

---

### A Records (Website — GitHub Pages)

> ⚠️ Delete any existing `A` records with Name `@` before adding these.

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 600 sec |
| A | `@` | `185.199.109.153` | 600 sec |
| A | `@` | `185.199.110.153` | 600 sec |
| A | `@` | `185.199.111.153` | 600 sec |

> These are GitHub's official server IPs.

---

### CNAME Record (www redirect)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `mindblender3094.github.io` | 1 hour |

> This ensures `www.prowconstructions.com` also works.

---

### MX Records (Email — ImprovMX)

> ⚠️ Delete any existing MX records before adding these.

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| MX | `@` | `mx1.improvmx.com` | 10 | 1 hour |
| MX | `@` | `mx2.improvmx.com` | 20 | 1 hour |

---

### TXT Record (SPF — Prevents Emails Going to Spam)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | `@` | `v=spf1 include:spf.improvmx.com ~all` | 1 hour |

---

### ⏱️ DNS Propagation

After saving all records, DNS changes take **15 minutes to 24 hours** to fully propagate worldwide.

---

## 3. Free Email Setup — ImprovMX + Gmail

This setup gives professional email addresses like `info@prowconstructions.com` — **completely free** to both send and receive.

### How It Works

```
Someone sends email → info@prowconstructions.com
                              ↓  (ImprovMX forwards it)
                    Arrives in your Gmail inbox
                              ↓  (you reply via Gmail SMTP)
              Recipient sees → info@prowconstructions.com
```

---

### Step A — Set Up ImprovMX (Receive Emails)

1. Go to [https://improvmx.com](https://improvmx.com)
2. Enter `prowconstructions.com` → click **"Create a free alias"**
3. Sign up / log in
4. Add email aliases (forwarding rules):

| Alias | Forwards To |
|-------|-------------|
| `info@prowconstructions.com` | your personal Gmail |
| `quotes@prowconstructions.com` | your personal Gmail |
| `admin@prowconstructions.com` | your personal Gmail |

> Free plan supports multiple aliases forwarding to the same Gmail inbox.

---

### Step B — Create Gmail App Password

Required so Gmail can send emails on behalf of your custom domain.

1. Go to [https://myaccount.google.com](https://myaccount.google.com)
2. Click **Security** → **2-Step Verification** (turn ON if not already)
3. Search for **"App Passwords"** → click it
4. Type a name (e.g., `ImprovMX`) → click **Create**
5. **Copy the 16-character password** shown — save it somewhere safe

---

### Step C — Get ImprovMX SMTP Password

1. Log in to ImprovMX dashboard
2. Go to your domain → click **"SMTP Credentials"**
3. Create credentials for `info@prowconstructions.com`
4. **Copy the SMTP password**

---

### Step D — Configure Gmail to Send From Custom Domain

1. Open **Gmail** → ⚙️ Settings → **See all settings**
2. Go to **"Accounts and Import"** tab
3. Under **"Send mail as"** → click **"Add another email address"**
4. Fill in Screen 1:
   - **Name:** `Prow Constructions`
   - **Email:** `info@prowconstructions.com`
   - ☐ Uncheck **"Treat as alias"**
5. Fill in Screen 2 (SMTP):
   - **SMTP Server:** `smtp.improvmx.com`
   - **Port:** `587`
   - **Username:** `info@prowconstructions.com`
   - **Password:** *(ImprovMX SMTP password from Step C)*
   - Select **TLS**
6. Click **Add Account**

---

### Step E — Verify Email Address

1. Gmail sends a verification email to `info@prowconstructions.com`
2. ImprovMX forwards it to your Gmail inbox
3. Click the **verification link** in that email ✅

---

### Using Your Professional Email in Gmail

When composing an email, use the **"From:"** dropdown to select:

```
From: ▼
  ○ yourname@gmail.com
  ● info@prowconstructions.com   ← Use this for business emails
```

---

## 4. Final Checklist

```
HOSTING
[ ] GitHub Pages enabled on main branch
[ ] Custom domain set to prowconstructions.com
[ ] HTTPS enforced (after DNS propagates)

DNS (GoDaddy)
[ ] 4 x A records → GitHub IPs
[ ] CNAME www → mindblender3094.github.io
[ ] 2 x MX records → ImprovMX
[ ] TXT SPF record → ImprovMX

EMAIL
[ ] ImprovMX account created
[ ] Email aliases set up (info@, quotes@, etc.)
[ ] Gmail App Password created
[ ] ImprovMX SMTP credentials obtained
[ ] Gmail configured to send from prowconstructions.com
[ ] Verification email confirmed
```

---

## 5. Future Hosting Options

Your domain is independent of your host — you can migrate anytime by simply updating DNS records in GoDaddy.

| Host | Best For | Cost | Migration Effort |
|------|----------|------|-----------------|
| **GitHub Pages** (current) | Static sites | Free | — |
| **Netlify** | Static + forms + functions | Free tier | ~15 min |
| **Vercel** | Static + Next.js | Free tier | ~15 min |
| **Cloudflare Pages** | Fast global CDN | Free | ~15 min |
| **Hostinger** | Full PHP/WordPress | ~₹99/mo | ~1 hour |
| **DigitalOcean** | Custom server | ~₹840/mo | ~2–3 hours |

### How to Migrate (General Steps)
1. Sign up on new host → connect your GitHub repo
2. Get the new host's IP address or CNAME
3. Update DNS records in GoDaddy to point to new host
4. Wait for DNS propagation (15 min – 24 hours)
5. Enable HTTPS on new host

> 💡 **Your website code doesn't change** — only the DNS records in GoDaddy change.

---

## 📞 Key Service Links

| Service | URL | Purpose |
|---------|-----|---------|
| GitHub Pages | [github.com/Mindblender3094/prow-constructions/settings/pages](https://github.com/Mindblender3094/prow-constructions/settings/pages) | Website hosting |
| GoDaddy DNS | [dcc.godaddy.com](https://dcc.godaddy.com) | Domain & DNS management |
| ImprovMX | [improvmx.com](https://improvmx.com) | Email forwarding |
| Google Account | [myaccount.google.com](https://myaccount.google.com) | App passwords |

---

*Last updated: March 2026*
