// @ts-check

/**
 * MathJax plugin for Mavo. Beautiful math in Mavo apps in all browsers
 * @author Dmitry Sharabin and contributors
 * @version 0.1.0
 */

(function ($, $$) {
	"use strict";

	const SELECTOR = ".mv-mathjax, [mv-mathjax-options]";

	// https://docs.mathjax.org/en/latest/options/startup/startup.html#startup-options
	self.MathJax = {
		startup: {
			typeset: false // Don't perform initial typeset
		}
	};

	Mavo.Plugins.register("mathjax", {
		ready: $.include("https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-chtml.js"),

		hooks: {
			"init-start": function () {
				// Disable expressions on Math properties, before expressions are parsed
				for (const element of $$(SELECTOR, this.element)) {
					if (element.matches(Mavo.selectors.primitive)) {
						element.setAttribute(
							"mv-expressions",
							element.getAttribute("mv-expressions") || "none"
						);
					}
				}
			},

			"markdown-render-after": async function (env) {
				// Replace only those code blocks that look like math in the TeX/LaTeX format, i.e.,
				// enclosed by the math delimiters: `$$...$$` and `\[...\]` for displayed mathematics,
				// and`\(...\)` and `$...$` for inline mathematics
				env.html = env.html
					.replace(/(?:<code>)(\\\(|\\\[|\${1,2})(.*?)(\\\)|\\\]|\${1,2})(?:<\/code>)/gm, "$1$2$3");
				await Mavo.Plugins.loaded.mathjax.render(env.element, env.html);
			}
		},

		render: function (element, math, mavo, mathjax = self.MathJax) {
			const env = { element, math };

			if (env.element.mathjaxOptions) {
				const options = env.element.mathjaxOptions;

				if (options.inline && env.math) {
					// Escape a user-specified delimiter because it might be a special character in a regular expression
					const delimiter = `\\${options.inline}`;

					// We want to find math between a user-defined delimiter but not between the doubled one
					const exp = new RegExp(`${delimiter}(?!${delimiter})([^${delimiter}]+?)${delimiter}(?!${delimiter})`, "gm");

					// Replace a user-specified delimiter with the built-in one
					env.math = env.math.replace(exp, "\\($1\\)");
				}
			}

			// Handling Asynchronous Typesetting
			// https://docs.mathjax.org/en/latest/options/index.html#configuring-mathjax
			mathjax.startup.promise = mathjax.startup.promise
				.then(() => {
					env.element.innerHTML = env.math;

					return mathjax.typesetPromise([env.element]);
				})
				.catch((error) =>
					console.error(mavo._("mathjax-typeset-failed", { error }))
				);

			return mathjax.startup.promise;
		}
	});

	Mavo.Elements.register("mathjax", {
		default: true,
		selector: SELECTOR,
		hasChildren: true,
		init: function () {
			const options = this.element.getAttribute("mv-mathjax-options");

			if (options) {
				this.element.mathjaxOptions = Mavo.options(options);
			}
		},
		editor: function () {
			const env = { context: this };

			env.editor = $.create("textarea");
			env.editor.style.whiteSpace = "pre-wrap";

			const width = this.element.offsetWidth;

			if (width) {
				env.editor.width = width;
			}

			Mavo.hooks.run("mathjax-editor-create", env);

			return env.editor;
		},
		done: function () {
			// Has it actually been edited?
			this.preEdit && this.preEdit.then(() => Mavo.Plugins.loaded.mathjax.render(this.element, this.value, this.mavo));
		},
		setValue: function (element, value) {
			if (this.editor) {
				this.editor.value = value;
			} else {
				Mavo.Plugins.loaded.mathjax.render(element, value, this.mavo);
			}
		},
		// We don't need an observer and it actually causes problems as it tries to feed HTML changes back to MathJax
		observer: false
	});

	Mavo.Formats.mathjax = $.Class({
		extends: Mavo.Formats.Base,
		constructor: function (backend) {
			this.property = this.mavo.root.getNames("Primitive")[0];
			const primitive = this.mavo.root.children[this.property];
			primitive.config = Mavo.Elements.mathjax;
		},

		static: {
			extensions: [".tex", ".ltx", ".latex"],
			parse: Mavo.Formats.Text.parse,
			stringify: Mavo.Formats.Text.stringify
		}
	});

	Mavo.Locale.register("en", {
		"mathjax-typeset-failed": "Typeset failed with error {error}"
	});
})(Bliss, Bliss.$);
