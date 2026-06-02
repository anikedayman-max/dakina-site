# Dakina Consulting — Website

Site web de Dakina Consulting. Stack : **Astro v4** (statique), hébergement **OVH Web mutualisé**, déploiement **GitHub Actions** via SFTP.

## 📐 Architecture

```
src/
├── pages/              # Routes (Astro génère le HTML statique)
│   ├── index.astro     # / (EN - home)
│   ├── about.astro
│   ├── contact.astro
│   ├── services/
│   │   ├── index.astro       # Liste des services
│   │   └── [slug].astro      # Page dynamique par service
│   ├── industries/
│   ├── case-studies/
│   ├── blog/
│   └── fr/             # Arborescence dupliquée pour /fr/
├── components/         # Composants .astro réutilisables
├── layouts/            # Layouts HTML
├── i18n/               # Traductions JSON + helpers
├── styles/             # CSS global avec design tokens
└── content/            # Markdown pour blog & case studies (à venir)

public/                 # Fichiers statiques copiés tels quels
├── logo.png
├── robots.txt
└── .htaccess           # Config Apache pour OVH
```

## 🚀 Installation locale

```bash
# Cloner le repo
git clone <repo-url>
cd dakina-site

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev
# Le site est sur http://localhost:4321
```

## 🛠️ Scripts disponibles

| Commande           | Action                                       |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Lance le serveur local sur localhost:4321    |
| `npm run build`    | Génère le site statique dans `dist/`         |
| `npm run preview`  | Preview le build localement                  |

## 🌍 Multilingue (i18n)

- Langue par défaut : **anglais** (`/`)
- Langue secondaire : **français** (`/fr/`)
- Les traductions sont dans `src/i18n/en.json` et `src/i18n/fr.json`
- Pour modifier un texte : éditer le JSON correspondant, tous les composants se mettent à jour
- Pour ajouter une langue : créer le JSON, ajouter la locale dans `src/i18n/utils.ts` et `astro.config.mjs`

## ✏️ Modifier le contenu

### Textes communs (nav, hero, footer…)
→ `src/i18n/en.json` et `src/i18n/fr.json`

### Pages dédiées (about, contact)
→ `src/pages/about.astro` et `src/pages/fr/about.astro`

### Détail d'un service
→ Pour l'instant, le contenu détaillé est dans `src/pages/services/[slug].astro` (template générique).
→ Pour personnaliser chaque service avec un contenu unique, voir « Étapes suivantes » plus bas.

### Couleurs et styles
→ `src/styles/global.css` (variables CSS dans `:root`)

## 🚢 Déploiement sur OVH

### Configuration initiale (une seule fois)

1. **Récupérer les identifiants FTP/SFTP OVH** dans votre espace client OVH :
   - Host : généralement `ftp.cluster0XX.hosting.ovh.net` ou similaire
   - User
   - Password

2. **Ajouter les secrets dans GitHub** (Repo → Settings → Secrets and variables → Actions) :
   - `OVH_FTP_HOST`
   - `OVH_FTP_USER`
   - `OVH_FTP_PASSWORD`

3. **Vérifier le chemin de destination** dans `.github/workflows/deploy.yml`
   (`server-dir: ./www/` par défaut, à ajuster selon votre OVH).

### Déploiement automatique

Tout push sur `main` déclenche le build et le déploiement automatique.

### Déploiement manuel

```bash
# Build local
npm run build

# Upload manuel via FTP client (FileZilla, Cyberduck) du contenu de dist/ vers /www/
```

## 📋 Étapes suivantes (TODO)

### Phase 2 — Contenu réel des pages
- [ ] Remplacer le contenu placeholder des 6 pages services par du contenu détaillé
  → Voir prompt Claude Code dans la section "Prompts utiles" plus bas
- [ ] Remplacer le contenu placeholder des 4 pages industries
- [ ] Écrire 2-3 premières études de cas anonymisées
- [ ] Écrire les 3 premiers articles de blog

### Phase 3 — Fonctionnalités
- [ ] Brancher le formulaire de contact sur un vrai service (Formspree, OVH mail PHP, ou API custom)
- [ ] Ajouter Google Analytics 4 ou Plausible (RGPD-friendly)
- [ ] Ajouter un favicon SVG dédié (actuellement = logo.png)
- [ ] Créer l'image OpenGraph 1200x630 (`/public/og-image.png`)
- [ ] Créer une page 404 personnalisée

### Phase 4 — Évolutions
- [ ] Ajouter une version arabe (`/ar/`) pour le marché KSA/UAE
- [ ] Activer le blog avec Astro Content Collections (Markdown)
- [ ] Ajouter un système de témoignages clients
- [ ] Ajouter une page "Resources" (livres blancs, templates téléchargeables)

## 🤖 Prompts Claude Code utiles

### Personnaliser le contenu d'un service

```
Dans src/pages/services/[slug].astro, je veux remplacer le contenu placeholder
par du contenu réel pour le service "Azure Architecture".

Structure souhaitée :
1. Hero (déjà fait via le template)
2. Section "The problem we solve" — 2 paragraphes
3. Section "Our delivery approach" — 4 étapes
4. Section "What you get" — liste de livrables
5. Section "Engagement formats" — sprint advisory, fixed-scope, long-term
6. Section "Technologies" — stack utilisée

Le contenu doit être technique, senior, sans buzzwords.

Question : préfères-tu que je crée une page dédiée par service (plus de
flexibilité, plus de fichiers) ou que je garde le template dynamique avec
le contenu spécifique dans le i18n JSON (plus DRY) ?
```

### Ajouter un article de blog

```
Crée un article de blog en EN dans src/content/blog/en/ sur le sujet
"Claude Code in the enterprise: architecture and governance considerations".

Format Markdown frontmatter :
---
title: ...
description: ...
publishDate: 2026-MM-DD
tags: [Claude, AI Engineering, Enterprise]
author: Aiman Anikad
---

Cible : CTO / Head of Cloud d'entreprise. Ton : senior, technique,
opinionated. 1200-1800 mots. Pas de buzzwords.
```

### Brancher le formulaire de contact sur OVH mail PHP

```
Crée un endpoint PHP simple dans public/api/contact.php qui :
1. Reçoit les données POST du formulaire
2. Valide les champs requis et l'email
3. Envoie un mail à contact@dakina-consulting.fr via mail() PHP
4. Renvoie JSON {success: true} ou {error: "..."}

Mets à jour src/pages/contact.astro et src/pages/fr/contact.astro pour
faire un fetch POST vers /api/contact.php au lieu du alert() actuel.

Note : OVH Web mutualisé supporte PHP nativement, pas besoin de serveur Node.
```

## 🆘 Troubleshooting

### Le build échoue avec une erreur i18n
→ Vérifier que le JSON est valide (pas de virgule traînante, structure cohérente entre `en.json` et `fr.json`).

### Le déploiement GitHub Actions échoue
→ Vérifier les secrets `OVH_FTP_*` dans GitHub. Tester la connexion FTP avec FileZilla d'abord.

### Les fonts Google ne se chargent pas
→ Vérifier la CSP dans `.htaccess` (doit autoriser `fonts.googleapis.com` et `fonts.gstatic.com`).

### Le HTTPS ne fonctionne pas
→ Activer le SSL Let's Encrypt gratuit dans l'espace client OVH (1 clic).

## 📞 Contact

contact@dakina-consulting.fr

---

Built with [Astro](https://astro.build/) · Hosted on [OVHcloud](https://www.ovhcloud.com/)
