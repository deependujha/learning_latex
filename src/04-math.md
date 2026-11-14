# Chapter 4: Mathematics

You probably already write `$x^2$` in Markdown. This chapter takes you from "I can write inline math" to "I can typeset a theory-heavy appendix properly".

Required preamble for everything below:

```latex
\usepackage{amsmath}   % align, equation*, \text, \eqref, cases, matrices ...
\usepackage{amssymb}   % \mathbb, \leqslant, extra symbols
\usepackage{amsthm}    % theorem/proof environments
\usepackage{mathtools} % amsmath fixes/extensions: \coloneqq, dcases, \DeclarePairedDelimiter
\usepackage{bm}        % \bm{} bold math
```

## 4.1 Inline vs display math

```latex
Inline: the loss $\mathcal{L}(\theta)$ is convex.      % also \( ... \)

Display, unnumbered:
\[
  \mathcal{L}(\theta) = \frac{1}{n}\sum_{i=1}^{n} \ell\bigl(f_\theta(x_i), y_i\bigr)
\]

Display, numbered:
\begin{equation}
  \theta_{t+1} = \theta_t - \eta \nabla_\theta \mathcal{L}(\theta_t)
  \label{eq:sgd}
\end{equation}

Numbered environment, suppressed: \begin{equation*} ... \end{equation*}
```

- **Never use `$$ ... $$` in LaTeX.** It's plain-TeX syntax: it messes up vertical spacing and ignores the `fleqn` option. Use `\[ ... \]` or `equation*`.
- Refer to equations with `\eqref{eq:sgd}` → "(1)", or `\cref{eq:sgd}` → "Equation (1)".
- **Punctuation:** equations are part of sentences. Put the comma/period *inside* the display: `... \mathcal{L}(\theta_t). \end{equation}`
- Don't leave a blank line before `\begin{equation}` unless you really mean to start a new paragraph. Blank lines inside math environments are errors.

## 4.2 The basics

```latex
x^2, \quad x_i, \quad x_i^2, \quad x^{2n}, \quad x_{i,j}, \quad e^{-\frac{x^2}{2}}
```

Braces matter: `x^10` gives x¹0. You need `x^{10}`.

| What | Code | Notes |
|---|---|---|
| Fraction | `\frac{a}{b}` | `\tfrac` (small), `\dfrac` (display-size), `a/b` inline is often nicer |
| Root | `\sqrt{x}`, `\sqrt[3]{x}` | |
| Sum / product | `\sum_{i=1}^{n}`, `\prod_{i}` | limits go under/over in display mode, to the side inline |
| Integral | `\int_0^\infty f(x)\,\mathrm{d}x` | note the thin space `\,` before d*x* |
| Limits | `\lim_{n \to \infty}` | |
| Derivatives | `\frac{\partial \mathcal{L}}{\partial \theta}`, `\nabla`, `f'(x)`, `\dot{x}` | |
| Binomial | `\binom{n}{k}` | |
| Overline etc. | `\bar{x}`, `\hat{y}`, `\tilde{x}`, `\vec{v}`, `\overline{AB}`, `\widehat{xyz}` | |
| Under/overbrace | `\underbrace{a+b}_{\text{sum}}` | |
| Text in math | `\text{if } x > 0` | Uses the surrounding text font. Keep the spaces inside `\text{}` |
| Upright subscripts | `x_{\text{train}}`, `\mathcal{L}_{\mathrm{CE}}` | words as subscripts must be upright, not italic |

### Greek letters

`\alpha \beta \gamma \delta \epsilon \varepsilon \zeta \eta \theta \vartheta \iota \kappa \lambda \mu \nu \xi \pi \rho \sigma \tau \phi \varphi \chi \psi \omega`

Uppercase: `\Gamma \Delta \Theta \Lambda \Xi \Pi \Sigma \Phi \Psi \Omega` (uppercase A, B, E… are just Latin letters).

### Relations and operators

| Code | Symbol | Code | Symbol |
|---|---|---|---|
| `\le`, `\ge` | ≤ ≥ | `\neq` | ≠ |
| `\approx` | ≈ | `\sim` | ∼ |
| `\equiv` | ≡ | `\propto` | ∝ |
| `\ll`, `\gg` | ≪ ≫ | `\coloneqq` (mathtools) | ≔ |
| `\in`, `\notin` | ∈ ∉ | `\subset`, `\subseteq` | ⊂ ⊆ |
| `\cup`, `\cap` | ∪ ∩ | `\setminus` | ∖ |
| `\forall`, `\exists` | ∀ ∃ | `\emptyset`, `\varnothing` | ∅ |
| `\to`, `\mapsto` | → ↦ | `\Rightarrow`, `\iff` | ⇒ ⇔ |
| `\times`, `\cdot` | × · | `\otimes`, `\oplus` | ⊗ ⊕ |
| `\odot` | ⊙ (Hadamard) | `\circ` | ∘ |
| `\pm`, `\mp` | ± ∓ | `\infty` | ∞ |
| `\partial` | ∂ | `\nabla` | ∇ |
| `\top` (transpose: `x^\top`) | ⊤ | `\perp` | ⊥ |
| `\ldots`, `\cdots` | … ⋯ | `\vdots`, `\ddots` | ⋮ ⋱ |

Use `\cdots` between operators (`a_1 + \cdots + a_n`) and `\ldots` between commas (`x_1, \ldots, x_n`). Or just use `\dots`, which `amsmath` usually guesses correctly.

### Math fonts (alphabets)

```latex
\mathbb{R}, \mathbb{E}, \mathbb{N}     % blackboard bold: number sets, expectation
\mathcal{L}, \mathcal{D}, \mathcal{N}  % calligraphic: loss, dataset, Gaussian
\mathbf{x}, \mathbf{W}                 % bold upright: vectors/matrices (Latin only)
\bm{\theta}, \bm{x}                    % bold italic incl. Greek (package bm)
\boldsymbol{\mu}                       % amsmath version of bold
\mathrm{d}x, \mathrm{softmax}          % upright roman
\mathsf{T}                             % sans-serif
\mathfrak{g}                           % fraktur (Lie algebras etc.)
\mathscr{L}                            % script (package mathrsfs)
```

**ML convention:** lowercase bold = vector (**x**), uppercase bold = matrix (**W**), calligraphic = sets/distributions/losses, blackboard = ℝ and 𝔼. Pick one and stay consistent. Macros help (§4.9).

## 4.3 Delimiters that size themselves

```latex
\left( \frac{a}{b} \right)              % grows to fit
\left[ ... \right], \left\{ ... \right\}, \left| x \right|, \left\langle u, v \right\rangle
\left. \frac{df}{dx} \right|_{x=0}      % invisible left delimiter

% Manual sizing (often looks better than \left/\right):
\bigl( \Bigl( \biggl( \Biggl(  ...  \Bigr) ...
```

`\left(...\right)` can make delimiters *too* big around sums and gives odd spacing. Professionals often use `\bigl(`/`\bigr)` manually.

With `mathtools`, define paired delimiters once:

```latex
\DeclarePairedDelimiter{\abs}{\lvert}{\rvert}
\DeclarePairedDelimiter{\norm}{\lVert}{\rVert}
\DeclarePairedDelimiter{\ceil}{\lceil}{\rceil}

$\norm{x}$          % normal size
$\norm*{\frac{a}{b}}$  % auto-sized (\left \right)
$\norm[\big]{x}$    % manual size
```

## 4.4 Multi-line equations

| Environment | Use |
|---|---|
| `align` / `align*` | Several equations aligned at `&` (usually at `=`). Each line numbered (or not with `*`). |
| `gather` | Several centered equations, no alignment |
| `multline` | One long equation split over lines (first left, last right) |
| `split` (inside `equation`) | One equation, several aligned lines, **one** number |
| `cases` | Piecewise definitions |
| `aligned` / `gathered` | Sub-blocks inside another math environment |

```latex
\begin{align}
  \mathcal{L}(\theta)
    &= \mathbb{E}_{(x,y)\sim\mathcal{D}} \left[ -\log p_\theta(y \mid x) \right] \label{eq:nll}\\
    &\approx -\frac{1}{n} \sum_{i=1}^{n} \log p_\theta(y_i \mid x_i) \nonumber \\
    &= \mathcal{L}_{\text{emp}}(\theta). \label{eq:emp}
\end{align}
```

- `&` marks the alignment point; `\\` ends a line (but **not** after the last line).
- `\nonumber` (or `\notag`) removes the number from one line.
- `\label` per line.

**One number for a multi-line derivation:**

```latex
\begin{equation}
\begin{split}
  (a+b)^2 &= (a+b)(a+b) \\
          &= a^2 + 2ab + b^2.
\end{split}
\label{eq:square}
\end{equation}
```

**Several equation columns** in one `align`: `a &= b & c &= d \\` (every other `&` separates columns).

**Piecewise:**

```latex
\mathrm{ReLU}(x) =
\begin{cases}
  x & \text{if } x > 0, \\
  0 & \text{otherwise.}
\end{cases}
```

(`dcases` from mathtools gives display-style fractions inside.)

**Text between aligned lines:**

```latex
\begin{align*}
  f(x) &= x^2 + 2x + 1 \\
  \intertext{and therefore}     % or \shortintertext{} from mathtools
  f(x) &= (x+1)^2.
\end{align*}
```

**Subequations** (1a, 1b, 1c):

```latex
\begin{subequations}\label{eq:system}
\begin{align}
  \dot{x} &= \sigma (y - x) \label{eq:lorenz-x}\\
  \dot{y} &= x(\rho - z) - y \\
  \dot{z} &= xy - \beta z
\end{align}
\end{subequations}
```

## 4.5 Matrices and arrays

```latex
\begin{pmatrix} a & b \\ c & d \end{pmatrix}   % ( )
\begin{bmatrix} a & b \\ c & d \end{bmatrix}   % [ ]
\begin{vmatrix} a & b \\ c & d \end{vmatrix}   % | |  determinant
\begin{Bmatrix} ... \end{Bmatrix}              % { }
\begin{matrix} ... \end{matrix}                % no delimiters

% General n×m matrix
\mathbf{A} =
\begin{bmatrix}
  a_{11} & a_{12} & \cdots & a_{1m} \\
  a_{21} & a_{22} & \cdots & a_{2m} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{n1} & a_{n2} & \cdots & a_{nm}
\end{bmatrix}

% Inline small matrix
$\left(\begin{smallmatrix} 1 & 0 \\ 0 & 1 \end{smallmatrix}\right)$

% array: custom column alignment, vertical rules for augmented matrices
\left[\begin{array}{cc|c}
  1 & 2 & 3 \\
  4 & 5 & 6
\end{array}\right]
```

## 4.6 Operators: argmax, softmax, KL…

Functions like `\sin \cos \log \exp \max \min \sup \inf \lim \det \dim \ker \Pr \arg` are predefined and print upright. **For anything else, declare an operator** rather than writing `argmax` (which would print as italic a·r·g·m·a·x, i.e. a product of variables):

```latex
% preamble
\DeclareMathOperator*{\argmax}{arg\,max}   % * = limits go underneath in display
\DeclareMathOperator*{\argmin}{arg\,min}
\DeclareMathOperator{\softmax}{softmax}
\DeclareMathOperator{\tr}{tr}
\DeclareMathOperator{\diag}{diag}
\DeclareMathOperator{\KL}{KL}
\DeclareMathOperator{\Var}{Var}
\DeclareMathOperator{\Cov}{Cov}
\DeclareMathOperator{\rank}{rank}

% body
\[
  \theta^\star = \argmin_{\theta \in \Theta} \mathcal{L}(\theta), \qquad
  \mathrm{Attn}(Q,K,V) = \softmax\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
\]
\[
  D_{\KL}(p \,\|\, q) = \sum_x p(x) \log \frac{p(x)}{q(x)}
\]
```

(`\!` is a *negative* thin space, used here to pull the parenthesis closer.)

## 4.7 Spacing in math

LaTeX ignores spaces you type in math mode: `$a b$` = `$ab$`. Spacing comes from symbol classes. Manual spacing:

| Code | Width |
|---|---|
| `\!` | −3/18 em (negative) |
| `\,` | 3/18 em |
| `\:` | 4/18 em |
| `\;` | 5/18 em |
| `\quad` | 1 em |
| `\qquad` | 2 em |

Common uses: `\int f(x)\,\mathrm{d}x`, `x \,\|\, y`, separating conditions: `\quad \text{for all } i`.

`\mid` vs `|`: use `p(y \mid x)` for "given". It has the right spacing for a relation; `p(y|x)` is cramped.

`\colon` for function signatures: `f \colon \mathbb{R}^d \to \mathbb{R}`.

## 4.8 Theorems, lemmas, proofs (`amsthm`)

```latex
% preamble
\theoremstyle{plain}                 % italic body
\newtheorem{theorem}{Theorem}[section]   % numbered within sections: Theorem 3.1
\newtheorem{lemma}[theorem]{Lemma}       % shares counter with theorem
\newtheorem{proposition}[theorem]{Proposition}
\newtheorem{corollary}[theorem]{Corollary}
\theoremstyle{definition}            % upright body
\newtheorem{definition}[theorem]{Definition}
\newtheorem{assumption}{Assumption}
\theoremstyle{remark}
\newtheorem*{remark}{Remark}         % * = unnumbered
```

```latex
\begin{assumption}[Smoothness]\label{asm:smooth}
  $\mathcal{L}$ is $\beta$-smooth: $\norm{\nabla\mathcal{L}(x) - \nabla\mathcal{L}(y)} \le \beta\norm{x-y}$.
\end{assumption}

\begin{theorem}[Convergence of SGD]\label{thm:conv}
  Under \cref{asm:smooth}, with step size $\eta \le 1/\beta$,
  \[
    \min_{t \le T} \mathbb{E}\norm{\nabla \mathcal{L}(\theta_t)}^2 \le \frac{2(\mathcal{L}(\theta_0) - \mathcal{L}^\star)}{\eta T} + \eta\beta\sigma^2 .
  \]
\end{theorem}

\begin{proof}
  By $\beta$-smoothness, ... which completes the proof.
\end{proof}                         % prints ∎ (QED box) automatically

\begin{proof}[Proof of \cref{thm:conv}]
  ... (custom proof title, common in appendices)
\end{proof}
```

If a proof ends with a display equation, put `\qedhere` inside the equation so the ∎ doesn't sit on its own line.

With `cleveref`, `\cref{thm:conv}` prints "Theorem 3.1" automatically.

Common ML-paper pattern: state the theorem in the main text, then restate it in the appendix with the proof. The `thmtools` / `thm-restate` packages give you `\begin{restatable}{theorem}{convthm} ... \end{restatable}` and then `\convthm*` reprints it in the appendix with the same number.

## 4.9 A notation macro file for ML papers

Many ML papers literally `\input` the [ICLR `math_commands.tex`](https://github.com/goodfeli/dlbook_notation) file (from the *Deep Learning* book) to get consistent notation (`\vx`, `\mW`, `\E`, `\R`, …). A trimmed personal version:

```latex
% macros.tex
\newcommand{\R}{\mathbb{R}}
\newcommand{\E}{\mathbb{E}}
\newcommand{\N}{\mathcal{N}}
\newcommand{\D}{\mathcal{D}}
\newcommand{\loss}{\mathcal{L}}
\newcommand{\vx}{\bm{x}}
\newcommand{\vy}{\bm{y}}
\newcommand{\vtheta}{\bm{\theta}}
\newcommand{\mW}{\mathbf{W}}
\newcommand{\tran}{^{\top}}
\newcommand{\given}{\mid}
\newcommand{\iid}{\stackrel{\text{i.i.d.}}{\sim}}
\DeclarePairedDelimiter{\norm}{\lVert}{\rVert}
\DeclareMathOperator*{\argmin}{arg\,min}
\DeclareMathOperator*{\argmax}{arg\,max}
```

Then `$\vx \in \R^d$, $\mW\tran\vx$, $\E_{\vx \sim \D}[\loss(\vtheta; \vx)]$` stays short and consistent.

## 4.10 Typography habits that separate pros from beginners

1. **Upright text subscripts:** `x_{\text{max}}` not `x_{max}` (italic "max" reads as m·a·x).
2. **Upright operators:** `\log`, `\exp`, `\softmax` via `\DeclareMathOperator`, never plain `log`.
3. **Differential d:** `\mathrm{d}x` with `\,` before it (physics/European) or `dx` (common in US). Be consistent.
4. **`\mid` for conditioning**, `\colon` for maps, `\coloneqq` for definitions (`:=` has bad spacing).
5. **`\ldots` vs `\cdots`** (§4.2).
6. **Don't use math for emphasis or for non-math words.** `$Adam$` is wrong; write `Adam`.
7. **Numbers in text:** `$10^{-3}$` in math; `0.5` as plain text is fine. For units, use `siunitx` (chapter 6): `\SI{3}{\giga\byte}`, `\num{1e-4}`.
8. **Punctuate displays** as part of the sentence.
9. **Number only equations you reference.** Use `align*`/`\nonumber` for the rest (or the `mathtools` option `showonlyrefs`).
10. **Long equations:** break before binary operators (`\\ &\quad + ...`) and align the continuation lines.

## 4.11 Finding a symbol you don't know

- **Detexify** (detexify.kirelabs.org): draw the symbol and it tells you the command and package.
- **The Comprehensive LaTeX Symbol List** (`texdoc symbols-a4`): 200+ pages of every symbol.
- **Overleaf docs → "List of Greek letters and math symbols"**.
- **Mathpix / LLMs**: screenshot an equation from a PDF → LaTeX. Always proofread the output.

## 4.12 Exercise

Typeset the following without looking (answers in the example paper's `sections/method.tex`):

1. The softmax: σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ), numbered, labeled `eq:softmax`.
2. Scaled dot-product attention with `\softmax` as an operator.
3. A 3-line `align` derivation of the gradient of MSE, numbering only the last line.
4. A theorem plus proof using `\qedhere`.
