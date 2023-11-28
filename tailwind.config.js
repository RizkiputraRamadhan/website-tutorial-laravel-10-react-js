import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },


    daisyui: {
        themes: [
          {
              mytheme: {

                  "primary": "#facc15",

                  "secondary": "#9ee283",

                  "accent": "#f3f4f6",

                  "neutral": "#131320",

                  "base-100": "#f3f4f6",

                  "info": "#7197d6",

                  "success": "#46ddbf",

                  "warning": "#e08906",

                  "error": "#ec4b73",
              },
          },
        ],
      },

    plugins: [forms, require("daisyui")],
};
