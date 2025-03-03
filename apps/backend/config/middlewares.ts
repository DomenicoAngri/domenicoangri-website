export default [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    {
        name: "strapi::cors",
        config: {
            enabled: true,
            headers: ["Content-Type", "Authorization", "X-Frame-Options", "Origin", "Accept", "Cache-Control", "Pragma", "Expires"],
            origin:
                process.env.NODE_ENV === "production"
                    ? ["https://domenicoangri.it", "https://www.domenicoangri.it"]
                    : ["http://localhost:5173", "http://127.0.0.1:5173"],

            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
            keepHeaderOnError: true,
        },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
