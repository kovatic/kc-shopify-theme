# Graph Report - /Users/santhoshraja/Santhosh/Web Application/kschinnadurai  (2026-05-16)

## Corpus Check
- Corpus is ~24,767 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 71 edges · 10 communities (6 shown, 4 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Cart Stitch Logic|Cart Stitch Logic]]
- [[_COMMUNITY_Theme Doc Concepts|Theme Doc Concepts]]
- [[_COMMUNITY_CartDrawer Class Core|CartDrawer Class Core]]
- [[_COMMUNITY_DOM Element Variables|DOM Element Variables]]
- [[_COMMUNITY_Cart Render Pipeline|Cart Render Pipeline]]
- [[_COMMUNITY_Project Governance Docs|Project Governance Docs]]
- [[_COMMUNITY_Wishlist & Cart Icons|Wishlist & Cart Icons]]
- [[_COMMUNITY_Account & Search Icons|Account & Search Icons]]
- [[_COMMUNITY_Category Frame Asset|Category Frame Asset]]

## God Nodes (most connected - your core abstractions)
1. `CartDrawer` - 18 edges
2. `Shopify Skeleton Theme Architecture` - 10 edges
3. `CartDrawer.onBodyClick` - 7 edges
4. `CartDrawer.updateItems` - 5 edges
5. `CartDrawer.renderCart` - 5 edges
6. `Shopify Skeleton Theme Project` - 4 edges
7. `CartDrawer.open` - 3 edges
8. `CartDrawer.removeOrphanedAddons` - 3 edges
9. `Cart Form Submit Handler` - 3 edges
10. `Shopify Cart Ajax API` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Cart Icon SVG` --conceptually_related_to--> `CartDrawer`  [INFERRED]
  assets/icon-cart.svg → cart-drawer.js
- `CartDrawer` --conceptually_related_to--> `Shopify Skeleton Theme Architecture`  [INFERRED]
  cart-drawer.js → AGENTS.md
- `Shopify Skeleton Theme Architecture` --semantically_similar_to--> `CLAUDE.md Project Instructions`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `Shopify Skeleton Theme Project` --references--> `Shoppy X-Ray Logo SVG`  [EXTRACTED]
  README.md → assets/shoppy-x-ray.svg
- `CartDrawer` --calls--> `CartDrawer.open`  [EXTRACTED]
  cart-drawer.js → assets/cart-drawer.js

## Hyperedges (group relationships)
- **Cart Add-to-Cart Lifecycle** — assets_cart_drawer_submithandler, assets_cart_drawer_rendercart, assets_cart_drawer_open [EXTRACTED 1.00]
- **Stitching Addon Decision Flow** — assets_cart_drawer_onbodyclick, assets_cart_drawer_showstitchprompt, assets_cart_drawer_dismissstitchprompt, assets_cart_drawer_tailoringmodal [EXTRACTED 1.00]
- **Theme Architecture Governance Documents** — agents_md_theme_arch, readme_project, contributing_md, code_of_conduct_md [INFERRED 0.85]

## Communities (10 total, 4 thin omitted)

### Community 0 - "Cart Stitch Logic"
Cohesion: 0.29
Nodes (10): CartDrawer.dismissStitchPrompt, CartDrawer.onBodyClick, CartDrawer.removeOrphanedAddons, Shopify Cart Ajax API, CartDrawer.showStitchPrompt, openTailoringModalForAddUnit (external), CartDrawer.updateItem, CartDrawer.updateItems (+2 more)

### Community 1 - "Theme Doc Concepts"
Cohesion: 0.33
Nodes (9): Blocks (Liquid Components), LiquidDoc Documentation Standard, Localization Standards, Liquid Schema Tag, Sections (Liquid Components), Snippets (Liquid Fragments), Shopify Skeleton Theme Architecture, Translation Development Standards (+1 more)

### Community 3 - "DOM Element Variables"
Cohesion: 0.25
Nodes (7): action, btn, cartIcon, d, drawer, form, formData

### Community 4 - "Cart Render Pipeline"
Cohesion: 0.4
Nodes (6): DOMContentLoaded Cart Init, CartDrawer.escHtml, CartDrawer.formatMoney, CartDrawer.open, CartDrawer.renderCart, Cart Form Submit Handler

### Community 6 - "Project Governance Docs"
Cohesion: 0.4
Nodes (5): Shoppy X-Ray Logo SVG, Code of Conduct (Contributor Covenant), Contributing Guidelines, MIT License (Shopify Theme Store Restricted), Shopify Skeleton Theme Project

## Knowledge Gaps
- **22 isolated node(s):** `form`, `action`, `drawer`, `btn`, `formData` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CartDrawer` connect `CartDrawer Class Core` to `Cart Stitch Logic`, `Theme Doc Concepts`, `DOM Element Variables`, `Cart Render Pipeline`, `CartDrawer Methods`, `Wishlist & Cart Icons`?**
  _High betweenness centrality (0.740) - this node is a cross-community bridge._
- **Why does `Shopify Skeleton Theme Architecture` connect `Theme Doc Concepts` to `CartDrawer Class Core`, `Project Governance Docs`?**
  _High betweenness centrality (0.378) - this node is a cross-community bridge._
- **Why does `CartDrawer.onBodyClick` connect `Cart Stitch Logic` to `CartDrawer Class Core`?**
  _High betweenness centrality (0.265) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `CartDrawer` (e.g. with `Shopify Skeleton Theme Architecture` and `Cart Icon SVG`) actually correct?**
  _`CartDrawer` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Shopify Skeleton Theme Architecture` (e.g. with `CLAUDE.md Project Instructions` and `CartDrawer`) actually correct?**
  _`Shopify Skeleton Theme Architecture` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `form`, `action`, `drawer` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._