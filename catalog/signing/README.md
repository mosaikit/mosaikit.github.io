<!--
SPDX-FileCopyrightText: 2026 Massimo Antonini
SPDX-License-Identifier: MPL-2.0
-->
# Keys

`<name>.pub.pem`: the public keys of the catalog. The one named by `publisher-key` in
`catalog.yml` signs the index; every package must be signed by one of them. Their private keys
never enter the repository.
