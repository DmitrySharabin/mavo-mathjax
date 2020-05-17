# Mavo Math

To use, either give a class of `mv-math` to the property you want to enable Math on, or specify a file as your data.

## Basic Usage

To put mathematics in your app, you can use [TeX](https://en.wikipedia.org/wiki/TeX) and [LaTeX](https://en.wikipedia.org/wiki/LaTeX) notation. Mathematics is indicated using *math delimiters* that surround the mathematics, telling the plugin what part of your page represents mathematics and what is normal text. There are two types of equations: ones that occur within a paragraph (*in-line mathematics*), and larger equations that appear separated from the rest of the text on lines by themselves (*displayed mathematics*). The default math delimiters are `$$...$$` and `\[...\]` for displayed mathematics, and `\(...\)` for in-line mathematics.

**Note:** The `$...$` in-line delimiters are not used by default. That is because dollar signs appear too often in non-mathematical expressions, which could cause some text to be treated as mathematics unexpectedly. If you want to use single dollar signs for in-line math mode, you can enable that mode explicitly via the `mv-math-options` attribute, like so: `mv-math-options="inline: $"`. If you use this attribute, you can omit the `mv-math` class from your element, it's not needed.

You can find the list of TeX/LaTeX commands supported by the plugin [here](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#supported-tex-latex-commands).

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
	<div property mv-math-options="inline: $"></div>
</div>
```

This plugin supports mathematics in Markdown. To use, include both the [Math](https://plugins.mavo.io/plugin/math) and the [Markdown](https://plugins.mavo.io/plugin/markdown) plugins, and give classes `mv-math` and `markdown` to the property you want to enable this functionality on, or specify a Markdown file as your data.

Mathematics must be marked as code fragments, i.e., enclosed by the backtick (\` \`) character.

## Demo 3

```markup
<div mv-app mv-storage="local"
     mv-plugins="math markdown">
	<div property="md" class="mv-math markdown">
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

## Localization

In case of an error, while typesetting math, the plugin writes a warning in English about that to the console. You can localize that warning message into a different language.

Here is the `id` of the phrase to change/localize and its default value:

| id                    | Default Value                     |
| --------------------- | --------------------------------- |
| `math-typeset-failed` | Typeset failed with error {error} |

## Further explorations

You can find more information about the features supported by the MathJax library in [the official docs](http://docs.mathjax.org/en/latest/index.html).
