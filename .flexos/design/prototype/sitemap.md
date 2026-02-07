---
id: prototype-sitemap
title: "Prototype Sitemap"
description: "Route map for prototype pages"
type: design
subtype: sitemap
status: draft
sequence: 0
tags: [prototype, routing]
relatesTo: []
createdAt: "2026-02-07T22:09:30.985Z"
updatedAt: "2026-02-07T22:09:30.985Z"
---

# Prototype Sitemap

<flex_block type="config">
{
  "routes": {
    "/": "landing-v1.html",
    "/dashboard": "dashboard-v1.html"
  },
  "fallback": "404.html",
  "pages": [
    {
      "id": "landing",
      "route": "/",
      "file": "landing-v1.html",
      "auth": false
    },
    {
      "id": "dashboard",
      "route": "/dashboard",
      "file": "dashboard-v1.html",
      "auth": true
    }
  ]
}
</flex_block>

## Routes

| Route | File | Auth |
|-------|------|------|
| / | landing-v1.html | No |
| /dashboard | dashboard-v1.html | Yes |

---

*Prototype HTML files pending AI generation*
