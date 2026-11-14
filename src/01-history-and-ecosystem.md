# Chapter 1: History and Ecosystem

## 1.1 A short history

### TeX (1978): Donald Knuth gets annoyed

In 1976 Donald Knuth got the galley proofs for the second edition of *The Art of Computer Programming*, Volume 2. The publisher had moved from hot-metal typesetting to early phototypesetting, and the math looked terrible. Knuth decided to write his own typesetting system. He expected it to take a few months. It took about ten years.

What came out was **TeX** (pronounced "tech". The letters are the Greek τεχ, as in *technē*, "art/craft"). Its key ideas are still what make LaTeX output look good:

- **Boxes and glue.** Every character, word and line is a box. The space between boxes is "glue" that can stretch and shrink.
- **Knuth–Plass line breaking.** Instead of filling lines one at a time like a word processor, TeX looks at the *whole paragraph* and chooses the breaks that minimize a global "badness" score. That's why LaTeX paragraphs look even and avoid "rivers" of white space.
- **A real math typesetting model.** It has classes of symbols (ordinary, operator, binary, relation, punctuation…) with spacing rules between them that were based on centuries of printers' practice.
- **Stability.** Knuth froze TeX. Its version number converges to π (currently 3.141592653), and on his death it is to be fixed at exactly π. A `.tex` file from 1990 usually still compiles today.

TeX itself is a low-level macro language. Writing raw TeX ("plain TeX") is like writing assembly.

### LaTeX (1984): Leslie Lamport adds structure

**Leslie Lamport** (later a Turing Award winner for distributed systems: Paxos, logical clocks) wrote **LaTeX**, a big set of TeX macros that let you describe *logical structure* instead of formatting:

```latex
\section{Introduction}     % not "18pt bold, 2em space above"
\begin{itemize} ... \end{itemize}
\cite{knuth1984}
```

That separation of **content** and **presentation** is the same idea that HTML/CSS and Markdown made popular later. A journal can switch your paper's entire look by swapping the *document class*, and you don't have to change your text.

Milestones:

| Year | Event |
|------|-------|
| 1978 | TeX first released |
| 1984 | LaTeX 2.09 (Lamport) |
| 1985 | BibTeX (Oren Patashnik): bibliography databases |
| 1994 | **LaTeX2ε**, the version everyone uses today (the "LaTeX3" project kept improving it from inside) |
| 1990s–2000s | pdfTeX: produce PDF directly, microtypography |
| 2000s | XeTeX and LuaTeX: Unicode and system fonts (LuaTeX also embeds a Lua scripting engine) |
| 2012 | Overleaf (originally WriteLaTeX) launches. ShareLaTeX launched in 2011 and merged with it in 2017 |
| 2020s | LaTeX kernel gets modern features (`expl3` built in, tagged/accessible PDF work), plus new competitors like **Typst** |

### Pronunciation

"LAH-tek" or "LAY-tek". Never "latex" like the rubber. You'll hear both of the first two at every conference.

## 1.2 Why research runs on LaTeX

1. **Math.** This is still the main reason. Nothing else produces publication-quality equations as reliably, and LaTeX math syntax (`\frac{a}{b}`, `\sum_{i=1}^n`) has become the *lingua franca*. It's what MathJax/KaTeX render on the web, what Markdown math blocks use, what Jupyter, Notion and Obsidian accept, and what ChatGPT-style models print.
2. **Templates from publishers and conferences.** NeurIPS, ICML, ICLR, ACL, CVPR, IEEE, ACM, Springer, Elsevier, APS (physics) and AMS (math) all ship official LaTeX style files. Some (NeurIPS, ICML, ICLR) only provide LaTeX templates.
3. **arXiv.** arXiv strongly prefers LaTeX *source* to PDFs. When you upload `.tex`, arXiv compiles it itself and keeps the source, which anyone can download (see chapter 9; that's a great way to learn). In some fields, a PDF that was clearly made from LaTeX gets rejected and you're asked for the source.
4. **Automatic numbering and cross-referencing.** Equations, figures, tables, sections, theorems and citations are all numbered and linked automatically. Reorder sections and every "Figure 3" updates.
5. **Bibliographies.** Keep one `.bib` file for your whole career. Every paper pulls from it and formats references in whatever style the venue requires.
6. **Plain text.** Works with git, diff, grep, scripts and LLMs. You can review a co-author's change line by line.
7. **Long-term stability and it's free.** Open source, runs everywhere, and decades-old documents still build.
8. **Culture and network effects.** Your advisor uses it, your co-authors use it, the template is in LaTeX. That alone is self-reinforcing.

Where it's weaker: error messages are cryptic, compiles are slow on large documents, precise layout control is painful, and accessibility/HTML output have historically been poor (arXiv now generates HTML versions of papers from LaTeX source, and the LaTeX project is actively working on tagged PDF).

## 1.3 How people actually write papers today

A typical 2020s ML/physics/math research workflow:

- **Overleaf** for collaborative papers (the default in most labs), *or* a **local editor + git** for people who prefer their own tools, often syncing with Overleaf through its Git integration or GitHub sync.
- A **conference template** as the starting point. You never start from a blank file.
- A **shared `.bib` file**, with entries exported from Google Scholar, DBLP, Semantic Scholar, Zotero or Paperpile.
- **Figures** made in matplotlib/seaborn (exported as PDF), TikZ, draw.io, Figma, Keynote or Inkscape, and included as PDF/PNG.
- **Macros** for notation (`\newcommand{\loss}{\mathcal{L}}`) so it stays consistent.
- **Comment macros** for collaboration (`\todo{}`, or colored `\alice{...}`, `\bob{...}` notes).
- **LLM assistants** for drafting tables, fixing errors, converting equations from screenshots, and so on. This works well because LaTeX is plain text and the models have seen a huge amount of it.

## 1.4 Why Overleaf is so popular

Overleaf is a browser-based LaTeX editor and compiler. It's popular because:

- **Zero install.** A full TeX Live distribution (several GB) lives on their servers. Students don't need to fight installers.
- **Real-time collaboration**, like Google Docs: several cursors, track changes, comments, history.
- **Template gallery.** Thousands of templates, including official ones for most conferences and journals. Many conferences link straight to Overleaf.
- **Rich text / visual editor** for co-authors who are scared of the syntax.
- **Error panel** that turns TeX log noise into readable messages with links to docs.
- **Integrations**: Git, GitHub, Dropbox, Zotero/Mendeley (premium), and direct submission to some journals.
- **Institutional licenses.** Many universities pay for premium accounts, which removes compile-timeout limits and adds more collaborators and full history.
- **Network effect.** Once your advisor shares an Overleaf link, you're on Overleaf.

Downsides: needs internet (there's no real offline mode), the free tier has collaborator and compile-time limits, big projects can be slow to compile, and you're editing in a browser rather than your own editor. Overleaf's core is open source (Overleaf Community Edition) and can be self-hosted.

Some alternatives in the same space: **Prism** (OpenAI's LaTeX workspace with AI built in), Papeeria, CoCalc, and **Typst's web app** (for Typst rather than LaTeX).

## 1.5 Running LaTeX locally

You install a **TeX distribution**: the engines (pdfTeX, XeTeX, LuaTeX), the LaTeX format, thousands of packages, and fonts.

| Distribution | Platform | Notes |
|---|---|---|
| **TeX Live** | Linux, macOS, Windows | The reference distribution, updated yearly. Overleaf runs TeX Live. |
| **MacTeX** | macOS | TeX Live plus Mac GUI apps (TeXShop, BibDesk). About 5–6 GB. |
| **BasicTeX** | macOS | A small (~100 MB) MacTeX subset. You add packages with `tlmgr`. |
| **MiKTeX** | Windows (also others) | Installs missing packages on the fly. |
| **TinyTeX** | All | Small, R/Quarto-friendly TeX Live. |
| **Tectonic** | All | A modern, self-contained engine (based on XeTeX) that downloads what it needs and reruns automatically. |

Then you pick an **editor**: VS Code + LaTeX Workshop (very popular), TeXstudio, TeXShop, Vim + VimTeX, Emacs + AUCTeX, Zed, Sublime + LaTeXTools. Chapter 2 walks through a concrete setup.

## 1.6 The engines: pdfLaTeX vs XeLaTeX vs LuaLaTeX

You'll see these names in Overleaf's settings and in templates.

| Engine | Input | Fonts | When to use |
|---|---|---|---|
| **pdfLaTeX** | 8-bit (UTF-8 is fine for Latin scripts) | TeX fonts | Default. **What arXiv and most conference templates expect.** Fastest. |
| **XeLaTeX** | Full Unicode | Any system font (OTF/TTF) via `fontspec` | Non-Latin scripts (Chinese, Arabic, Devanagari), custom fonts |
| **LuaLaTeX** | Full Unicode | System fonts, and Lua scripting | Modern successor. Good for complex documents. Slower. |

**Rule of thumb for ML/physics papers: use pdfLaTeX** unless the template says otherwise. If you need Hindi, Chinese and so on in your paper, use XeLaTeX or LuaLaTeX.

## 1.7 Typst: the new kid

**Typst** (2023, from two Berlin students, written in Rust) is a modern typesetting system designed as a successor to LaTeX:

```typst
#set page(paper: "us-letter")
#set heading(numbering: "1.")

= Introduction
We minimize the loss $cal(L)(theta) = sum_(i=1)^n ell(f_theta (x_i), y_i)$.

$ nabla_theta cal(L) = 1/n sum_i nabla_theta ell_i $ <eq:grad>

See @eq:grad and @smith2020.
#bibliography("refs.bib")
```

**Strengths**

- Markdown-like syntax (`= Heading`, `*bold*`, `_italic_`, `- list`). You'll feel at home.
- **Instant, incremental compilation** (milliseconds vs seconds), so live preview is real.
- **Readable, actual error messages.**
- A proper scripting language built in (variables, functions, loops) instead of TeX's macro expansion.
- One small binary. No multi-GB distribution.
- Reads `.bib` files, has packages ("Typst Universe"), and has a collaborative web app.

**Weaknesses (as of 2026)**

- **Conferences and arXiv still want LaTeX.** arXiv does not accept Typst source. You can upload the PDF, but you lose the "source on arXiv" benefits. NeurIPS/ICML/ICLR official templates are LaTeX. Community Typst templates exist for some venues but aren't official.
- Smaller ecosystem. There's nothing as mature as TikZ, `chemfig`, or the long tail of 6000+ CTAN packages.
- Co-authors probably don't know it.
- Different math syntax (`frac(a, b)` or `a/b`, `sum_(i=1)^n`), so your LaTeX-math muscle memory transfers only partially.

**Verdict:** Learn LaTeX first, because it's the requirement for publishing. Typst is great for personal notes, CVs, homework, theses (if your university allows it), and internal reports. Knowing LaTeX makes Typst trivial to pick up later; the reverse isn't true.

## 1.8 Other tools you'll hear about

- **Pandoc**: universal document converter. It can turn Markdown (including LaTeX math) into LaTeX/PDF. Good for drafts. Papers usually end up as pure LaTeX anyway.
- **Quarto / R Markdown**: Markdown + executable code (Python/R) → PDF via LaTeX. Popular in statistics.
- **LyX**: a WYSIWYM GUI on top of LaTeX.
- **ConTeXt**: another TeX-based macro system, focused on design control. Niche.
- **MathJax / KaTeX**: render LaTeX *math* in browsers (Markdown math on GitHub, blogs, Jupyter). Math only, no documents.
- **Beamer**: the LaTeX class for slides. You'll see Beamer talks at every conference.
- **CTAN** (ctan.org): the Comprehensive TeX Archive Network, where every package lives together with its documentation. `texdoc <package>` opens the local docs.
- **TeX StackExchange** (tex.stackexchange.com): the best Q&A site. Almost every problem has already been answered there.

## 1.9 Key takeaways

- TeX = engine (Knuth). LaTeX = structure layer on top (Lamport). You write LaTeX.
- Research uses LaTeX because of math quality, templates, arXiv, automatic numbering/citations, and network effects.
- Overleaf = LaTeX in the browser + collaboration. Local = TeX Live/MacTeX + editor + `latexmk`.
- Use **pdfLaTeX** for papers unless told otherwise.
- Typst is the promising modern alternative, but for conference/arXiv papers, LaTeX is still what you need.
