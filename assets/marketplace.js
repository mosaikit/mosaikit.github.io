// SPDX-FileCopyrightText: 2026 Massimo Antonini
// SPDX-License-Identifier: MPL-2.0
// Lists the plugins of the catalog (index.json, ADR-0021 of mosaikit/mosaikit). The page only shows
// what the index says: installations verify the signature of the index and of every package.
const CATALOG = 'https://mosaikit.github.io/catalog/';
const list = document.getElementById('plugins');
const filter = document.getElementById('filter');

const element = (tag, properties = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), properties);
  node.append(...children);
  return node;
};
const size = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** The newest version of each plugin, with the number of its versions in the catalog. */
function latest(plugins) {
  const byId = Map.groupBy(plugins, (plugin) => plugin.id);
  const compare = (a, b) => a.version.localeCompare(b.version, undefined, { numeric: true });
  return [...byId.values()]
    .map((versions) => ({ ...versions.sort(compare).at(-1), versions: versions.length }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function card(plugin) {
  const item = element(
    'article',
    { className: 'card plugin' },
    element('h3', {}, `${plugin.name} `, element('span', { className: 'badge' }, plugin.version)),
    element('div', { className: 'id' }, plugin.id),
    element(
      'div',
      { className: 'meta' },
      size(plugin.size) + (plugin.versions > 1 ? ` · ${plugin.versions} versions` : ''),
    ),
    element(
      'div',
      { className: 'actions' },
      element('a', { href: CATALOG + plugin.file }, 'Download'),
      element('a', { href: `${CATALOG + plugin.file}.sha256` }, 'SHA-256'),
    ),
  );
  item.dataset.search = `${plugin.name} ${plugin.id}`.toLowerCase();
  return item;
}

try {
  const response = await fetch(`${CATALOG}index.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const plugins = latest((await response.json()).plugins ?? []);
  list.replaceChildren(
    ...(plugins.length > 0
      ? plugins.map(card)
      : [element('p', { className: 'notice' }, 'No plugins published yet: the first ones are coming soon.')]),
  );
} catch (error) {
  list.replaceChildren(
    element('p', { className: 'notice' }, `The catalog cannot be read right now (${error.message}).`),
  );
}

filter.addEventListener('input', () => {
  const text = filter.value.trim().toLowerCase();
  for (const item of list.querySelectorAll('.plugin')) {
    item.hidden = text !== '' && !item.dataset.search.includes(text);
  }
});
