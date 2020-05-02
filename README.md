# Mavo Math

To use, either give a class of `mv-math` to the property you want to enable Math on, or specify a file as your data.

The plugin supports TeX/LaTeX commands described [here](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#supported-tex-latex-commands).

## Demo 1

```markup
<div mv-app mv-storage="local"
     mv-plugins="math">
	This is an example of a math expression:
	<div property="math" class="mv-math">
		$$\frac{a}{1-a^2}$$
	</div>
</div>
```

## Demo 2

```markup
<div mv-app
     mv-source="https://dmitrysharabin.github.io/mavo-math/example.tex"
     mv-plugins="math">
	<div property></div>
</div>
```

This plugin supports mathematics in Markdown. To use, include both the Math and the Markdown plugins, and give classes `mv-math` and `markdown` to the property you want to enable this functionality on, or specify a Markdown file as your data.

Mathematics must be marked as code fragments, i.e., enclosed by the backtick (\` \`) character.

## Demo 3

```markup
<div mv-app mv-storage="local"
     mv-plugins="math markdown">
	<div property class="mv-math markdown>
## Markdown + Math

Mavo is awesome. We can even combine **Markdown** with **Math**.

When `\(a \ne 0\)`, there are two solutions to `\(ax^2 + bx + c = 0\)` and they are `$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$`
	</div>
</div>
```

## Advanced customization: Events and Hooks

This plugin adds a [hook](https://mavo.io/docs/plugins/#hooks):

| Name                 | Details                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `math-editor-create` | Allows you to modify the textarea for editing (via `env.editor`) |


For more information, read [the MathJax docs](http://docs.mathjax.org/en/latest/index.html).
