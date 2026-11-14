# Chapter 8: Writing Real Papers for NeurIPS, ICML, ICLR and arXiv

This chapter is about the practical side: templates, rules, anonymity, page limits, camera-ready, and getting a clean arXiv submission.

> ⚠️ Page limits, file names and options change **every year**. Always download the current year's style files from the official call for papers (CFP) and read its instructions. The numbers below are typical, not authoritative.

## 8.1 Anatomy of an ML paper

```
Title, authors (anonymous at submission), abstract
1  Introduction          ← problem, gap, idea, contributions list, (teaser figure)
2  Related Work          ← sometimes after experiments
3  Background / Preliminaries   ← notation, problem setup
4  Method                ← equations, algorithm box, architecture figure
5  Experiments           ← setup (\paragraph{Datasets.} ...), main table, ablations, plots
6  Discussion / Limitations
7  Conclusion
   Acknowledgments       ← only in camera-ready
   References
   (NeurIPS: Paper checklist)
Appendix A, B, C ...     ← proofs, extra experiments, hyperparameters, more figures
```

## 8.2 The big three ML templates

| | NeurIPS | ICML | ICLR |
|---|---|---|---|
| Layout | single column | **two column** | single column |
| Base | `article` + `neurips_20XX.sty` | `article` + `icml20XX.sty` | `article` + `iclr20XX_conference.sty` |
| Main text limit (submission, typical) | 9 pages | 8 pages | 9–10 pages |
| Camera-ready | +1 page usually | +1 page | varies |
| References & appendix | don't count | don't count | don't count |
| Citation style | natbib (author-year or numeric allowed) | natbib author-year, `icml20XX.bst` | natbib author-year, `iclr20XX_conference.bst` |
| Anonymous by default? | Yes. `[final]` or `[preprint]` option turns it off | Yes. `[accepted]` turns it off | Yes. `\iclrfinalcopy` turns it off |
| Extra | Mandatory paper checklist at the end | Impact statement section | `math_commands.tex` notation file included |

Other venues you'll see: CVPR/ICCV/ECCV (two-column, `cvpr.sty`, numbered citations), ACL/EMNLP (`acl.sty`, two-column), AAAI (very strict: no `hyperref`, no `\vspace` tricks), IEEE (`IEEEtran`), ACM (`acmart`), JMLR (`jmlr2e`), TMLR (`tmlr.sty`).

### NeurIPS skeleton

```latex
\documentclass{article}

% Submission (anonymous, line numbers):
\usepackage{neurips_2026}
% Preprint for arXiv (non-anonymous, no "submitted to" footer):
% \usepackage[preprint]{neurips_2026}
% Camera-ready:
% \usepackage[final]{neurips_2026}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{hyperref}
\usepackage{url}
\usepackage{booktabs}
\usepackage{amsfonts}
\usepackage{nicefrac}
\usepackage{microtype}
\usepackage{xcolor}
% + your own: amsmath, amsthm, graphicx, subcaption, cleveref, algorithm, ...

\title{Your Title}
\author{%
  Ada Lovelace \\
  Analytical Engine Lab \\
  \texttt{ada@example.org} \\
  \And
  Alan Turing \\
  Bletchley Institute \\
}

\begin{document}
\maketitle
\begin{abstract}
  ...
\end{abstract}

\section{Introduction}
...

\begin{ack}          % NeurIPS-specific: hidden automatically in the anonymous version
  We thank ...
\end{ack}

\bibliographystyle{plainnat}
\bibliography{refs}

\newpage
\appendix
\section{Proofs}
...

\input{checklist}    % NeurIPS checklist (template provides it)
\end{document}
```

### ICML skeleton (two-column, special title block)

```latex
\documentclass{article}
\usepackage{microtype}
\usepackage{graphicx}
\usepackage{subcaption}
\usepackage{booktabs}
\usepackage{hyperref}
\usepackage{icml2026}               % [accepted] for camera-ready
\usepackage{amsmath,amssymb,mathtools,amsthm}
\usepackage[capitalize,noabbrev]{cleveref}

\icmltitlerunning{Short Title for Header}

\begin{document}
\twocolumn[
  \icmltitle{Your Full Title}
  \begin{icmlauthorlist}
    \icmlauthor{Ada Lovelace}{lab}
    \icmlauthor{Alan Turing}{inst}
  \end{icmlauthorlist}
  \icmlaffiliation{lab}{Analytical Engine Lab}
  \icmlaffiliation{inst}{Bletchley Institute}
  \icmlcorrespondingauthor{Ada Lovelace}{ada@example.org}
  \icmlkeywords{Machine Learning, ICML}
  \vskip 0.3in
]
\printAffiliationsAndNotice{}       % footnote with affiliations

\begin{abstract} ... \end{abstract}
\section{Introduction} ...

\bibliography{refs}
\bibliographystyle{icml2026}

\newpage
\appendix
\onecolumn                          % appendix is often single-column
\section{Proofs} ...
\end{document}
```

Two-column habits for ICML: `figure` = one column (`width=\columnwidth`), `figure*`/`table*` = full width. Wide tables are the biggest pain, so plan for them.

### ICLR

```latex
\documentclass{article}
\usepackage{iclr2026_conference,times}
\input{math_commands.tex}
\usepackage{hyperref}
\usepackage{url}
% \iclrfinalcopy    % uncomment for camera-ready
...
\bibliography{iclr2026_conference}
\bibliographystyle{iclr2026_conference}
```

ICLR reviews are public on OpenReview, and the PDF can be revised during the discussion period.

## 8.3 Rules that get papers desk-rejected

1. **Changing the template's layout**: margins, font size, `\linespread`, the `geometry` package, or squeezing caption/section spacing. Program chairs check. Don't load `geometry`, `fullpage`, or `times` (unless the template does).
2. **Going over the page limit.** The main text must end by page N. References and appendix can follow.
3. **Breaking anonymity**:
   - No author names, affiliations or acknowledgments (the template hides `\author` in anonymous mode, but you must handle the rest).
   - Cite your own previous work in the third person: *"\citet{lovelace2024} showed..."*, not *"In our previous work [3]..."*.
   - Code links: use an anonymized repo (e.g. anonymous.4open.science) or put code in the supplementary material.
   - No identifying GitHub URLs, lab names or project pages in the paper or the figures.
   - Check PDF metadata (`pdfinfo paper.pdf`) for the author field. Don't set `pdfauthor` in `\hypersetup` at submission.
   - `%` comments (like `% TODO: ask Ada`) never appear in the PDF, so they're safe at submission. But **anyone can read them in your arXiv source** (§8.6), so clean them before posting there.
4. **Missing required sections**: the NeurIPS checklist, the ICML impact statement. Read the CFP.
5. **Type 3 fonts** (some venues/IEEE PDF eXpress reject them): usually from matplotlib. Fix with `pdf.fonttype: 42` (chapter 5). Check with `pdffonts paper.pdf`.

## 8.4 Space-saving techniques (the legitimate ones)

When you're half a page over:

- Tighten the prose. Delete weak sentences, especially at the ends of paragraphs (single words alone on the last line of a paragraph waste a whole line).
- `\paragraph{Title.}` instead of `\subsection`.
- Lists with `enumitem`'s `[nosep, leftmargin=*]`.
- Put figures side by side (`subcaption`, `minipage`) or use `wrapfigure`.
- Make tables `\small` and reduce `\tabcolsep`. Combine tables.
- Move proofs, extra ablations and hyperparameter details to the appendix, and reference them: *"(proof in \cref{app:proofs})"*.
- Inline short equations instead of displaying them.
- `\vspace{-2mm}` after figures, a classic gray-area hack. Small amounts are common, but heavy use is noticed and some venues (AAAI) forbid it. Use it as a last resort.

## 8.5 Submission vs camera-ready checklist

**Before submitting (anonymous):**

- [ ] Correct year's style file, anonymous mode
- [ ] Page limit respected (main text)
- [ ] No `??` in the PDF (undefined refs/citations). Search the PDF for "??"
- [ ] No overfull boxes sticking into the margins
- [ ] All figures readable when printed; fonts not tiny; colorblind-friendly colors
- [ ] Self-citations in the third person; no identifying links
- [ ] Required checklists/statements included
- [ ] Supplementary/appendix compiled (same PDF or separate, per the rules)
- [ ] TODO/comment macros disabled (`\renewcommand{\todo}[1]{}`)

**Camera-ready:**

- [ ] `[final]` / `[accepted]` / `\iclrfinalcopy`
- [ ] Authors, affiliations, emails, equal-contribution footnotes (`\thanks{}` or the template's mechanism)
- [ ] Acknowledgments and funding
- [ ] De-anonymized code links
- [ ] Reviewer requests addressed, using the extra page
- [ ] References cleaned (published versions, consistent venue names, protected capitals)

## 8.6 Submitting to arXiv

### Why upload the source and not the PDF

arXiv compiles your source with TeX Live, stores the source permanently, and offers it to anyone ("TeX Source" link). It also now generates an HTML version from your source. Submitting only a PDF made from LaTeX is often rejected with a request for the source.

### Steps

1. **Make it compile cleanly with pdfLaTeX.** arXiv uses a specific (possibly year-old) TeX Live version and auto-detects the compiler. Overleaf has an "arXiv-ready" check; compiling with pdfLaTeX locally is the real test.
2. **Use non-anonymous mode** (e.g. `[preprint]` for NeurIPS). Venue policies generally allow arXiv preprints, but check whether the venue has a rule about posting/advertising during review.
3. **Clean the source.** Your comments become public. Use Google's **`arxiv_latex_cleaner`**:

   ```bash
   pip install arxiv-latex-cleaner
   arxiv_latex_cleaner ./my-paper --resize_images --im_size 1500
   # creates ./my-paper_arXiv with comments removed, unused files deleted, images resized
   ```

4. **Include the `.bbl` file.** arXiv uses the `.bbl` you upload, and BibTeX version mismatches are a classic failure. Upload `main.bbl` (same base name as the main `.tex`). In Overleaf: *Logs and output files → Other logs and files → main.bbl* (or *Submit → arXiv*, which packages it for you). Uploading `.bib` alone is risky; uploading the `.bbl` always works for BibTeX. With **BibLaTeX** the `.bbl` must match arXiv's Biber version, which is one more reason to use BibTeX for papers.
5. **Check file names**: arXiv's filesystem is **case-sensitive** (`Figure1.PDF` ≠ `figure1.pdf`). Avoid spaces and special characters. Use relative paths only.
6. **Remove things arXiv can't run**: `minted`/`-shell-escape`, `\write18`, `svg` package, `\usepackage{epstopdf}` conversions at build time. Pre-render them to PDF.
7. **Package it**: zip or tar.gz the folder (main `.tex` at the top level, or specify it). Size limit is about 50 MB; resize huge PNGs.
8. **Upload** at arxiv.org/submit: choose license (CC BY 4.0 is common), primary category (`cs.LG`, `cs.CL`, `cs.CV`, `cs.AI`, `stat.ML`, …), title and abstract (plain text/limited TeX: no `\cite`, no custom macros), and comments like *"Accepted at NeurIPS 2026. Code: https://..."*.
9. **Check the compiled preview carefully.** arXiv shows the PDF it built. Look for `??`, missing figures, broken fonts.
10. **First-time submitters** in a category may need an *endorsement* from an established author.

**Timing:** submissions before the daily cutoff (14:00 US Eastern, Monday–Friday) are announced that evening (~20:00 ET). Updated versions are `v2`, `v3`, …, and old versions stay public forever. **You can't delete a paper**, only withdraw it (the earlier versions stay visible).

### Typical arXiv errors

| Error | Cause |
|---|---|
| Missing figure | Case mismatch, or file not uploaded |
| `File 'xyz.sty' not found` | Custom/venue `.sty` not uploaded (upload it with the source) |
| Citations `[?]` | `.bbl` not uploaded or doesn't match the main file name |
| Fonts/encoding issues | Using XeLaTeX features without telling arXiv; non-UTF-8 files |
| "Processed with errors" but a PDF exists | Look at the log anyway. Often an overfull box or warning arXiv treats strictly |

You can control the build with a `00README.json` (or the older `00README.XXX`) in the archive, specifying the main file and compiler. See arXiv's help pages.

## 8.7 Supplementary code and reproducibility

- Link code with `\url{}` in a footnote on page 1 (camera-ready) or the abstract.
- Add hyperparameter tables in the appendix (`booktabs`, `\small`).
- Generate result tables and numbers from scripts so the paper matches the logs (chapter 5).
- Some people even use macros for numbers: a script writes `\newcommand{\mainacc}{82.9}` to `results.tex`, and the text says "our model reaches \mainacc\%". When the result changes, every mention updates.

## 8.8 Collaboration in practice

- One Overleaf project, or a git repo + Overleaf sync. Agree on **one sentence per line**.
- Each co-author gets a comment macro (`\ada{...}`), plus a switch to hide all comments before submission.
- Split sections into files to reduce edit conflicts.
- Freeze notation in `macros.tex` early.
- Keep a `README` listing which section each person owns and the deadline schedule.
- Use `latexdiff old.tex new.tex > diff.tex` to produce a PDF with changes marked, useful for rebuttals, journal revisions and advisor reviews.

## 8.9 Key takeaways

- Start from the official template for the current year and never modify its layout.
- Anonymity is your job, not just the template's.
- arXiv: compile with pdfLaTeX, clean the comments, upload the `.bbl`, mind case-sensitive file names, check the preview.
