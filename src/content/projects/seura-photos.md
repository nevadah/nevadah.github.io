---
title: Seura Photos
description: A free, open-source photo app for Windows and macOS, in the spirit of Picasa. Edits are kept in small files beside your photos, so originals are never changed.
repo: https://github.com/seura-photos/seura
url: https://seuraphotos.app
tech: [Tauri 2, Rust, React, TypeScript, WGSL, WebGPU, WebGL2, wgpu, Vite, Zustand, Project Fluent, GitHub Actions]
stack: A Rust and React desktop app built on Tauri, with GPU edits written once in WGSL and run through WebGPU for the preview and wgpu for export.
featured: true
order: 1
---

Seura is a Tauri 2 desktop app for Windows and macOS: a Rust core with a React and TypeScript interface, running in the system's own web view (WebView2 on Windows, WebKit on the Mac) rather than a bundled browser.

- The Rust core does all file access: scanning and watching folders, an in-memory index instead of a database, image decoding, color management, and thumbnails. It decodes JPEG and PNG itself, and leaves HEIC to the operating system's own decoders.
- Rendering: each edit is written once as a WGSL GPU shader, and that one program produces both the live preview (WebGPU, or WebGL2 on older Macs) and the exported file (wgpu in Rust), so the two can't disagree.
- Edits are stored non-destructively in small JSON files beside each photo, in an open format with its own spec.
- Interface: React 19, Vite, and Zustand, with text in Project Fluent catalogs so it can be translated.
- Testing and CI: GitHub Actions builds and tests every change on Windows and two macOS versions. That includes data-safety tests checking that your photos are never modified, and a check that the preview matches the export.
