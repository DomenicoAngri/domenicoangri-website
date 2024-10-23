/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                custom: ["inconsolata"],
            },
            colors: {
                // primary: "#1c3a51",
                //primary: "#283a4f",
                //primary: "#353f4c",
                primary: "#21374a",
                secondary: "#d9e2ec",
                accent: "#e78392",
            },
        },
    },

    plugins: [],
};
