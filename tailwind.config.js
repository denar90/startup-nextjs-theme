const plugin = require('tailwindcss/plugin');
const themeStyle = require('./content/data/style.json');

module.exports = {
    presets: [require('@stackbit/components/styles/tailwind.default.config.js')],
    theme: {
        extend: {
            colors: {
                body: themeStyle.body,
                headlines: themeStyle.headlines,
                primary: themeStyle.primary,
                'primary-content': themeStyle.primaryContent,
                secondary: themeStyle.secondary,
                'secondary-content': themeStyle.secondaryContent,
                neutral: themeStyle.neutral,
                'neutral-content': themeStyle.neutralContent,
                complementary: themeStyle.complementary,
                'complementary-content': themeStyle.complementaryContent,
                'complementary-alt': themeStyle.complementaryAlt,
                'complementary-alt-content': themeStyle.complementaryAltContent
            },
            fontFamily: {
                body: themeStyle.fontBody,
                headlines: themeStyle.fontHeadlines
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addBase, addComponents, addLayer }) {
            addBase({
                h1: {
                    fontWeight: themeStyle.h1.weight,
                    letterSpacing: themeStyle.h1.letterSpacing,
                    textDecoration: themeStyle.h1.decoration,
                    textTransform: themeStyle.h1.case
                },
                h2: {
                    fontWeight: themeStyle.h2.weight,
                    letterSpacing: themeStyle.h2.letterSpacing,
                    textDecoration: themeStyle.h2.decoration,
                    textTransform: themeStyle.h2.case
                },
                h3: {
                    fontWeight: themeStyle.h3.weight,
                    letterSpacing: themeStyle.h3.letterSpacing,
                    textDecoration: themeStyle.h3.decoration,
                    textTransform: themeStyle.h3.case
                }
            }),
                addComponents({
                    '.sb-component-button-primary': {
                        borderRadius: themeStyle.buttonPrimary.borderRadius,
                        boxShadow: themeStyle.buttonPrimary.shadow,
                        fontWeight: themeStyle.buttonPrimary.weight,
                        letterSpacing: themeStyle.buttonPrimary.letterSpacing,
                        padding: `${themeStyle.buttonPrimary.verticalPadding}px ${themeStyle.buttonPrimary.horizontalPadding}px`,
                        textTransform: themeStyle.buttonPrimary.case
                    },
                    '.sb-component-button-secondary': {
                        borderRadius: themeStyle.buttonSecondary.borderRadius,
                        borderStyle: themeStyle.buttonSecondary.borderStyle,
                        boxShadow: themeStyle.buttonSecondary.shadow,
                        fontWeight: themeStyle.buttonSecondary.weight,
                        letterSpacing: themeStyle.buttonSecondary.letterSpacing,
                        padding: `${themeStyle.buttonSecondary.verticalPadding}px ${themeStyle.buttonSecondary.horizontalPadding}px`,
                        textTransform: themeStyle.buttonSecondary.case
                    }
                });
        })
    ]
};
