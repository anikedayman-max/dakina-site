# CLAUDE.md — Guide Claude Code pour le projet Dakina Site

Ce fichier aide Claude Code (et tout assistant IA) à intervenir efficacement sur ce repo.

## 🎯 Contexte du projet

Site web de **Dakina Consulting**, cabinet de conseil cloud Azure + IA + IaC.
Positionnement : senior expertise, AI-native delivery, couverture France + MENA (Arabie Saoudite, Émirats, Maroc).

**Audience cible** : CTO, Head of Cloud, DSI d'entreprises moyennes à grandes en France et au MENA.

## 🛠️ Stack technique

- **Framework** : Astro v4 (statique)
- **Langage** : TypeScript + Astro components (`.astro`)
- **Styles** : CSS pur avec design tokens (pas de Tailwind, pas de SCSS)
- **i18n** : JSON-based, EN par défaut, FR sous `/fr/`
- **Hosting** : OVH Web mutualisé via SFTP
- **CI/CD** : GitHub Actions

## 📂 Conventions de code

### Composants Astro
- PascalCase pour le nom de fichier (`Header.astro`, `ServiceCard.astro`)
- Props typées via une interface `Props` en haut du frontmatter
- Styles scopés via `<style>` (sauf si vraiment global, alors dans `src/styles/global.css`)
- Pas de framework JS lourd (React, Vue) — Astro suffit

### Pages
- Une page = un fichier dans `src/pages/`
- Pour les routes dynamiques : `[slug].astro` + `getStaticPaths()`
- Toujours wrapper dans `<PageLayout locale="en" />` ou `locale="fr"`
- Toujours passer un `title` et `description` au layout pour le SEO

### Internationalisation
- **Ne jamais hardcoder un texte FR ou EN dans un composant**.
- Tout texte doit venir de `src/i18n/en.json` ou `fr.json`.
- Récupérer les traductions via `getTranslations(locale)`.
- Lors de l'ajout d'une nouvelle string : l'ajouter dans **les deux** JSON simultanément.

### Liens internes
- Pour la version EN : `/services/azure-architecture`
- Pour la version FR : `/fr/services/azure-architecture`
- Toujours dériver le préfixe depuis la locale : `const base = locale === 'en' ? '' : '/fr';`

## 🎨 Design system

Variables CSS dans `src/styles/global.css` :

| Variable             | Usage                                |
| -------------------- | ------------------------------------ |
| `--navy`             | Background principal                 |
| `--navy-card`        | Background des cards                 |
| `--cyan`             | Couleur accent (CTA, links, labels)  |
| `--blue`             | Couleur secondaire (gradients)       |
| `--white`            | Texte principal                      |
| `--gray-200`         | Texte secondaire                     |
| `--gray-400`         | Texte tertiaire (labels, captions)   |
| `--font-main`        | Inter (body)                         |
| `--font-head`        | Space Grotesk (titres)               |
| `--radius`           | 14px (cards, buttons)                |
| `--radius-lg`        | 22px (sections, modales)             |

**Toujours utiliser ces variables**, jamais de valeurs hardcodées.

## ✍️ Tonalité éditoriale

- Anglais international, technique, direct
- **Pas de buzzwords** : "synergies", "innovation-driven", "world-class" → bannis
- **Pas de superlatifs** : "the best", "industry-leading" → bannis
- Phrases courtes, verbes d'action
- Crédible pour un CIO/CTO européen ET un acheteur saoudien
- Posture : senior, calme, sans agressivité commerciale

## ⚠️ Choses à ne PAS faire

- ❌ Ne pas créer de témoignages clients fictifs
- ❌ Ne pas inventer de chiffres (effectifs, CA, nombre de missions)
- ❌ Ne pas hardcoder de texte FR/EN dans un composant
- ❌ Ne pas ajouter de framework JS lourd
- ❌ Ne pas casser le contrat i18n (chaque clé doit exister dans EN et FR)
- ❌ Ne pas commit `node_modules/`, `dist/`, `.env`

## ✅ Workflow recommandé

1. Avant toute modif : `npm run dev` pour voir le site localement
2. Modifier les fichiers
3. Vérifier visuellement sur `http://localhost:4321` (EN) et `http://localhost:4321/fr` (FR)
4. `npm run build` pour vérifier que le build passe
5. Commit avec un message clair (anglais ou français, peu importe, mais descriptif)
6. Push sur `main` → déploiement auto sur OVH

## 🆘 Si quelque chose casse

- Erreur de build i18n → vérifier la cohérence des clés entre `en.json` et `fr.json`
- Erreur de TypeScript → vérifier les imports et les types
- Page blanche en prod → vérifier le `.htaccess` dans `public/` (notamment la règle Rewrite)
- Le déploiement GitHub Actions échoue → vérifier les secrets OVH
