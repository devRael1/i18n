<p align="center"><a href="https://nodei.co/npm/@devraelfreeze/i18n/"><img src="https://nodei.co/npm/@devraelfreeze/i18n.png" alt=""></a></p>

<div align="center">
<a href="https://github.com/devRael1/i18n/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/devRael1/i18n"></a>
<a href="https://github.com/devRael1/i18n/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/devRael1/i18n"></a>
<a href="https://github.com/devRael1/i18n/blob/master/MIT-LICENCE"><img alt="GitHub license" src="https://img.shields.io/github/license/devRael1/i18n?color=red"></a>
<img alt="npm" src="https://img.shields.io/npm/dw/@devraelfreeze/i18n?color=purple">
<br>
<img alt="npm (tag)" src="https://img.shields.io/npm/v/@devraelfreeze/i18n/latest?color=yellow&label=%40devraelfreeze%2Fi18n">
</div>

# ❓ i18n

Simple and lightweight message localisation.

## 📥 Installation

To install the package, type the following command in your console:
```
npm i @devraelfreeze/i18n
```

## 🛠️ API
| Values | Description |
| :--- | :---: |
| `new I18n(default_locale, locales)` | Create a new I18n instance |
| `default_locale ` | The name of the default locale |
| `locales` | Object of localised messages |

| Values | Description |
| :--- | :---: |
| `i18n.getLocale(locale)` | Get a locale |
| `locale` | Locale name |

Returns a function which calls `getMessage` using the given locale name (or the default).

| Values | Description |
| :--- | :---: |
| `i18n.getMessage(locale, message, ...args)` | Get a message from a specifc `locale`, `message`, `...args` |
| `locale` | Locale name |
| `message` | Dot notation string for the message |
| `...args` | Placeholders / Pluralisation |

## ⬇️ Examples
```js
const I18n = require('@devraelfreeze/i18n');
const i18n = new I18n('english', {
	english: {
		welcome: 'Hello, world'
	},
	french: {
        welcome: 'Bonjour tout le monde'
	}
});

/** Note: you should check if the locale exists in i18n.locales */
const french_i18n = i18n.getLocale('french'); // get locale
console.log(french_i18n('welcome')); // -> 'Bonjour tout le monde'

/** This code does exactly the same */
console.log(i18n.getMessage('french', 'welcome'));
```

## 🐛 Bugs Report

If you have any bugs, feel free to open an issue on [Github Repository](https://github.com/devRael1/i18n)
<br>
### If you want more support, you can contact me on Discord: `devRael#0123`

## 🗃️ Old Versions
If you want to use old version, you can use command
```
npm i @devraelfreeze/discordjs-pagination@<version>
```

## 📝 License
Copyright © 2022 [devRael1](https://github.com/devRael1)
<br>This project is MIT licensed.