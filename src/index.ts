/**
 * @module @devraelfreeze/i18n
 * @author devRael <devrael1@protonmail.com>
 * @copyright 2022 devRael1
 * @license MIT
 */

interface NamedArgs {
    [name: string]: string | number
}

type MessageArgs = (string | number | NamedArgs)[]

type Message = string[] | string;

interface Messages {
    [message: string]: Messages | Message
}

interface Locales {
    [locale: string]: Messages
}

class I18n {
    public default_locale: string;
    public readonly locales: string[];
    private readonly messages: Locales;

    /**
     * Create a new I18n instance
     * @param {string} default_locale - The name of the default locale
     * @param {Locales} locales - An object of your locales
     */
    constructor(
        default_locale: string,
        locales: Locales
    ) {
        if (typeof default_locale !== 'string') {
            throw new TypeError(`Expected "default_locale" to be a string, got ${typeof default_locale}`);
        }

        if (typeof locales !== 'object') {
            throw new TypeError(`Expected "locales" to be an object, got ${typeof locales}`);
        }

        /**
         * The name of the default locale
         * @type {string}
         */
        this.default_locale = default_locale;

        /**
         * An array of locales
         * @type {string[]}
         */
        this.locales = Object.keys(locales);

        /**
         * Messages from all locales
         * @type {any}
         */
        this.messages = locales;

        if (!this.locales.includes(this.default_locale))
            throw new Error(`The default locale "${default_locale}" does not exist`);
    }

    /**
     * Get a locale
     * @param {string} [locale] - The locale to get
     * @returns {(message: string, ...args: MessageArgs) => string | undefined}
     */
    public getLocale(
        locale: string | undefined = this.default_locale
    ): (message: string, ...args: MessageArgs) => string | undefined {
        return (message: string, ...args: MessageArgs) => this.getMessage(locale, message, ...args);
    }

    /**
     * Get a message from a locale
     * @param {string} [locale] - The locale to get the message from
     * @param {string} message - The message to get
     * @param {MessageArgs} args - Placeholder values
     * @returns {string|undefined}
     */
    public getMessage(
        locale: string | undefined = this.default_locale,
        message: string,
        ...args: MessageArgs
    ): string | undefined {
        // fallback to default locale if provided one is an empty string
        locale ||= this.default_locale;

        if (!this.locales.includes(locale)) throw new Error(`A locale with the name of "${locale}" does not exist`);

        // || instead of ?? as empty strings should fallback
        let text = I18n.resolve(this.messages[locale], message) || I18n.resolve(this.messages[this.default_locale], message);

        if (!text) return undefined;

        if (!args && typeof text === 'string') return text;
        else if (!args) throw new Error(`"${message}" is an array and a number was not provided.`);

        if (text instanceof Array) {
            const number = args.shift();
            switch (number) {
                case 0:
                    text = text[text.length === 3 ? 0 : 1];
                    break;
                case 1:
                    text = text[text.length === 3 ? 1 : 0];
                    break;
                default:
                    text = text[text.length === 3 ? 2 : 1];
            }
        } else if (typeof text === 'object') {
            throw new Error(`"${message}" in the "${locale}" locale is not an array or string`);
        }

        if (typeof args[0] === 'object') {
            const regex = /(?<!\\){{1,2}\s?([A-Za-z0-9\-._:]+)\s?(?<!\\)}{1,2}/gi;
            const data: NamedArgs = args[0];
            return text.replace(regex, ($: string, $1: string): string | undefined => {
                const value = <string>I18n.resolve(data, $1);
                return value === undefined ? $ : value;
            });
        } else {
            const regex = /(?<!\\)%([ds])/gi;
            let i = 0;
            return text
                .replace(regex, () => <string>args[i++]);
        }
    }

    /**
     * Resolve a value from an object using a dot notation string
     * @param {Messages|MessageArgs} obj - The object containing the value
     * @param {string} key - The dot notation string
     * @returns {string|string[]|undefined}
     */
    private static resolve(
        obj: Messages | MessageArgs | NamedArgs,
        key: string
    ): string | string[] | undefined {
        return key
            .split(/\./g)
            .reduce((acc, part) => acc && acc[part], obj);
    }

}

module.exports = I18n;