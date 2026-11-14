# Chapter 6: Diagrams, Plots, Chemistry and Other Scientific Notation

LaTeX can *draw* too. This chapter covers the drawing and domain-specific packages you're most likely to meet in papers.

## 6.1 TikZ: drawing with code

**TikZ** ("TikZ ist *kein* Zeichenprogramm", German for "TikZ is *not* a drawing program") is the standard LaTeX graphics package. Many diagrams in papers (neural nets, graphs, commutative diagrams, flowcharts) are TikZ.

```latex
\usepackage{tikz}
\usetikzlibrary{arrows.meta, positioning, shapes, calc, fit, backgrounds}
```

### Basics

```latex
\begin{tikzpicture}
  \draw (0,0) -- (2,0) -- (2,1) -- cycle;            % lines (coordinates in cm)
  \draw[thick, red, ->] (0,0) -- (1,1);               % styled arrow
  \draw[fill=blue!20] (3,0) rectangle (4,1);          % filled rectangle
  \draw (5,0.5) circle (0.5);                         % circle
  \draw[dashed] (6,0) to[bend left] (7,1);            % curve
  \node at (1,-0.5) {label};                          % text at a point
  \fill (0,0) circle (2pt);                           % dot
\end{tikzpicture}
```

Every command ends with `;`. Coordinates are `(x,y)` in cm by default. Options in `[...]`: colors, `thick`/`very thick`/`line width=1pt`, `->`/`<->`/`-{Stealth}` arrow heads, `dashed`/`dotted`, `fill=`, `draw=`, `rounded corners`.

### Nodes and edges: the part you'll actually use

```latex
\begin{tikzpicture}[
    node distance=1.2cm and 1.5cm,
    box/.style={draw, rounded corners, minimum width=2.2cm, minimum height=0.8cm, align=center, fill=#1},
    box/.default=white,
    arrow/.style={-{Stealth[length=2mm]}, thick},
  ]
  \node[box=gray!10]              (input)   {Input\\$x$};
  \node[box=blue!15, right=of input] (enc)  {Encoder};
  \node[box=orange!20, right=of enc] (lat)  {Latent $z$};
  \node[box=blue!15, right=of lat]  (dec)   {Decoder};
  \node[box=gray!10, right=of dec]  (out)   {Output\\$\hat{x}$};

  \draw[arrow] (input) -- (enc);
  \draw[arrow] (enc) -- (lat);
  \draw[arrow] (lat) -- (dec);
  \draw[arrow] (dec) -- (out);
  \draw[arrow, dashed, red] (out.south) -- ++(0,-0.8) -| node[pos=0.25, below] {reconstruction loss} (input.south);
\end{tikzpicture}
```

Key ideas:

- `\node[options] (name) {text};` creates a named node. `(name.north)`, `.south`, `.east`, `.west`, `.north east` are anchors.
- `right=of enc`, `below=of x` (library `positioning`) for relative layout.
- `/.style={...}` defines reusable styles (like CSS classes). `#1` is a style parameter.
- `-|` and `|-` draw orthogonal (elbow) connections. `++(0,-0.8)` is a relative move.
- `node[pos=..., above]` on a path labels an edge.

### Loops: drawing a neural network

```latex
\begin{tikzpicture}[neuron/.style={circle, draw, minimum size=6mm}, x=1.8cm, y=0.9cm]
  \foreach \i in {1,...,3} \node[neuron, fill=green!20] (I\i) at (0,-\i) {};
  \foreach \j in {1,...,4} \node[neuron, fill=blue!20]  (H\j) at (1,-\j+0.5) {};
  \foreach \k in {1,2}     \node[neuron, fill=red!20]   (O\k) at (2,-\k-0.5) {};
  \foreach \i in {1,...,3} \foreach \j in {1,...,4} \draw[->] (I\i) -- (H\j);
  \foreach \j in {1,...,4} \foreach \k in {1,2}     \draw[->] (H\j) -- (O\k);
  \node[above] at (0,-0.5) {Input};
  \node[above] at (1,0)    {Hidden};
  \node[above] at (2,-1)   {Output};
\end{tikzpicture}
```

### Practical TikZ advice

- **TikZ is slow to learn and to compile.** For complex figures, many researchers draw in draw.io / Figma / Keynote / Inkscape / Illustrator and export PDF. That's completely acceptable.
- TikZ wins when you want fonts and math that exactly match the paper, precise diagrams (graphs, commutative diagrams, geometry), or programmatic figures.
- Steal from **texample.net** and TeX StackExchange. Read `texdoc tikz` (a 1300-page manual, but its tutorials at the start are excellent).
- **TikZ via external file:** keep big diagrams in `figures/arch.tex` and `\input` them, or compile them separately with `standalone` and include the PDF:

  ```latex
  % figures/arch.tex
  \documentclass[tikz,border=2pt]{standalone}
  \usetikzlibrary{positioning}
  \begin{document}
  \begin{tikzpicture} ... \end{tikzpicture}
  \end{document}
  ```

- Other diagram packages: `tikz-cd` (commutative diagrams), `forest` (trees: parse trees, decision trees), `tikz-network`, `smartdiagram`, `quiver` (q.uiver.app, draw commutative diagrams in the browser and export `tikz-cd` code).

```latex
\usepackage{tikz-cd}
\begin{tikzcd}
  A \arrow[r, "f"] \arrow[d, "g"'] & B \arrow[d, "h"] \\
  C \arrow[r, "k"']                & D
\end{tikzcd}
```

## 6.2 pgfplots: plots in native LaTeX

`pgfplots` (built on TikZ) plots data or functions with paper-matching fonts:

```latex
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}

\begin{tikzpicture}
  \begin{axis}[
      width=\linewidth, height=5cm,
      xlabel={Training steps}, ylabel={Loss},
      xmode=log, grid=major, legend pos=north east,
    ]
    \addplot[blue, thick] table[x=step, y=loss, col sep=comma] {data/baseline.csv};
    \addlegendentry{Baseline}
    \addplot[red, thick, domain=10:1e5, samples=100] {2 + 50/x^0.3};
    \addlegendentry{Ours (fit)}
  \end{axis}
\end{tikzpicture}
```

Most ML people use matplotlib instead (chapter 5). pgfplots is great for clean, simple plots, and you'll see it in theory papers. Bridge: the `tikzplotlib` Python package (now unmaintained) converted matplotlib figures to pgfplots code.

## 6.3 Chemistry

### `mhchem`: formulas and reactions (most common)

```latex
\usepackage[version=4]{mhchem}

\ce{H2O}, \ce{H2SO4}, \ce{CO2}, \ce{Fe^{3+}}, \ce{SO4^{2-}}, \ce{^{14}_{6}C}
\ce{CuSO4 * 5H2O}                                  % hydrate dot
\ce{2H2 + O2 -> 2H2O}                              % reaction
\ce{N2 + 3H2 <=> 2NH3}                             % equilibrium
\ce{A ->[catalyst][\Delta] B}                      % text above/below arrow
\ce{CaCO3 ->[\Delta] CaO + CO2 ^}                  % gas evolution (up arrow)
\ce{Ag+ + Cl- -> AgCl v}                           % precipitate (down arrow)
\ce{[Cu(NH3)4]^{2+}}                               % complex ion
$K = \frac{[\ce{NH3}]^2}{[\ce{N2}][\ce{H2}]^3}$     % inside math
```

`\ce{}` handles subscripts, charges and arrows automatically: no `_` or `^` fiddling. It also works in MathJax, so the same syntax works on the web.

### `chemfig`: structural formulas

```latex
\usepackage{chemfig}

\chemfig{H-C(-[2]H)(-[6]H)-H}            % methane; [n] = angle n×45°
\chemfig{*6(=-=-=-)}                     % benzene ring
\chemfig{*6(-=-=(-OH)-=)}                % phenol
\chemfig{H_3C-C(=[1]O)-[7]OH}            % acetic acid
\chemfig{C(-[:150]H_3C)(-[:30]OH)=[6]O}  % absolute angles in degrees with [:deg]

% reaction schemes
\schemestart
  \chemfig{*6(=-=-=-)} \arrow{->[\ce{HNO3}][\ce{H2SO4}]} \chemfig{*6(=-=(-NO_2)-=-)}
\schemestop
```

Bonds: `-` single, `=` double, `~` triple, `>`/`<` wedges (stereo). `*6(...)` = 6-membered ring. Branches in parentheses.

Also: `chemmacros` (a full chemistry suite: oxidation states, IUPAC names, thermodynamics), `chemformula` (an alternative to mhchem), `modiagram` (molecular orbital diagrams). For complex molecules, many chemists draw in ChemDraw and include the PDF.

## 6.4 Units and numbers: `siunitx`

Essential for physics, engineering, chemistry, and ML hardware/compute reporting:

```latex
\usepackage{siunitx}
\sisetup{group-digits=integer, group-minimum-digits=4}

\num{123456789}            % 123 456 789 (digit grouping)
\num{1.5e-4}               % 1.5 × 10⁻⁴
\num{3+-0.2}               % 3 ± 0.2
\qty{9.81}{\metre\per\second\squared}   % 9.81 m/s² (\SI{}{} in older versions)
\qty{300}{\kelvin}, \qty{1.2}{\giga\hertz}, \qty{80}{\giga\byte}
\qty{2.5}{\micro\metre}
\unit{\kilo\gram\metre\per\second}   % unit alone (\si{} in older versions)
\qtyrange{10}{20}{\celsius}           % 10 °C to 20 °C
\ang{45}                   % 45°
\qty{95}{\percent}        % 95 %
```

Benefits: correct spacing between number and unit, upright units, consistent formatting, locale settings, and the `S` table column (chapter 5).

For compute: `\qty{1e24}{FLOPs}` (unit strings that aren't predefined can be plain text), or declare your own with `\DeclareSIUnit{\flop}{FLOP}`.

## 6.5 Physics

```latex
\usepackage{physics}   % convenient shortcuts (some people dislike it; it redefines things)

\bra{\psi}, \ket{\phi}, \braket{\psi}{\phi}, \ketbra{0}{1}  % Dirac notation
\expval{H}, \mel{n}{H}{m}                                   % ⟨H⟩, ⟨n|H|m⟩
\dv{f}{x}, \dv[2]{f}{x}, \pdv{f}{x}{y}                      % derivatives
\grad, \div, \curl, \laplacian                              % vector calculus
\abs{x}, \norm{v}, \qty(\frac{a}{b})                        % auto-sized delimiters
\tr, \Tr, \rank                                            % operators
\vb{F}, \vu{x}                                              % bold vector, unit vector
```

Alternatives: `braket` (just Dirac notation, lighter), `qcircuit` / `quantikz` (quantum circuits in TikZ), `tensor` (index notation), `feynmp`/`tikz-feynman` (Feynman diagrams).

```latex
\usepackage{tikz}\usetikzlibrary{quantikz2}   % library name depends on version: quantikz or quantikz2
\begin{quantikz}
  \lstick{$\ket{0}$} & \gate{H} & \ctrl{1} & \meter{} \\
  \lstick{$\ket{0}$} & \qw      & \targ{}  & \meter{}
\end{quantikz}
```

## 6.6 Electrical circuits: `circuitikz`

```latex
\usepackage{circuitikz}
\begin{circuitikz}
  \draw (0,0) to[battery1, l=$V$] (0,2)
              to[R, l=$R_1$] (3,2)
              to[C, l=$C$] (3,0)
              to[L, l=$L$] (0,0);
\end{circuitikz}
```

## 6.7 Other domain packages you may meet

| Domain | Package(s) |
|---|---|
| Logic / proof trees | `bussproofs`, `ebproof` |
| Linguistics | `forest` (syntax trees), `gb4e`/`expex` (glossed examples), `tipa` (IPA phonetics) |
| Graphs/networks | `tikz` graph library, `tikz-network` |
| Timing diagrams | `tikz-timing` |
| Music | `lilypond` (external), `musixtex` |
| Astronomy | `aastex` class (AAS journals) |
| Biology (sequences) | `texshade`, `textopo` |
| Game trees/econ | `istgame`, `sgame` |
| Statistics | `pgfplots` stat libraries; or just matplotlib/ggplot2 |
| Neural-net architecture figures | `PlotNeuralNet` (GitHub, generates TikZ for CNN diagrams) |
| Icons | `fontawesome5` (`\faGithub`), handy for "code available at" lines |
| Emoji | `\usepackage{emoji}` (LuaLaTeX only), or include an image |

## 6.8 Symbols in text mode

```latex
\usepackage{textcomp}  % mostly built into the kernel now
\textdegree, \texttrademark, \textregistered, \copyright, \textmu, \texteuro
\checkmark (amssymb, math or text), \ding{51} \ding{55} (package pifont: ✓ ✗ in tables)
$\dagger$, $\ddagger$, \S (section sign), \P (pilcrow)
```

The ✓/✗ in "feature comparison" tables of ML papers are usually `\cmark`/`\xmark` defined via `pifont`:

```latex
\usepackage{pifont}
\newcommand{\cmark}{\ding{51}}
\newcommand{\xmark}{\ding{55}}
```

## 6.9 Key takeaways

- TikZ: nodes + edges + styles + `\foreach`. Use it for precise diagrams; external tools are fine for complex art.
- pgfplots for native plots; most ML people use matplotlib PDFs.
- Chemistry: `\ce{}` (mhchem) for formulas/reactions, `chemfig` for structures.
- `siunitx` for every number with a unit.
- For any odd symbol: Detexify, then the Comprehensive Symbol List.
