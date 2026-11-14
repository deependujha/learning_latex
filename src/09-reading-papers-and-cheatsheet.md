# Chapter 9: Reading Papers Like Source Code, and a Cheat Sheet

The fastest way to get from intermediate to fluent: **read the LaTeX source of papers you admire, next to their PDFs.** arXiv makes this possible for most papers.

## 9.1 Getting the source of any arXiv paper

1. Open the abstract page, e.g. `https://arxiv.org/abs/1706.03762`.
2. Under *Access Paper*, click **"TeX Source"** (or *Other formats → Download source*). The direct URL pattern is `https://arxiv.org/src/1706.03762` (older pattern: `/e-print/`).
3. You get a gzipped tarball (sometimes a single gzipped `.tex`):

```bash
mkdir attention && cd attention
curl -L -o src.tar.gz https://arxiv.org/src/1706.03762
tar -xzf src.tar.gz || (gunzip -c src.tar.gz > main.tex)
ls
```

4. Find the main file: `grep -l '\\documentclass' *.tex`.
5. Compile it locally (`latexmk -pdf main.tex`) or upload the folder to Overleaf as a zip. Then change things and watch what happens.

Authors' comments are often still in there. It's a fascinating look at how papers get written, and sometimes at what got cut.

## 9.2 Working backwards: "how did they make that?"

| You see in the PDF | It's probably |
|---|---|
| Bold run-in heading: "**Datasets.** We use..." | `\paragraph{Datasets.}` |
| Equation numbers like (3) on the right | `equation` / `align`; referenced via `\eqref` or `\cref` |
| "(Vaswani et al., 2017)" | `\citep{}` with natbib author-year |
| "Vaswani et al. (2017) show" | `\citet{}` |
| "[12]" or "[3, 7–9]" | numeric natbib/`cite` package, `\cite{}` |
| Blue/colored clickable links | `hyperref` with `colorlinks` |
| "Figure 3" auto-linked | `\cref{fig:...}` or `Figure~\ref{}` |
| Table with three thick/thin horizontal rules, no vertical lines | `booktabs` |
| Table entries "82.9±0.3" small std | `$82.9_{\pm0.3}$` or `{\scriptsize$\pm$0.3}` |
| Gray-shaded rows in a table | `\rowcolor{gray!10}` (`xcolor` with `table` option) |
| ✓ / ✗ in a comparison table | `\cmark`/`\xmark` via `pifont` |
| Numbered "Algorithm 1" box with line numbers | `algorithm` + `algpseudocode` (`\State`, `\For`) or `algorithm2e` (`\;`, `\KwIn`) |
| Colored rounded box with a title ("Takeaway", "Finding 1") | `tcolorbox` (or `mdframed`) |
| Figure with (a) (b) sub-panels, each with its own caption | `subcaption` |
| Figure that text wraps around | `wrapfig` |
| Full-width figure in a two-column paper | `figure*` |
| Big figure above the abstract (CVPR "teaser") | `\twocolumn[{...}]` trick + `\captionof` |
| "Theorem 3.1 (Convergence)." italic body, ∎ at the end of the proof | `amsthm` `\newtheorem` + `proof` |
| Same theorem repeated in the appendix with the same number | `thm-restate`'s `restatable` |
| Bold vectors **x**, calligraphic 𝓛, blackboard ℝ | `\bm`/`\mathbf`, `\mathcal`, `\mathbb` |
| "arg min" with θ underneath | `\DeclareMathOperator*{\argmin}{arg\,min}` |
| Tiny line numbers in the left margin | the submission/anonymous mode of the template (or `lineno`) |
| GitHub logo next to a link | `fontawesome5`'s `\faGithub` |
| Small-caps method names (`MᴇᴛʜᴏᴅNᴀᴍᴇ`) | `\textsc{}` in a macro |
| Hyperlinked "Appendix B" | `\appendix` then `\section{}`, referenced with `\cref` |
| Neat diagram with LaTeX-font labels | TikZ (look for `\begin{tikzpicture}` or `figures/*.tex`) |
| Plot with paper-matching fonts | pgfplots, or matplotlib with `text.usetex` |
| "Contributions" bullet list with no extra spacing | `itemize` + `enumitem` `[nosep]` |
| Colored inline author comments in drafts | custom macros like `\newcommand{\ada}[1]{\textcolor{blue}{#1}}` |

## 9.3 A reading exercise

Pick three papers from arXiv's `cs.LG` listing:

1. A **theory** paper: look at their `\newtheorem` setup, macros, how proofs are split into lemmas, `restatable` usage.
2. An **empirical / benchmark** paper: look at the table code, how they generate tables, `\resizebox` usage, colors.
3. A **systems / architecture** paper: look at the TikZ or PDF figures, `algorithm` boxes, `wrapfigure` layout.

For each paper, write down:

- Preamble packages you haven't seen → look them up with `texdoc <pkg>`.
- Their macro file: steal good ideas for your own `macros.tex`.
- One trick you didn't know.

Then **rewrite one page** of each paper from the PDF alone, without looking at the source, and compare.

## 9.4 Common pitfalls (and fixes)

| Pitfall | Fix |
|---|---|
| `$$...$$` | `\[...\]` or `equation*` |
| `x_{max}` italic | `x_{\max}` (operator) or `x_{\text{max}}` |
| `"quotes"` | ` ``quotes'' ` or `\enquote{}` |
| `Figure \ref{x}` broken across lines | `Figure~\ref{x}` or `\cref{x}` |
| `\label` before `\caption` | label after caption |
| `e.g. this` (wide space) | `e.g.\ this` or `e.g., this` |
| `\\` for paragraph breaks | blank line |
| `\begin{center}` around figure content | `\centering` |
| Raster plots (blurry PNG) | vector PDF |
| Manual numbering "Eq. 3" | `\label` + `\cref` |
| `\bf`, `\it` (old) | `\textbf{}`, `\emph{}` |
| `log(x)` | `\log(x)` |
| `p(y|x)` | `p(y \mid x)` |
| Overfull boxes from URLs | `\url{}` (with `hyperref`/`url`), `xurl` package for very long URLs |
| Floats drifting to the end | `[t]`, smaller floats, place source earlier, `\clearpage` |
| Loading `subfig` and `subcaption` together | Only `subcaption` |
| `algorithm2e` + `algorithmic` together | Pick one |
| Hand-typed table numbers | Generate from code |
| Editing the template's spacing/margins | Don't. Desk-reject risk |

## 9.5 Typst equivalents (for when you try it)

| LaTeX | Typst |
|---|---|
| `\section{Intro}` | `= Intro` |
| `\textbf{b}` `\emph{i}` | `*b*` `_i_` |
| `$\frac{a}{b}$` | `$a/b$` or `$frac(a, b)$` |
| `$\sum_{i=1}^n x_i$` | `$sum_(i=1)^n x_i$` |
| `$\mathbb{R}$`, `$\mathcal{L}$` | `$RR$`, `$cal(L)$` |
| `\label{eq:a}` + `\cref{eq:a}` | `<eq:a>` + `@eq:a` |
| `\citep{key}` | `@key` or `#cite(<key>)` |
| `\newcommand{\R}{\mathbb{R}}` | `#let R = $RR$` |
| `\begin{figure}...\end{figure}` | `#figure(image("a.pdf"), caption: [...])` |

## 9.6 One-page cheat sheet

```latex
%================= PREAMBLE =================
\documentclass[11pt]{article}            % or the venue template
\usepackage[T1]{fontenc}
\usepackage{microtype}
\usepackage{amsmath,amssymb,amsthm,mathtools,bm}
\usepackage{graphicx}                    \graphicspath{{figures/}}
\usepackage{subcaption,booktabs,multirow,siunitx}
\usepackage{xcolor}
\usepackage{enumitem} \setlist{nosep}    % compact lists everywhere
\usepackage{algorithm,algpseudocode}
\usepackage[numbers]{natbib}             % templates usually set this
\usepackage{hyperref}                    % late
\usepackage[capitalize,noabbrev]{cleveref} % after hyperref
\input{macros}

%================= STRUCTURE =================
\title{} \author{} \maketitle
\begin{abstract} \end{abstract}
\section{} \subsection{} \paragraph{Bold.} \section*{No number}
\appendix
\input{sections/intro}

%================= TEXT =================
\textbf{} \emph{} \texttt{} \textsc{} \url{} \href{url}{text}
\footnote{}   ~ (nbsp)   -- (range)   --- (dash)   ``quotes''
\% \$ \& \# \_ \{ \}
\begin{itemize} \item \end{itemize}     \begin{enumerate} \item \end{enumerate}

%================= MATH =================
$inline$   \[ display \]   \begin{equation} \label{eq:x} \end{equation}
\begin{align} a &= b \\ &= c \nonumber \end{align}
\frac{}{} \sqrt{} \sum_{i}^{n} \int_a^b \prod \lim_{x\to0}
\mathbb{R} \mathcal{L} \bm{x} \mathbf{W} \mathrm{d}x \text{if}
\left( \right)  \bigl( \bigr)  \mid  \top  \odot  \coloneqq
\begin{bmatrix} a & b \\ c & d \end{bmatrix}   \begin{cases} \end{cases}
\DeclareMathOperator*{\argmin}{arg\,min}
\begin{theorem} \end{theorem}  \begin{proof} \end{proof}

%================= FLOATS =================
\begin{figure}[t] \centering \includegraphics[width=\linewidth]{f}
  \caption{} \label{fig:f} \end{figure}
\begin{table}[t] \centering \caption{} \label{tab:t}
  \begin{tabular}{@{}lcc@{}} \toprule A & B & C \\ \midrule ... \\ \bottomrule \end{tabular}
\end{table}

%================= REFERENCES =================
\cref{fig:f} \Cref{eq:x} \eqref{eq:x} \citet{k} \citep{k}
\bibliographystyle{plainnat} \bibliography{refs}

%================= BUILD =================
% latexmk -pdf main.tex   |   latexmk -pdf -pvc main.tex   |   latexmk -C
```

## 9.7 Where to go next

- **Overleaf's "Learn LaTeX in 30 minutes"** and its documentation pages, which are excellent per-topic references.
- **"The Not So Short Introduction to LaTeX2ε"** (`texdoc lshort`): the classic free book.
- **"LaTeX for Beginners" / learnlatex.org**: interactive lessons that run in the browser.
- **Package manuals** via `texdoc`: `amsmath` (`texdoc amsldoc`), `booktabs`, `siunitx`, `cleveref`, `tikz`, `biblatex`.
- **TeX StackExchange** for every "how do I…" question.
- **The LaTeX Companion, 3rd ed.** (Mittelbach & Fischer, 2023): the definitive reference book.
- **Read arXiv sources** of 10 papers in your field. This beats every tutorial.

## 9.8 Final project

Take [example-paper/](https://github.com/deependujha/learning_latex/tree/main/example-paper) and turn it into a 4-page mock paper on a topic you know:

1. Swap in the current NeurIPS or ICML style file (download it from the CFP) and adapt the author block.
2. Write your own `macros.tex` notation.
3. Add a matplotlib-generated PDF figure at the correct width.
4. Generate one results table from a Python script.
5. Add a theorem with a proof in the appendix using `restatable`.
6. Run `arxiv_latex_cleaner` and check that the cleaned version compiles with just `latexmk -pdf`.

If you can do all six without searching more than a couple of times, you're past intermediate.
