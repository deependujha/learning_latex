# Chapter 3: Document Structure, Syntax and Text

## 3.1 The smallest complete document

```latex
\documentclass{article}          % 1. what kind of document

\usepackage{amsmath}              % 2. preamble: load packages, define things
\title{My First Paper}
\author{Ada Lovelace}
\date{\today}

\begin{document}                  % 3. body: the actual content
\maketitle

\section{Introduction}
Hello, \LaTeX{}! This is a paragraph.

This is another paragraph, because there was a blank line.
\end{document}
```

Everything before `\begin{document}` is the **preamble**: configuration only, no visible output. Everything between `\begin{document}` and `\end{document}` is content. Anything after `\end{document}` is ignored.

## 3.2 The syntax in five rules

1. **Commands** start with a backslash: `\section`, `\textbf`, `\alpha`.
   - Mandatory arguments go in braces: `\textbf{bold}`
   - Optional arguments go in square brackets, *before* the braces: `\section[Short]{A Very Long Title}`, `\documentclass[11pt,twocolumn]{article}`
   - Starred versions: `\section*{Acknowledgments}` = unnumbered.
   - A command name made of letters eats the spaces after it: `\LaTeX is` → "LaTeXis". Use `\LaTeX{} is` or `\LaTeX\ is`.
2. **Environments** wrap a region: `\begin{name} ... \end{name}`.
3. **Groups**: braces `{ }` limit scope: `{\small this is small} this is not`.
4. **Comments**: `%` to the end of the line. There's no block comment by default. Use `\iffalse ... \fi` or the `comment` package.
5. **Special characters** you must escape:

| Char | Meaning in LaTeX | To print it |
|---|---|---|
| `%` | comment | `\%` |
| `$` | math mode | `\$` |
| `&` | alignment tab | `\&` |
| `#` | macro parameter | `\#` |
| `_` | subscript (math) | `\_` |
| `^` | superscript (math) | `\^{}` or `\textasciicircum` |
| `{ }` | grouping | `\{ \}` |
| `~` | non-breaking space | `\textasciitilde` or `$\sim$` |
| `\` | command | `\textbackslash` |

The one that bites ML people constantly: **underscores in model names and file names.** Write `\texttt{train\_model.py}`, or use `\verb|train_model.py|` or `\path{}`/`\url{}`.

## 3.3 Whitespace and paragraphs

- Multiple spaces = one space. A single newline = a space.
- **A blank line = a new paragraph.** (`\par` does the same thing.)
- `\\` forces a line break *without* a new paragraph. **Avoid it in body text.** It's for tables, addresses, poetry.
- `~` is a **non-breaking space**. Use it before references so the number never ends up alone at the start of a line: `Figure~\ref{fig:a}`, `Section~3`, `Dr.~Smith`.
- After an abbreviation ending in a period, LaTeX assumes the sentence ended and adds extra space. Fix: `e.g.\ this`, `et al.\ show`, or `i.e.,` (a following comma avoids the issue).
- Explicit spacing: `\,` thin, `\quad` and `\qquad` wide, `\hspace{1cm}`, `\vspace{2mm}`. Avoid using these as a habit; let the class do layout.
- `\newpage`, `\clearpage` (also flushes pending floats).

## 3.4 Document classes

```latex
\documentclass[options]{class}
```

| Class | Use |
|---|---|
| `article` | Papers, short reports. The base for most conference templates. |
| `report`, `book` | Theses and books (have `\chapter`) |
| `beamer` | Slides |
| `memoir`, `scrartcl`/`scrreprt` (KOMA-Script) | Flexible, typographically refined alternatives |
| `revtex4-2` | APS physics journals |
| `amsart` | AMS math journals |
| `IEEEtran`, `acmart`, `llncs` (Springer), `elsarticle` | Publisher classes |

Common options: `10pt|11pt|12pt`, `a4paper|letterpaper`, `twocolumn`, `draft` (shows overfull boxes as black bars, skips images: fast), `final`.

**Conference templates for ML (NeurIPS, ICML, ICLR) use `article` and add their own style package** (`\usepackage{neurips_2026}`). See chapter 8.

## 3.5 Packages

```latex
\usepackage[options]{package}
```

A solid default preamble for a research paper:

```latex
\usepackage[utf8]{inputenc}      % harmless; UTF-8 is the default since 2018
\usepackage[T1]{fontenc}         % proper font encoding (hyphenation of accented words, copy-paste)
\usepackage{lmodern}             % or: times, mathptmx, newtxtext/newtxmath, libertine, ...
\usepackage{microtype}           % subtle spacing improvements: always use it
\usepackage{amsmath,amssymb,amsthm,mathtools}  % math (chapter 4)
\usepackage{graphicx}            % \includegraphics
\usepackage{booktabs}            % good tables
\usepackage{xcolor}              % colors
\usepackage{hyperref}            % clickable links (load late)
\usepackage[capitalize,noabbrev]{cleveref} % smart references (load after hyperref)
```

**Package load order matters a bit.** Rule of thumb: `hyperref` goes near the end, and `cleveref` comes after `hyperref`. Conference style files often load some of these already. Loading a package twice with *the same* options is harmless; with different options it gives an "option clash" error.

Find package docs: `texdoc booktabs` in the terminal, or ctan.org/pkg/booktabs.

## 3.6 Title, authors, abstract

```latex
\title{Attention Is All You Need (Again)}
\author{
  Ada Lovelace\thanks{Equal contribution.} \\
  Analytical Engine Lab\\
  \texttt{ada@example.org}
  \And                          % \And / \AND are NeurIPS-style separators; plain article uses \and
  Alan Turing\footnotemark[1] \\
  Bletchley Institute
}

\begin{document}
\maketitle

\begin{abstract}
We propose ...
\end{abstract}
```

Author formatting is **the most template-specific thing in LaTeX**. ICML uses `\icmlauthor{}`, IEEE uses `\IEEEauthorblockN`, `acmart` uses `\author{}\affiliation{}` blocks. Always copy the pattern from the template's example file.

## 3.7 Sectioning

```latex
\part{...}            % rarely used in papers
\chapter{...}         % report/book only
\section{Introduction}
\subsection{Motivation}
\subsubsection{A detail}
\paragraph{Bold run-in heading.} Text continues on the same line.
\subparagraph{...}

\section*{Acknowledgments}   % unnumbered, not in table of contents

\appendix                    % from here on, sections are lettered A, B, C...
\section{Proofs}
```

`\paragraph{}` is **heavily used in ML papers** for the bold inline mini-headings ("**Datasets.** We evaluate on...").

Table of contents: `\tableofcontents` (rare in papers, common in theses and long appendices).

## 3.8 Text formatting

| Markdown | LaTeX | Notes |
|---|---|---|
| `**bold**` | `\textbf{bold}` | |
| `*italic*` | `\emph{italic}` | `\emph` is semantic (toggles inside italic text). `\textit` forces italic. |
| `` `code` `` | `\texttt{code}` | Escape `_` inside it. Or `\verb|a_b|` (not inside other commands' arguments). |
| | `\textsc{Small Caps}` | Common for method names: `\textsc{BERT}` |
| | `\underline{x}` | Rarely used in papers, except for marking "second best" in tables |
| | `\textsf{sans}` | |
| ~~strike~~ | `\sout{x}` (package `ulem`) | |
| `[link](url)` | `\href{https://x.org}{link}`, `\url{https://x.org}` | needs `hyperref` / `url` |

Old-style `{\bf ...}` and `{\it ...}` are deprecated, but you'll still see them in old papers.

**Font sizes** (as switches): `\tiny \scriptsize \footnotesize \small \normalsize \large \Large \LARGE \huge \Huge`. Example: `{\small text}`.

**Quotes:** use ``` ``double'' ``` and `` `single' ``. Never type `"` for quotes in pdfLaTeX: you get a straight or closing-style quote on both sides instead of proper opening quotes. Or use the `csquotes` package with `\enquote{...}`.

**Dashes:**
- `-` hyphen: *state-of-the-art*
- `--` en dash: ranges *pages 10--20*, *2019--2024*, *encoder--decoder*
- `---` em dash: a break in thought—like this

**Ellipsis:** `\ldots` (text) or `\dots`. Not three periods.

**Colors:** `\textcolor{red}{text}`, `{\color{blue} text}` (package `xcolor`). Define your own: `\definecolor{mygreen}{RGB}{0,150,80}`.

## 3.9 Lists

```latex
\begin{itemize}          % bullets  (Markdown: - item)
  \item First
  \item Second
  \begin{itemize}
    \item Nested
  \end{itemize}
\end{itemize}

\begin{enumerate}        % numbered (Markdown: 1. item)
  \item First
  \item[(a)] Custom label
\end{enumerate}

\begin{description}      % term–definition
  \item[Encoder] maps inputs to latents.
  \item[Decoder] maps latents to outputs.
\end{description}
```

The **`enumitem`** package lets you control spacing and labels. Use it to save space in papers:

```latex
\usepackage{enumitem}
\begin{itemize}[leftmargin=*, nosep]
  \item Compact list, no extra vertical space.
\end{itemize}
\begin{enumerate}[label=(\roman*)]   % (i), (ii), (iii)
  \item ...
\end{enumerate}
```

The classic "our contributions are:" list in ML papers is an `itemize` with `nosep` or `itemsep=0pt`.

## 3.10 Footnotes, quotes, verbatim

```latex
Transformers\footnote{Introduced by \citet{vaswani2017}.} are everywhere.

\begin{quote}
  A short block quote.
\end{quote}

\begin{verbatim}
Text exactly as typed, including _ % $ & characters.
\end{verbatim}
```

## 3.11 Labels and cross-references

This is one of LaTeX's superpowers.

```latex
\section{Method}\label{sec:method}

\begin{equation}
  y = Wx + b \label{eq:linear}
\end{equation}

\begin{figure}
  ...
  \caption{Our architecture.}\label{fig:arch}   % \label AFTER \caption!
\end{figure}

As shown in Section~\ref{sec:method}, Eq.~\eqref{eq:linear}, and Figure~\ref{fig:arch}...
On page~\pageref{fig:arch}...
```

**Conventions** for label prefixes: `sec:`, `subsec:`, `eq:`, `fig:`, `tab:`, `alg:`, `thm:`, `lem:`, `app:`. They're just text, but they keep you sane.

**`cleveref`** writes the word for you:

```latex
\cref{fig:arch}          % → "Figure 3"   (with [capitalize,noabbrev] options)
\Cref{eq:linear}         % → "Equation (2)", capitalized for start of sentence
\cref{fig:a,fig:b,fig:c} % → "Figures 1 to 3"
```

Most modern ML papers use `\cref`. (Chapter 7 covers `hyperref` + `cleveref` setup.)

**Gotcha:** `\label` refers to the most recent *numbered* thing. In figures, it must come **after** `\caption`, or you get the section number instead.

## 3.12 Defining your own commands (macros)

This is where LaTeX beats Markdown: you can define your own vocabulary.

```latex
% In the preamble (or macros.tex)
\newcommand{\method}{\textsc{FastNet}}           % no arguments
\newcommand{\R}{\mathbb{R}}
\newcommand{\norm}[1]{\left\lVert #1 \right\rVert}    % one argument: #1
\newcommand{\inner}[2]{\langle #1, #2 \rangle}         % two arguments
\newcommand{\vect}[1][x]{\mathbf{#1}}             % optional arg with default "x"

\renewcommand{\vec}[1]{\boldsymbol{#1}}           % redefine an existing command

% xspace: adds a space after a macro unless followed by punctuation
\usepackage{xspace}
\newcommand{\ours}{\textsc{FastNet}\xspace}
```

Usage:

```latex
\method outperforms baselines.        % careful: eats the space → "FastNetoutperforms"
\method{} outperforms baselines.      % OK
\ours outperforms baselines.          % OK with \xspace
Let $x \in \R^d$ and $\norm{x} \le 1$, with $\inner{u}{v} = 0$.
```

Changing `\method` in one place renames your method across the whole paper. That's invaluable when reviewers or co-authors want a different name.

### Collaboration/TODO macros (very common)

```latex
\newcommand{\todo}[1]{\textcolor{red}{[TODO: #1]}}
\newcommand{\ada}[1]{\textcolor{blue}{[Ada: #1]}}
\newcommand{\alan}[1]{\textcolor{orange}{[Alan: #1]}}

% to hide all notes for the final version:
% \renewcommand{\todo}[1]{}
```

Or use the `todonotes` package for margin notes: `\todo{fix this}`.

### Environments of your own

```latex
\newenvironment{keyidea}
  {\begin{quote}\itshape\textbf{Key idea.}~}
  {\end{quote}}
```

## 3.13 Boxes, minipages and columns

```latex
\begin{minipage}{0.48\textwidth}
  Left content
\end{minipage}\hfill
\begin{minipage}{0.48\textwidth}
  Right content
\end{minipage}

\fbox{framed text}
\parbox{5cm}{a paragraph in a fixed-width box}
```

Useful length units: `\textwidth` (text block width), `\linewidth` (current line width, use this inside columns/minipages), `\columnwidth`, `pt`, `mm`, `cm`, `in`, `em` (width of an "M" in the current font).

For fancy colored boxes (like "takeaway" boxes in papers), use `tcolorbox`:

```latex
\usepackage{tcolorbox}
\begin{tcolorbox}[colback=blue!5, colframe=blue!60!black, title=Takeaway]
  Scaling data matters more than scaling parameters.
\end{tcolorbox}
```

(`blue!5` means 5% blue mixed with white. That `xcolor` syntax shows up everywhere.)

## 3.14 Markdown → LaTeX quick map

| Markdown | LaTeX |
|---|---|
| `# H1` / `## H2` / `### H3` | `\section{}` / `\subsection{}` / `\subsubsection{}` |
| blank line | blank line (same!) |
| `**b**`, `*i*` | `\textbf{b}`, `\emph{i}` |
| `` `c` `` | `\texttt{c}` |
| `- item` | `\begin{itemize} \item ... \end{itemize}` |
| `1. item` | `\begin{enumerate} \item ... \end{enumerate}` |
| `[t](u)` | `\href{u}{t}` |
| `![alt](img.png)` | `\begin{figure}...\includegraphics{img}...\end{figure}` |
| `> quote` | `\begin{quote}...\end{quote}` |
| ```` ```code``` ```` | `verbatim` / `lstlisting` / `minted` |
| `$x$`, `$$x$$` | `$x$`, `\[ x \]` (never `$$` in LaTeX) |
| table with pipes | `tabular` (chapter 5) |
| footnote `[^1]` | `\footnote{...}` |
| `---` horizontal rule | `\noindent\rule{\linewidth}{0.4pt}` (rare in papers) |

## 3.15 Key takeaways

- Preamble = setup; body = content. Commands `\x{}`, optional args `[ ]`, environments `\begin{}...\end{}`.
- Escape `% $ & # _ { } ~ ^ \`. Underscores in code names are the usual trap.
- Blank line = paragraph. Use `~` before refs. Avoid `\\` in prose.
- `\label` + `\ref`/`\cref` for everything. Label after caption.
- Define macros for your method name, notation and TODOs.
