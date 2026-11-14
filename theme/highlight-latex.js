// mdBook's bundled highlight.js has no LaTeX grammar, so book.js leaves
// ```latex blocks unhighlighted. Highlight them here after the grammar loads.
document.querySelectorAll('code.language-latex, code.language-tex').forEach(function (block) {
    block.classList.add('hljs');
    hljs.highlightBlock(block);
});
