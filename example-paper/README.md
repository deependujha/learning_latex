# Example paper

A small paper project that uses most of what the course covers: a split-file layout, notation macros, a TikZ figure, subfigures, `booktabs` tables, an algorithm box, a restatable theorem with its proof in the appendix, `siunitx`, `mhchem`, natbib citations and `cleveref`.

```
example-paper/
├── main.tex              # preamble + document skeleton
├── macros.tex            # notation, theorem envs, helpers
├── sections/
│   ├── intro.tex
│   ├── method.tex        # also contains the chapter 4 exercise answers
│   ├── experiments.tex
│   └── appendix.tex
├── figures/
│   └── architecture.tex  # TikZ, \input'ed directly (no image files needed)
├── refs.bib
├── .latexmkrc
└── .gitignore
```

## Build

```bash
cd example-paper
latexmk -pdf main.tex        # one-off build
latexmk -pdf -pvc main.tex   # rebuild on every save
latexmk -C                   # clean up
```

Or zip the folder and use **Overleaf → New Project → Upload Project**.

With **BasicTeX** instead of full MacTeX, you may need:

```bash
sudo tlmgr install latexmk siunitx mhchem chemgreek thmtools tcolorbox pgf \
  multirow algorithmicx enumitem cleveref xcolor psnfss
```

## Things to try

1. Rename the method in `macros.tex` and watch every mention change.
2. Hide all TODO and comment notes by uncommenting the `\renewcommand` lines in `macros.tex`.
3. Switch natbib from `numbers` to `authoryear` in `main.tex`, and see how `\citet` and `\citep` change.
4. Delete `\label{fig:arch}` and look at the warnings and the `??` in the PDF.
5. Move `\label` *before* `\caption` in a figure and see what `\cref` prints.
6. Replace the placeholder boxes in `experiments.tex` with real matplotlib PDFs.
