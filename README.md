# tldrawc: tldraw in Obsidian, custom build

> **tldrawc** is a fork of the official [tldraw plugin for Obsidian](https://github.com/tldraw/obsidian-plugin). The "c" stands for *custom*. It runs **side by side** with the official plugin and adds an **equation (LaTeX) shape**. The sections [What's different in tldrawc](#whats-different-in-tldrawc), [Equations](#equations) and [Installing tldrawc](#installing-tldrawc) describe the changes. The rest is the upstream documentation and applies to tldrawc as well, except where it names the official plugin.

https://github.com/holxsam/holxsam/assets/41220650/1786cc75-3a15-431f-b13a-e8f51cfde952

This Obsidian plugin allows users to use [tldraw](https://tldraw.com), which is a tiny little drawing app, inside of Obsidian. Users can draw, plan, and use all of tldraw's tools to augment their Obsidian experience. The data for each drawing is stored as a regular markdown file similar to the Excalidraw plugin meaning users will always have access to their data in plain markdown. Users have the option to switch between the tldraw view or the markdown view in case they wish to include backlinks, tags, or any other elements to facilitate linking their drawings with their existing knowledge base.

TIP: You can toggle between the view modes, using the command palette, keyboard shortcuts, status bar toggle at the bottom right, file menu, and context menu. See the plugin settings tab for customization options as well.

## Plugin Usage Guides

- [Custom icons and fonts](https://github.com/tldraw/obsidian-plugin/issues/58#issue-2571070259)
- [Customizing embeds](https://github.com/tldraw/obsidian-plugin/issues/59)

## What's different in tldrawc

| | Official tldraw plugin | tldrawc |
|---|---|---|
| Plugin id | `tldraw` | `tldrawc` |
| Markdown drawings | frontmatter `tldraw-file: true` | frontmatter `tldrawc-file: true` |
| Data block | `!!!_START_OF_TLDRAW_DATA__...` | `!!!_START_OF_TLDRAWC_DATA__...` |
| Raw file extension | `.tldr` | `.tldrc` (`.tldr` files can still be imported) |
| Default folder and tag | `tldraw` | `tldrawc` |
| Equations | no | yes |

Because the identifiers differ, the two plugins never claim the same files:

- A drawing created by the official plugin is opened by the official plugin only, and a tldrawc drawing by tldrawc only.
- You can keep both plugins enabled at the same time.
- A tldrawc drawing that contains an equation cannot be read by the official plugin.
- To move an existing drawing to tldrawc, change `tldraw-file` to `tldrawc-file` in its frontmatter and `TLDRAW` to `TLDRAWC` in the two data delimiter lines.

## Equations

tldrawc adds an equation shape that renders raw LaTeX with [KaTeX](https://katex.org).

1. Press `M` or use the equation button in the toolbar, then click the canvas.
2. Type LaTeX in the box that appears below the shape, for example `\frac{x^2}{2}`.
3. Press `Enter` (or `Esc`) to finish. Use `Shift+Enter` for a new line.
4. Double-click an equation to edit it again.

Invalid LaTeX is shown as an error in the shape instead of breaking the drawing.

Equations also render in embeds (`![[drawing]]`) and in image exports.

## Installing tldrawc

tldrawc is not on the community plugins list. Install it manually:

1. Build it (see [Development](#development)) or take `main.js`, `manifest.json` and `styles.css` from a build.
2. Put the three files in `<your vault>/.obsidian/plugins/tldrawc/`. The folder name must be `tldrawc`.
3. In Obsidian, go to `Settings` > `Community plugins`, reload the list and enable **tldrawc**.

## Installing the official plugin

tldraw in Obsidian is now available on the official community plugins list! 

- [Open the tldraw plugin page in Obsidian](obsidian://show-plugin?id=tldraw)
- You can also find it by going into `Settings` > `Community plugins` > `Browse` > `Type 'tldraw'` > `Install`.

## Network use

The plugin makes network requests in these cases:

- **tldraw CDN.** By default, the tldraw editor loads its fonts, icons and translations from `https://cdn.tldraw.com` when a drawing is opened. You can avoid this by downloading the assets in the plugin's settings. After that, the editor uses the local copies.
- **Optional asset downloads.** When you use the download buttons in the plugin's settings, the plugin fetches tldraw's font and icon files from `https://cdn.jsdelivr.net` (the `@tldraw/assets` npm package). Nothing is downloaded unless you ask for it.
- **tldraw license tracking.** The tldraw library requests a small image from `https://cdn.tldraw.com` to record that the library, under the plugin's license, was used. The request includes the tldraw version, the license type and ID, and Obsidian's app address (`app://obsidian.md/index.html`). It does not include your vault name, file names or note contents.

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to build and test the plugin.

```bash
npm install
npm run build      # outputs main.js, manifest.json and styles.css to dist/production
```

While developing, symlink `dist/production` into a **test vault** (not your main one) as `.obsidian/plugins/tldrawc`, then reload Obsidian after each build.

The tldrawc changes are two independent commits on top of upstream, so you can take either one on its own:

- custom format and identity (rename, file format, icon)
- the equation shape (`src/tldraw/math/`)

## Contributions

This plugin was created by [Sam Alhaqab](https://github.com/szamsolo), the original author whose initial contributions kickstarted the beginning of using tldraw within Obsidian. So a huge shoutout to him!

-   If you have a feature idea or want to report a bug in tldrawc, please open an [issue on this fork](https://github.com/almaas-izdihar/tldrawc-obsidian/issues). For the official plugin, use the [upstream issues](https://github.com/tldraw/obsidian-plugin/issues).
-   See [CONTRIBUTING.md](./CONTRIBUTING.md) for how the plugin is built, tested and released.

## License and Attribution

All [tldraw's](https://github.com/tldraw/tldraw) code is theirs. Also shout out to the [Excalidraw plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin) for inspiration on how I should structure this tldraw plugin.
