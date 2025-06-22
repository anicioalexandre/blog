---
title: "Architecting a GitHub-Powered Comment System with React"
description: "Explore a comment system using GitHub APIs, covering key decisions on authentication, Relay data handling, and React components in Astro."
discussionId: "D_kwDOEJ1PX84Adhwb"
date: 2025-03-01 12:00:00 UTC
hero: ./hero.jpg
heroCredit: "Image generated using Google FX AI, based on Hokusai's 'The Great Wave off Kanagawa'."
heroAlt: "An AI-generated artwork inspired by Hokusai's 'The Great Wave off Kanagawa."
category: "frontend"
tags:
  - astro
  - react
  - relay
  - GraphQL
  - GitHub
---

### Introduction
Talk about astro, cloudflare pages (talk about workers and astro), react and relay

### Implementing GitHub Authentication
Talk about github integration and authentication, cloudflare KV, astro api routes and cookie handleing (talk about security), github app and user apis

### Structuring Components
Talk about how each component connect with each other (first how we would render it in an astro page, so talk about islands and web components briefly, then illustrate with a diagram), how and why to use relay with different fetch functions (why multiple providers strategy wont work in this case)

### Putting It All Together
End-to-end walkthrough, from authentication to fetching comments.
Links to GitHub repo & resources.