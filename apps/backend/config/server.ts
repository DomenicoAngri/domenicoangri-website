module.exports = ({ env }) => ({
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    url: env("PUBLIC_URL", "https://www.domenicoangri.it"),
    app: {
        keys: env.array("APP_KEYS"),
    },
    admin: {
        url: "/admin",
        auth: {
            secret: env("ADMIN_JWT_SECRET"),
        },
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
});
