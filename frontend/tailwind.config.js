/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["inconsolata", "sans-serif"],
            },
            colors: {
                primary: "#283a4f",
                secondary: "#d9e2ec",
                accent: "#e78392",
            },
        },
    },

    plugins: [],
};
