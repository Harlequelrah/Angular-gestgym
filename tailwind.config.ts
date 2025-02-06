import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./src/**/*.{html,ts}", // Scan tous les fichiers HTML et TypeScript
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'), // Ajout du plugin DaisyUI
    ],
};

export default config;
