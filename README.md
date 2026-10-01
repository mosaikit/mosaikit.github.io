<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# mosaikit.github.io

The site of Mosaikit, served by GitHub Pages at <https://mosaikit.github.io/>
([ADR-0025](https://github.com/mosaikit/mosaikit/blob/main/docs/adr/0025-github-pages-and-maven-namespace.md)).

| Path | Content |
|---|---|
| `/` | the presentation of the project |
| `/marketplace/` | the plugins of the [catalog](https://github.com/mosaikit/catalog), read from its signed `index.json` |
| `/schemas/` | the JSON schemas whose `$id` is under this site (plugin manifest, requirement) |

The documentation (`/mosaikit/`) and the catalog (`/catalog/`) are published by their own
repositories. Plain HTML, CSS and JavaScript without a build: the branch `main` is the site.

The schemas are copies of `sdk/java/src/main/resources/dev/mosaikit/kernel/api/plugin/plugin-manifest.schema.json`
and `docs/requirements/requirement.schema.json` of [mosaikit](https://github.com/mosaikit/mosaikit):
a new version of a schema gets a new file here.
