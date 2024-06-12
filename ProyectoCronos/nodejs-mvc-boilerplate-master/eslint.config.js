import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        // your configuration here
        ignores: ["!src/",

                  "!src/database/",
                  "!src/lib/",
                  "!src/models/",
                  "!src/config/",
                  "!src/controllers/",
                  "!src/public/",
                  "src/public/assets",
                  "src/public/css",
                  "src/public/img",
                  "!src/public/js",
                  "!src/public/scripts",
                  "!src/route/",
                  "!src/views/",
                  "!src/route/",
                  // "src/Front.js"
        ]
    }
];