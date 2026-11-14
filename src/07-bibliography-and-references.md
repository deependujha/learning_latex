# Chapter 7: Bibliographies, Citations and Links

## 7.1 The model

1. You keep references in a **`.bib` file**: a database of entries, each with a **citation key**.
2. In the text you write `\cite{key}`.
3. A tool (**BibTeX** or **Biber**) pulls out only the cited entries, formats them in the required **style**, and writes `main.bbl`.
4. LaTeX prints the bibliography where you write `\bibliography{refs}` (or `\printbibliography`).

You never format a reference by hand. The venue's style decides "Smith et al. (2020)" vs "[12]", the order, abbreviations, and so on.

## 7.2 A `.bib` file

```bibtex
@inproceedings{vaswani2017attention,
  title     = {Attention Is All You Need},
  author    = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob
               and Jones, Llion and Gomez, Aidan N. and Kaiser, {\L}ukasz and Polosukhin, Illia},
  booktitle = {Advances in Neural Information Processing Systems},
  volume    = {30},
  year      = {2017}
}

@article{lecun2015deep,
  title   = {Deep Learning},
  author  = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey},
  journal = {Nature},
  volume  = {521},
  number  = {7553},
  pages   = {436--444},
  year    = {2015},
  doi     = {10.1038/nature14539}
}

@misc{touvron2023llama,
  title         = {{LLaMA}: Open and Efficient Foundation Language Models},
  author        = {Touvron, Hugo and others},
  year          = {2023},
  eprint        = {2302.13971},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CL}
}

@book{goodfellow2016deep,
  title     = {Deep Learning},
  author    = {Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron},
  publisher = {MIT Press},
  year      = {2016},
  url       = {https://www.deeplearningbook.org}
}
```

**Entry types you'll use:** `@inproceedings` (conference papers, which most ML papers are), `@article` (journals), `@misc` (arXiv preprints, websites, software), `@book`, `@phdthesis`, `@techreport`, `@incollection`.

**Gotchas:**

- **Authors:** separate with `and` (never commas between people). `Last, First` is safest. `and others` → "et al.".
- **Capitalization:** many styles lowercase titles ("Bert: pre-training..."). Protect capitals with braces: `{BERT}`, `{ImageNet}`, `{G}aussian`.
- **Special characters:** `{\"o}` for ö, `{\L}` for Ł, `{\'e}` for é. UTF-8 works with Biber; with BibTeX it mostly works but braces are safest.
- **Keys:** pick a scheme like `authorYEARfirstword` (`vaswani2017attention`, which is Google Scholar's scheme). Keys are case-sensitive.
- **Duplicates:** the same paper under two keys gives a duplicate reference. Keep one `.bib` per paper, or a carefully curated master file.

## 7.3 Getting good entries (don't type them)

| Source | Notes |
|---|---|
| **Google Scholar** | "Cite" → BibTeX. Fast but often incomplete or wrong (arXiv version cited instead of the published one, missing venues). |
| **DBLP** (dblp.org) | **Best for CS/ML.** Clean, consistent, correct venue. |
| **Semantic Scholar**, **ACL Anthology** | Good for ML/NLP |
| **arXiv** | "Export BibTeX citation" on each abstract page |
| **doi2bib.org**, or `curl -LH "Accept: application/x-bibtex" https://doi.org/<DOI>` | From a DOI |
| **Zotero** (+ Better BibTeX plugin), **Paperpile**, **Mendeley**, **JabRef** | Reference managers that export/sync `.bib`; Zotero+BBT can auto-export a live `.bib` |

**Cite the published version** when a paper appeared at a venue (NeurIPS, ICLR, …), not the arXiv preprint. Reviewers notice. Tools like `rebiber` (GitHub) automatically replace arXiv entries with their published versions.

## 7.4 Two systems: BibTeX + natbib vs BibLaTeX + Biber

| | **BibTeX (+ natbib)** | **BibLaTeX + Biber** |
|---|---|---|
| Age | 1985, classic | Modern (2006+) |
| Styles | `.bst` files | Configured with LaTeX options |
| Unicode | Limited | Full |
| Customization | Hard (`.bst` is a stack language) | Easy |
| **Conference templates** | **NeurIPS, ICML, ICLR, ACL, CVPR, IEEE, arXiv-friendly** | Rare |
| arXiv | ✅ | ✅ only if you upload a `.bbl` that matches arXiv's Biber version, so fragile |

**For ML papers: use BibTeX + natbib, because that's what the templates use.** Use BibLaTeX for theses, books, or when you control the format.

### BibTeX + natbib setup

```latex
\usepackage[numbers]{natbib}     % or [authoryear] (NeurIPS/ICML templates set this up)
...
\bibliographystyle{plainnat}     % style: plainnat, abbrvnat, unsrtnat, or the venue's .bst
\bibliography{refs}              % refs.bib (no extension); place where the list should appear
```

Common `.bst` styles: `plain` (sorted, numeric), `unsrt` (order of citation), `alpha` ([Knu84]), `abbrv`; the `*nat` versions work with natbib. Venues ship their own (`icml2026.bst`, `iclr2026_conference.bst`, `IEEEtran.bst`, `ACM-Reference-Format.bst`).

### BibLaTeX setup (for reference)

```latex
\usepackage[backend=biber, style=authoryear, maxcitenames=2]{biblatex}
\addbibresource{refs.bib}        % WITH extension
...
\printbibliography
```

Styles: `numeric`, `authoryear`, `alphabetic`, `ieee`, `apa`, `nature`, `chem-acs`, `phys`, and more. Commands: `\textcite{}` ≈ `\citet{}`, `\parencite{}` ≈ `\citep{}`, `\autocite{}`.

## 7.5 Citation commands (natbib)

This is the part you'll type a thousand times.

| Command | Author-year output | Numeric output | Use when |
|---|---|---|---|
| `\citet{key}` | Vaswani et al. (2017) | Vaswani et al. [12] | Author is part of the sentence |
| `\citep{key}` | (Vaswani et al., 2017) | [12] | Parenthetical |
| `\citep[see][p.~3]{key}` | (see Vaswani et al., 2017, p. 3) | | Pre/post notes |
| `\citep{a,b,c}` | (A, 2019; B, 2020; C, 2021) | [3, 7, 9] | Several at once |
| `\citeauthor{key}` | Vaswani et al. | | |
| `\citeyear{key}` | 2017 | | |
| `\citealp{key}` | Vaswani et al., 2017 | | No parentheses (inside your own parens) |
| `\cite{key}` | ≈ `\citet` in author-year mode | [12] | Generic |
| `\nocite{key}` / `\nocite{*}` | (nothing) | | Put in bibliography without citing / include all entries |

**Style rule:** a citation is not a noun. Write *"Transformers \citep{vaswani2017attention} use attention"* or *"\citet{vaswani2017attention} introduced..."*, and never *"In \citep{x}, they show..."*.

Use `~` to avoid a line break before numeric citations: `Transformers~\cite{x}`.

## 7.6 `hyperref`: clickable everything

```latex
\usepackage{hyperref}
\hypersetup{
  colorlinks=true,
  linkcolor=blue,      % internal links (sections, equations, figures)
  citecolor=blue,      % citations
  urlcolor=magenta,    % URLs
  pdftitle={My Paper},
  pdfauthor={Ada Lovelace},
}
```

- Makes `\ref`, `\cite`, footnotes and table-of-contents entries clickable, and adds PDF bookmarks.
- `\url{https://github.com/me/repo}` (breaks nicely across lines), `\href{https://...}{text}`.
- **Load `hyperref` late**, after most other packages. Exceptions that go *after* it: `cleveref`, `algorithm`-related fixes, and a few others.
- Some templates already load it (ICML does). Don't load it again with conflicting options. Use `\hypersetup` instead.
- For anonymous submissions, check that `pdfauthor` metadata doesn't contain your name.

## 7.7 `cleveref`: the last piece

```latex
\usepackage[capitalize,noabbrev]{cleveref}   % after hyperref

\cref{fig:arch}            % Figure 1
\cref{tab:main}            % Table 2
\cref{eq:loss}             % Equation (3)   (Eq. (3) without noabbrev)
\cref{sec:method}          % Section 3
\cref{app:proofs}          % Appendix A
\cref{thm:main,lem:aux}    % Theorem 1 and Lemma 2
\Cref{...}                 % capitalized at the start of a sentence

% customize names
\crefname{assumption}{Assumption}{Assumptions}
\crefname{algorithm}{Algorithm}{Algorithms}
\crefname{equation}{Eq.}{Eqs.}        % if you prefer "Eq. (3)"
```

The `[capitalize]` option makes `\cref` always capitalized, which is common style in ML papers.

## 7.8 A complete minimal example

```latex
\documentclass{article}
\usepackage[numbers]{natbib}
\usepackage{hyperref}
\usepackage[capitalize,noabbrev]{cleveref}
\begin{document}

\section{Introduction}\label{sec:intro}
\citet{vaswani2017attention} proposed the Transformer.
Deep learning has many applications~\citep{lecun2015deep,goodfellow2016deep}.
We revisit this in \cref{sec:intro}.

\bibliographystyle{plainnat}
\bibliography{refs}
\end{document}
```

Build: `latexmk -pdf main.tex` (or Overleaf, which runs BibTeX automatically).

## 7.9 Troubleshooting citations

| Symptom | Fix |
|---|---|
| `[?]` or **(?)** in the PDF | Key typo, entry missing from `.bib`, or BibTeX hasn't run. Check `main.blg`. |
| "I found no \bibdata command" | `\bibliography{...}` missing |
| "I couldn't open database file refs.bib" | Wrong file name/path. `\bibliography{refs}` without `.bib` |
| BibTeX error on one entry | Missing comma, unbalanced braces, or `@` typo in `.bib`. `.blg` shows the line |
| Author-year citation shows numbers (or vice versa) | natbib option or `.bst` style mismatch |
| Bibliography is in the wrong place | It goes where `\bibliography{}` is written |
| "Bibliography not compatible with author-year citations" | Using `\citet` with a non-natbib `.bst` like `plain`. Use `plainnat` |
| Stale results | Delete `.aux`/`.bbl` (`latexmk -C`) and rebuild |

## 7.10 Key takeaways

- One `.bib` file, entries from DBLP/Scholar/Zotero, published versions preferred, `{Braces}` for capitals.
- ML templates: BibTeX + natbib + the venue's `.bst`. Know `\citet` vs `\citep`.
- `hyperref` late, `cleveref` after it, `\cref` everywhere.
