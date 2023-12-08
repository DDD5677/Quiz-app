import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import { box, text, editor } from './CreateQuizView.vue';

export function renderMath() {
box?.textContent = text.value;
renderMathInElement(editor.value, {
// customised options
// • auto-render specific keys, e.g.:
delimiters: [
{ left: '$$', right: '$$', display: true },
{ left: '$', right: '$', display: false },
{ left: '\\(', right: '\\)', display: false },
{ left: '\\[', right: '\\]', display: true }
],
// • rendering keys, e.g.:
throwOnError: false
});
// katex.render(this.changeText, this.$refs.box, {
// 	throwOnError: false,
// 	displayMode:this.display
// });
}
