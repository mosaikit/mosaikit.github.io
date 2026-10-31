<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# mosaikit.github.io

The public site of Mosaikit, served by GitHub Pages at <https://mosaikit.github.io/>.

| Path | Content |
|---|---|
| `/` | the presentation of the project |
| `/plugins/` | the official plugins ([mosaikit-plugins](https://github.com/mosaikit/mosaikit-plugins)) |

The pages are plain HTML and CSS without a build. `.github/workflows/pages.yml` publishes them at every push
and by hand. The documentation lives in the repository [mosaikit](https://github.com/mosaikit/mosaikit)
(`docs/architecture.md` and the guides); the plugins page is edited by hand when a plugin is added or its
description changes.
