# LaTeX for Research Papers: An Intermediate Course

This course is for someone who already knows Markdown well and wants to get **genuinely comfortable** with LaTeX. That means being able to:

- open any arXiv / NeurIPS / ICML paper and have a good idea how each part of it was written,
- write your own paper from a conference template without fighting the tooling,
- know where LaTeX fits next to Overleaf, local toolchains, Typst, Pandoc, and so on.

Read the chapters in order. Each one builds on the one before. Code blocks marked `latex` are real, compilable snippets. Paste them into Overleaf or a local file and play with them.

## Chapters

| # | File | What you'll learn |
|---|------|-------------------|
| 1 | [01-history-and-ecosystem.md](01-history-and-ecosystem.md) | TeX → LaTeX → today. Why academia (and arXiv) runs on it. Overleaf, Typst, and the other options. |
| 2 | [02-setup-and-workflow.md](02-setup-and-workflow.md) | Overleaf vs local. Installing TeX on macOS. `latexmk`, VS Code, the compile pipeline, reading errors. |
| 3 | [03-document-structure.md](03-document-structure.md) | Preamble, classes, packages, sections, environments, lists, macros, cross-references. "Markdown → LaTeX" mapping. |
| 4 | [04-math.md](04-math.md) | Inline/display math, `align`, matrices, operators, theorems, ML notation, typography habits. |
| 5 | [05-figures-tables-algorithms-code.md](05-figures-tables-algorithms-code.md) | Floats, images, subfigures, professional tables (`booktabs`), pseudocode, code listings. |
| 6 | [06-diagrams-chemistry-science.md](06-diagrams-chemistry-science.md) | TikZ, pgfplots, chemistry (`mhchem`, `chemfig`), units (`siunitx`), physics, circuits, finding any symbol. |
| 7 | [07-bibliography-and-references.md](07-bibliography-and-references.md) | BibTeX vs BibLaTeX, `natbib`, `\citep` vs `\citet`, getting clean `.bib` entries, `hyperref` + `cleveref`. |
| 8 | [08-writing-ml-papers-arxiv-neurips-icml.md](08-writing-ml-papers-arxiv-neurips-icml.md) | Conference style files, anonymization, page limits, appendices, checklists, and submitting to arXiv. |
| 9 | [09-reading-papers-and-cheatsheet.md](09-reading-papers-and-cheatsheet.md) | Working backwards from a paper you see to the LaTeX that made it, common pitfalls, and a one-page cheat sheet. |

There's also a complete, minimal, compilable paper project in [example-paper/](https://github.com/deependujha/learning_latex/tree/main/example-paper) that uses nearly everything from the course. Once you've finished chapter 2, compile it, then break it and fix it.

## How to study this

1. **Read chapters 1–2** to get the lay of the land, and get a working setup (an Overleaf account takes 2 minutes).
2. **Chapters 3–7 are hands-on.** Keep a scratch `.tex` file open and type the examples in yourself. Typing beats copy-pasting.
3. **Chapter 8** is about the real world: conference templates, arXiv. Read it before your first submission.
4. **Chapter 9** is the capstone. Download the LaTeX source of a paper you like from arXiv and read it next to the PDF.

## Mental model in one paragraph

Markdown says *"this is a heading, this is a list"* and leaves the looks to a renderer. LaTeX is the same idea, taken much further: you describe **structure and meaning** (`\section`, `\begin{theorem}`, `\cite{}`, `\label`/`\ref`), and a decades-old, very carefully tuned typesetting engine handles line breaking, hyphenation, math spacing, numbering, cross-references, and bibliography formatting. The price is a programming-language-like syntax and a compile step. The payoff is output that looks professionally typeset and is accepted by every journal, conference, and preprint server in the quantitative sciences.
