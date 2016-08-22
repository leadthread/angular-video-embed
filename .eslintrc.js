module.exports = {
    "env": {
        "browser": true
    },
    "globals": {
        "angular": true,
        "_": true,
    },
    "extends": "eslint:recommended",
    "rules": {
        "keyword-spacing": [
            "warn",
            {
                "before": true,
                "after": true,
            }
        ],
        "space-before-blocks": [
            "warn", { "functions": "always", "keywords": "always", "classes": "always" }
        ],
        "space-before-function-paren": [
            "warn",
            "always"
        ],
        "brace-style": [
            "warn",
            "1tbs"
        ],
        // "object-curly-newline": [
        //     "error", {
        //     "ObjectExpression": "always",
        //         "ObjectPattern": { "multiline": true }
        //     }
        // ],
        "comma-spacing": [
            "warn", 
            { 
                "before": false, 
                "after": true 
            }
        ],
        "comma-style": [
            "warn",
            "last"
        ],
        "no-alert": [
            "error"
        ],
        "no-mixed-spaces-and-tabs": [
            "error"
        ],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "strict": [
            "error",
            "function"
        ],
        "no-console": [
            "error", { 
                "allow": ["info", "warn", "error"] 
            }
        ]
    }
};