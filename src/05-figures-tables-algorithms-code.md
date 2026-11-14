# Chapter 5: Figures, Tables, Algorithms and Code

## 5.1 Floats: the concept that confuses everyone

Figures and tables are **floats**: LaTeX moves them to where they fit best (top of a page, bottom, or a page of floats), *not* necessarily where you wrote them in the source. That's how professionally typeset books behave, and why you always refer to them by number ("see Figure 3") instead of "the figure below".

```latex
\begin{figure}[t]     % placement specifier
  ...
\end{figure}
```

| Specifier | Meaning |
|---|---|
| `h` | here, approximately |
| `t` | top of a page |
| `b` | bottom of a page |
| `p` | on a separate float page |
| `!` | try harder (ignore some aesthetic limits) |
| `H` | exactly HERE, no floating (package `float`). Use sparingly |

**Recommendation for papers: `[t]`** for most figures/tables (ML templates look best with floats at the tops of pages), `[!t]` if one keeps drifting, `[h!]` only in special cases. Avoid `[H]` in conference papers: it creates big gaps.

If floats pile up and drift to the end: write fewer large floats, put them in the source near (slightly before) where they're first mentioned, or use `\clearpage` to flush them.

## 5.2 Including images

```latex
\usepackage{graphicx}
\graphicspath{{figures/}}    % optional: where to look

\begin{figure}[t]
  \centering                                         % not \begin{center}: adds extra space
  \includegraphics[width=0.8\linewidth]{architecture} % extension optional
  \caption{Overview of our architecture. The encoder maps ...}
  \label{fig:arch}
\end{figure}
```

`\includegraphics` options: `width=`, `height=`, `scale=0.5`, `angle=90`, `keepaspectratio`, `trim=l b r t, clip` (crop), `page=2` (for multi-page PDFs).

**File formats:**

| Format | Use |
|---|---|
| **PDF** | **Best for plots and diagrams** (vector: crisp at any zoom, small). Export matplotlib with `plt.savefig("fig.pdf", bbox_inches="tight")`. |
| PNG | Screenshots, raster images, heatmaps with huge numbers of points |
| JPG | Photos |
| EPS | Old; only with `latex`+`dvips` (pdfLaTeX converts via `epstopdf`) |
| SVG | Not directly. Convert to PDF (Inkscape), or use the `svg` package (needs Inkscape and shell-escape) |

**Matplotlib tips for papers:**

```python
import matplotlib.pyplot as plt
plt.rcParams.update({
    "font.family": "serif",          # match the paper's font
    "font.size": 9,                  # paper body is ~10pt; figure text should be similar
    "pdf.fonttype": 42,              # embed TrueType: some venues reject Type 3 fonts
    "ps.fonttype": 42,
    # "text.usetex": True,           # render labels with real LaTeX (slow, needs TeX installed)
})
fig, ax = plt.subplots(figsize=(3.25, 2.2))   # single-column width ≈ 3.25in (two-column formats)
...
fig.savefig("figures/results.pdf", bbox_inches="tight")
```

**Make the figure at its final size** (e.g. `figsize` = column width) and include it with `width=\linewidth`. Then fonts in the figure match the text instead of becoming tiny or huge after scaling.

Useful widths: in NeurIPS/ICLR (single column) `\textwidth` ≈ 5.5in. In ICML/CVPR/IEEE (two-column) `\columnwidth` ≈ 3.25in, and `figure*` spans both columns.

## 5.3 Captions

- **Figure captions go below** the figure; **table captions go above** the table (convention, and most templates' style).
- The first sentence of a caption should work alone; ML papers often bold it: `\caption{\textbf{Scaling curves.} Loss vs. compute ...}`.
- `\caption[Short]{Long ...}`: the short version appears in the list of figures.
- Customize with the `caption` package: `\usepackage[font=small,labelfont=bf]{caption}`. (Many templates already set this. Check the rules before changing caption styling, since some venues forbid it.)

## 5.4 Subfigures and side-by-side

```latex
\usepackage{subcaption}   % modern; do NOT use the old subfig/subfigure packages with it

\begin{figure}[t]
  \centering
  \begin{subfigure}[b]{0.48\linewidth}
    \centering
    \includegraphics[width=\linewidth]{loss_curve}
    \caption{Training loss.}
    \label{fig:loss}
  \end{subfigure}
  \hfill
  \begin{subfigure}[b]{0.48\linewidth}
    \centering
    \includegraphics[width=\linewidth]{accuracy}
    \caption{Test accuracy.}
    \label{fig:acc}
  \end{subfigure}
  \caption{Training dynamics on ImageNet.}
  \label{fig:dynamics}
\end{figure}
```

`\cref{fig:loss}` → "Figure 2a". `\subref{fig:loss}` → "(a)".

**Simpler alternative** (no sub-captions, just images side by side): put several `\includegraphics` in one figure separated by `\hfill`.

**Figure beside text** (`wrapfig`) saves space in page-limited papers:

```latex
\usepackage{wrapfig}
\begin{wrapfigure}{r}{0.4\textwidth}   % r = right side
  \centering
  \includegraphics[width=\linewidth]{small_plot}
  \caption{A small plot.}
  \label{fig:small}
\end{wrapfigure}
Paragraph text flows around the figure...
```

`wrapfig` is fragile: don't put it near section headings, lists or page breaks.

**Two-column templates:** `\begin{figure*}[t] ... \end{figure*}` spans the full width (only `t` or `p` placement).

## 5.5 Tables

### Anatomy of `tabular`

```latex
\begin{tabular}{l c r p{4cm}}   % column spec: left, center, right, paragraph of fixed width
  Name & Value & Count & Description \\   % & separates cells, \\ ends row
  \hline
  A    & 1.0   & 10    & long text that wraps ... \\
\end{tabular}
```

Column types: `l`, `c`, `r`, `p{width}` (top-aligned paragraph), `|` (vertical line, **don't use in papers**), `@{}` (remove the inter-column padding), `*{5}{c}` (repeat `c` 5 times).

### Professional tables with `booktabs`

The house style of nearly every good ML paper: **no vertical lines, three horizontal rules.**

```latex
\usepackage{booktabs}
\usepackage{multirow}

\begin{table}[t]
  \centering
  \caption{Test accuracy (\%) on standard benchmarks. Best in \textbf{bold}, second \underline{underlined}.}
  \label{tab:main}
  \begin{tabular}{@{}lcccc@{}}
    \toprule
    \multirow{2}{*}{Method} & \multicolumn{2}{c}{CIFAR-10} & \multicolumn{2}{c}{ImageNet} \\
    \cmidrule(lr){2-3} \cmidrule(lr){4-5}
                     & Top-1 & Params & Top-1 & Params \\
    \midrule
    ResNet-50        & 93.0          & 25M  & 76.1          & 25M  \\
    ViT-B/16         & \underline{98.1} & 86M  & \underline{81.8} & 86M \\
    \method (ours)   & \textbf{98.6} & 40M  & \textbf{82.9} & 40M  \\
    \bottomrule
  \end{tabular}
\end{table}
```

- `\toprule`, `\midrule`, `\bottomrule`: rules with proper weights and spacing.
- `\cmidrule(lr){2-3}`: a partial rule under columns 2–3, trimmed at left/right.
- `\multicolumn{2}{c}{text}`: span 2 columns, centered.
- `\multirow{2}{*}{text}`: span 2 rows (package `multirow`).
- `\addlinespace`: a little extra space between groups of rows.

### Making tables fit

```latex
\small                 % or \footnotesize, inside the table environment, before tabular
\setlength{\tabcolsep}{4pt}       % default 6pt; reduces column padding
\resizebox{\linewidth}{!}{ \begin{tabular}...\end{tabular} }   % scale to width
```

`\resizebox` is common in ML papers but makes font sizes inconsistent. Prefer `\small` plus fewer columns when possible.

**Fixed total width with stretchy columns:**

```latex
\usepackage{tabularx}
\begin{tabularx}{\linewidth}{@{}lX@{}}   % X columns share the remaining width
  \toprule
  Term & Definition that will wrap as needed to fill the line \\
  \bottomrule
\end{tabularx}
```

### Numbers in tables

- Align decimals with `siunitx`'s `S` column type:

  ```latex
  \usepackage{siunitx}
  \begin{tabular}{l S[table-format=2.1] S[table-format=1.3]}
    \toprule
    Model & {Acc} & {Loss} \\     % non-numeric headers in braces
    \midrule
    A & 93.1 & 0.231 \\
    B & 8.4  & 1.020 \\
    \bottomrule
  \end{tabular}
  ```

- Mean ± std: `93.1{\scriptsize$\pm$0.2}` or `$93.1_{\pm 0.2}$`, both common.
- Colored cells: `\usepackage[table]{xcolor}` then `\cellcolor{gray!15}`, `\rowcolor{blue!5}`.

### Don't hand-write big tables

Generate them from your results: `pandas.DataFrame.to_latex()`, or write a tiny Python script that emits `\toprule ... \bottomrule` into `tables/main.tex`, then `\input{tables/main}`. This avoids copy-paste errors in your numbers.

Online generators like *Tables Generator* (tablesgenerator.com) help for one-off complex layouts.

### Long tables

`longtable` (or `xltabular`) for tables that break across pages, common in appendices (hyperparameter listings, per-task results).

## 5.6 Algorithms / pseudocode

There are two main families. Templates and lab culture decide which you use.

**`algorithm` + `algpseudocode` (algorithmicx)**: what ICML's and many other templates use:

```latex
\usepackage{algorithm}
\usepackage{algpseudocode}

\begin{algorithm}[t]
  \caption{Mini-batch SGD}
  \label{alg:sgd}
  \begin{algorithmic}[1]          % [1] = number every line
    \Require dataset $\mathcal{D}$, learning rate $\eta$, epochs $T$
    \Ensure parameters $\theta$
    \State initialize $\theta_0$
    \For{$t = 1$ \textbf{to} $T$}
      \For{each minibatch $B \subset \mathcal{D}$}
        \State $g \gets \frac{1}{|B|}\sum_{(x,y)\in B} \nabla_\theta \ell(f_\theta(x), y)$
        \State $\theta \gets \theta - \eta\, g$ \Comment{gradient step}
      \EndFor
      \If{converged}
        \State \textbf{break}
      \EndIf
    \EndFor
    \State \Return $\theta$
  \end{algorithmic}
\end{algorithm}
```

**`algorithm2e`**: a different syntax (semicolons, `\eIf`, `\KwIn`) that you'll often see:

```latex
\usepackage[ruled,vlined,linesnumbered]{algorithm2e}

\begin{algorithm}[t]
  \caption{Mini-batch SGD}\label{alg:sgd2}
  \KwIn{dataset $\mathcal{D}$, learning rate $\eta$}
  \KwOut{parameters $\theta$}
  initialize $\theta$\;
  \For{$t \gets 1$ \KwTo $T$}{
    sample minibatch $B$\;
    $\theta \gets \theta - \eta \nabla \ell_B(\theta)$\;
  }
  \Return{$\theta$}\;
\end{algorithm}
```

Don't load both families in one document: they both define an `algorithm` environment and will clash.

## 5.7 Code listings

**`listings`**: pure LaTeX, works everywhere (including arXiv):

```latex
\usepackage{listings}
\lstset{
  basicstyle=\ttfamily\small,
  keywordstyle=\color{blue},
  commentstyle=\color{gray},
  stringstyle=\color{teal},
  numbers=left, numberstyle=\tiny, frame=single,
  breaklines=true, showstringspaces=false,
}

\begin{lstlisting}[language=Python, caption={Training loop}, label={lst:train}]
for x, y in loader:
    loss = criterion(model(x), y)   # forward
    loss.backward()
    optimizer.step(); optimizer.zero_grad()
\end{lstlisting}

Inline: \lstinline|model.train()|
Whole file: \lstinputlisting[language=Python]{code/train.py}
```

**`minted`**: much prettier syntax highlighting with Pygments, but it needs Python plus `-shell-escape`. Works on Overleaf. **Causes problems on arXiv** (it needs either shell-escape or the `frozencache` option with cached files). Use `listings` for arXiv-bound papers unless you know the workaround.

```latex
\usepackage{minted}
\begin{minted}[fontsize=\small, linenos]{python}
def f(x): return x ** 2
\end{minted}
```

## 5.8 A full "teaser figure" pattern (very common in ML papers)

A full-width figure at the top of page 1, right under the abstract (or above it):

```latex
% two-column (ICML/CVPR) style: figure* right after \maketitle area
\begin{figure*}[t]
  \centering
  \includegraphics[width=\textwidth]{teaser}
  \caption{\textbf{\method in action.} ...}
  \label{fig:teaser}
\end{figure*}

% CVPR-style teaser *above* the abstract is done with a template-specific trick:
% \twocolumn[{\maketitle \begin{center} \includegraphics... \captionof{figure}{...} \end{center}}]
% (\captionof needs the caption package; lets you caption outside a float)
```

## 5.9 Key takeaways

- Figures and tables float. Use `[t]` and refer to them by `\cref`, never "below".
- Vector PDFs for plots, generated at final size with matching fonts.
- `subcaption` for subfigures. `figure*` for full width in two-column templates.
- `booktabs` tables: no vertical lines, `\toprule`/`\midrule`/`\bottomrule`. Generate big tables from code.
- `algorithm` + `algpseudocode` (or `algorithm2e`), but never both. `listings` for code if you're going to arXiv.
