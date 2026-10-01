<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# mosaikit.github.io

Everything public of Mosaikit that is not in its own repository, served by GitHub Pages at
<https://mosaikit.github.io/>
([ADR-0025](https://github.com/mosaikit/mosaikit/blob/main/docs/adr/0025-github-pages-and-maven-namespace.md)).

| Path | Content |
|---|---|
| `/` | the presentation of the project |
| `/catalog/` | the signed catalog of the plugins of the project ([ADR-0021](https://github.com/mosaikit/mosaikit/blob/main/docs/adr/0021-minimal-marketplace.md)): `index.json`, `index.json.sig`, the packages and the public key of the publisher |
| `/marketplace/` | the plugins of the catalog, read from its `index.json` |
| `/schemas/` | the JSON schemas whose `$id` is under this site (plugin manifest, requirement) |
| `/mosaikit/` | the documentation, published by [mosaikit](https://github.com/mosaikit/mosaikit) |

The pages are plain HTML, CSS and JavaScript without a build. `.github/workflows/pages.yml`
publishes them, with the catalog, at every push, every night and by hand.

## Use the catalog in an installation

```properties
mosaikit.marketplace.sources=https://mosaikit.github.io/catalog/
```

and trust its publisher key, published next to the index:

```bash
curl -fsSLo config/trusted-keys/mosaikit.pub.pem https://mosaikit.github.io/catalog/mosaikit.pub.pem
```

The Plugins page of the installation then lists the plugins and installs them.

## Publish a plugin in the catalog

Add its repository to `plugins` in [`catalog/catalog.yml`](catalog/catalog.yml). At the next run
the workflow downloads the packages of its releases, checks that each one is signed by a key of
[`catalog/signing/`](catalog/signing/), writes `index.json` and signs it with
`PackageSigningTool index`.

## Setup of the catalog

Until these are done, the site is published without `/catalog/`.

1. Create the key of the catalog, and keep the private key out of the repository:

   ```bash
   java -cp mosaikit-kernel-api.jar dev.mosaikit.kernel.api.signature.PackageSigningTool keygen ~/keys mosaikit
   cp ~/keys/mosaikit.pub.pem catalog/signing/
   gh secret set CATALOG_SIGNING_KEY --repo mosaikit/mosaikit.github.io < ~/keys/mosaikit.key.pem
   ```

   The plugins must sign their packages with a key whose public part is in `catalog/signing/`; the
   same key works (`signing-key-name: mosaikit` and the secret `PLUGIN_SIGNING_KEY` in each
   plugin).
2. While the plugin repositories are private, give the workflow a fine-grained token with read
   access to their contents: `gh secret set CATALOG_TOKEN --repo mosaikit/mosaikit.github.io`.

## Schemas

Copies of `sdk/java/src/main/resources/dev/mosaikit/kernel/api/plugin/plugin-manifest.schema.json`
and `docs/requirements/requirement.schema.json` of mosaikit: a new version of a schema gets a new
file here.
