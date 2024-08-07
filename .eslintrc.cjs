module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    extends: [
        "eslint:recommended",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "simple-import-sort",
    ],
    rules: {
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        "for-direction": "warn",
        "getter-return": "warn",
        "no-async-promise-executor": "warn",
        "no-await-in-loop": "off",
        "no-compare-neg-zero": "warn",
        "no-cond-assign": "warn",
        "no-console": "warn",
        "no-constant-condition": "warn",
        "no-control-regex": "warn",
        "no-debugger": "warn",
        "no-dupe-args": "warn",
        "no-dupe-else-if": "warn",
        "no-dupe-keys": "warn",
        "no-duplicate-case": "warn",
        "no-empty": "warn",
        "no-empty-character-class": "warn",
        "no-ex-assign": "warn",
        "no-extra-boolean-cast": "warn",
        "no-extra-parens": "off",
        "no-extra-semi": "off",
        "no-func-assign": "warn",
        "no-import-assign": "warn",
        "no-inner-declarations": "warn",
        "no-invalid-regexp": "warn",
        "no-irregular-whitespace": "warn",
        "no-loss-of-precision": "off",
        "no-misleading-character-class": "warn",
        "no-obj-calls": "warn",
        "no-promise-executor-return": "warn",
        "no-prototype-builtins": "warn",
        "no-regex-spaces": "warn",
        "no-setter-return": "warn",
        "no-sparse-arrays": "warn",
        "no-template-curly-in-string": "warn",
        "no-unexpected-multiline": "warn",
        "no-unreachable": "warn",
        "no-unreachable-loop": "warn",
        "no-unsafe-finally": "warn",
        "no-unsafe-negation": "warn",
        "no-unsafe-optional-chaining": "warn",
        "no-useless-backreference": "off",
        "require-atomic-updates": ["warn", { "allowProperties": true }],
        "use-isnan": "warn",
        "valid-typeof": "warn",

        // Best Practices
        "accessor-pairs": "off",
        "array-callback-return": "warn",
        "block-scoped-var": "warn",
        "class-methods-use-this": "off",
        "complexity": "off",
        "consistent-return": "warn",
        "curly": "off",
        "default-case": "warn",
        "default-case-last": "warn",
        "default-param-last": "off",
        "dot-location": ["warn", "property"],
        "dot-notation": "off",
        "eqeqeq": "warn",
        "grouped-accessor-pairs": "warn",
        "guard-for-in": "warn",
        "max-classes-per-file": "off",
        "no-alert": "warn",
        "no-caller": "warn",
        "no-case-declarations": "warn",
        "no-constructor-return": "warn",
        "no-div-regex": "off",
        "no-else-return": "warn",
        "no-empty-function": "off",
        "no-empty-pattern": "warn",
        "no-eq-null": "warn",
        "no-eval": "warn",
        "no-extend-native": "warn",
        "no-extra-bind": "warn",
        "no-extra-label": "warn",
        "no-fallthrough": "warn",
        "no-floating-decimal": "warn",
        "no-global-assign": "warn",
        "no-implicit-coercion": "warn",
        "no-implicit-globals": "warn",
        "no-implied-eval": "off",
        "no-invalid-this": "off",
        "no-iterator": "warn",
        "no-labels": "warn",
        "no-lone-blocks": "warn",
        "no-loop-func": "off",
        "no-magic-numbers": "off",
        "no-multi-spaces": "off",
        "no-multi-str": "warn",
        "no-new": "warn",
        "no-new-func": "warn",
        "no-new-wrappers": "warn",
        "no-nonoctal-decimal-escape": "warn",
        "no-octal": "warn",
        "no-octal-escape": "warn",
        "no-param-reassign": "warn",
        "no-proto": "warn",
        "no-redeclare": "off",
        "no-restricted-properties": "off",
        "no-return-assign": "warn",
        "no-return-await": "off",
        "no-script-url": "warn",
        "no-self-assign": "warn",
        "no-self-compare": "warn",
        "no-sequences": "warn",
        "no-throw-literal": "off",
        "no-unmodified-loop-condition": "warn",
        "no-unused-expressions": "off",
        "no-unused-labels": "warn",
        "no-useless-call": "warn",
        "no-useless-catch": "warn",
        "no-useless-concat": "warn",
        "no-useless-escape": "warn",
        "no-useless-return": "off",
        "no-void": "warn",
        "no-warning-comments": "warn",
        "no-with": "warn",
        "prefer-named-capture-group": "off",
        "prefer-promise-reject-errors": "warn",
        "prefer-regex-literals": "warn",
        "radix": ["warn", "as-needed"],
        "require-await": "off",
        "require-unicode-regexp": "off",
        "vars-on-top": "warn",
        "wrap-iife": ["warn", "inside"],
        "yoda": ["warn", "never", { "exceptRange": true }],

        // Strict Mode
        "strict": "off",

        // Variables
        "init-declarations": "off",
        "no-delete-var": "warn",
        "no-label-var": "warn",
        "no-restricted-globals": "off",
        "no-shadow": "off",
        "no-shadow-restricted-names": "warn",
        "no-undef": "warn",
        "no-undef-init": "warn",
        "no-undefined": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",

        // Stylistic Issues
        "array-bracket-newline": ["warn", "consistent"],
        "array-bracket-spacing": ["warn", "never", {
            "objectsInArrays": true,
            "arraysInArrays": true
        }],
        "array-element-newline": ["warn", "consistent"],
        "block-spacing": ["warn", "always"],
        "brace-style": "off",
        "camelcase": "off",
        "capitalized-comments": "off",
        "comma-dangle": "off",
        "comma-spacing": "off",
        "comma-style": "warn",
        "computed-property-spacing": ["warn", "never"],
        "consistent-this": "off",
        "eol-last": "warn",
        "func-call-spacing": "off",
        "func-name-matching": ["warn", "always"],
        "func-names": "off",
        "func-style": ["warn", "declaration", {
            "allowArrowFunctions": true
        }],
        "function-call-argument-newline": ["warn", "consistent"],
        "function-paren-newline": ["warn", "multiline"],
        "id-denylist": "off",
        "id-length": "off",
        "id-match": "off",
        "implicit-arrow-linebreak": ["warn", "beside"],
        "indent": "off",
        "jsx-quotes": "warn",
        "key-spacing": ["warn", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "minimum",
        }],
        "keyword-spacing": "off",
        "line-comment-position": "off",
        "linebreak-style": ["warn", "unix"],
        "lines-around-comment": "off",
        "lines-between-class-members": "off",
        "max-depth": "off",
        "max-len": "off",
        "max-lines": "off",
        "max-lines-per-function": "off",
        "max-nested-callbacks": "off",
        "max-params": "off",
        "max-statements": "off",
        "max-statements-per-line": "off",
        "multiline-comment-style": "off",
        "multiline-ternary": ["warn", "always-multiline"],
        "new-cap": "off",
        "new-parens": ["warn", "always"],
        "newline-per-chained-call": ["warn", {
            "ignoreChainWithDepth": 2
        }],
        "no-array-constructor": "off",
        "no-bitwise": "off",
        "no-continue": "off",
        "no-inline-comments": "off",
        "no-lonely-if": "warn",
        "no-mixed-operators": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-multi-assign": "warn",
        "no-multiple-empty-lines": ["warn", {
            "max": 1,
            "maxBOF": 0,
            "maxEOF": 1
        }],
        "no-negated-condition": "off",
        "no-nested-ternary": "off",
        "no-new-object": "warn",
        "no-plusplus": "off",
        "no-restricted-syntax": "off",
        "no-tabs": "warn",
        "no-ternary": "off",
        "no-trailing-spaces": ["warn", {
            "skipBlankLines": true
        }],
        "no-underscore-dangle": "off",
        "no-unneeded-ternary": "warn",
        "no-whitespace-before-property": "warn",
        "nonblock-statement-body-position": ["warn", "beside"],
        "object-curly-newline": ["warn", {
            "multiline": true,
            "minProperties": 3,
            "consistent": true
        }],
        "object-curly-spacing": "off",
        "object-property-newline": ["warn", {
            "allowMultiplePropertiesPerLine": true
        }],
        "one-var": "off",
        "one-var-declaration-per-line": ["warn", "always"],
        "operator-assignment": "off",
        "operator-linebreak": ["warn", "before"],
        "padded-blocks": "off",
        "padding-line-between-statements": "off",
        "prefer-exponentiation-operator": "off",
        "prefer-object-spread": "off",
        "quote-props": ["warn", "consistent"],
        "quotes": "off",
        "semi": "off",
        "semi-spacing": ["warn", {
            "before": false,
            "after": false
        }],
        "semi-style": ["warn", "last"],
        "sort-keys": "off",
        "sort-vars": ["warn", {
            "ignoreCase": true
        }],
        "space-before-blocks": ["warn", "always"],
        "space-before-function-paren": "off",
        "space-in-parens": ["warn", "never"],
        "space-infix-ops": "off",
        "space-unary-ops": ["warn", {
            "words": true,
            "nonwords": false
        }],
        "spaced-comment": ["warn", "always", {
            "block": {
                "balanced": true
            }
        }],
        "switch-colon-spacing": ["warn", {
            "before": false,
            "after": true
        }],
        "template-tag-spacing": ["warn", "never"],
        "unicode-bom": ["warn", "never"],
        "wrap-regex": "warn",

        // ECMAScript 6
        "arrow-body-style": ["warn", "as-needed"],
        "arrow-parens": ["warn", "as-needed"],
        "arrow-spacing": ["warn", {
            "before": true,
            "after": true
        }],
        "constructor-super": "warn",
        "generator-star-spacing": ["warn", {
            "before": false,
            "after": true
        }],
        "no-class-assign": "warn",
        "no-confusing-arrow": ["warn", {
            "allowParens": true
        }],
        "no-const-assign": "warn",
        "no-dupe-class-members": "off",
        "no-duplicate-imports": "off",
        "no-new-symbol": "warn",
        "no-restricted-exports": "off",
        "no-restricted-imports": ["warn", { "patterns": ["src/*"], }],
        "no-this-before-super": "warn",
        "no-useless-computed-key": "warn",
        "no-useless-constructor": "off",
        "no-useless-rename": "warn",
        "no-var": "warn",
        "object-shorthand": ["warn", "consistent"],
        "prefer-arrow-callback": "warn",
        "prefer-const": "warn",
        "prefer-destructuring": "off",
        "prefer-numeric-literals": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "off",
        "prefer-template": "warn",
        "require-yield": "warn",
        "rest-spread-spacing": ["warn", "never"],
        "sort-imports": "off",
        "symbol-description": "warn",
        "template-curly-spacing": ["warn", "never"],
        "yield-star-spacing": ["warn", {
            "before": false,
            "after": true
        }],

        // typescript-eslint Rules
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": ["warn", {
            "default": "array-simple"
        }],
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/ban-ts-comment": ["warn", {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": "allow-with-description",
            "ts-check": "allow-with-description",
            "minimumDescriptionLength": 10,
        }],
        "@typescript-eslint/ban-tslint-comment": "warn",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/class-literal-property-style": "off",
        "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
        "@typescript-eslint/consistent-type-assertions": ["warn", {
            "assertionStyle": "as"
        }],
        "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
        "@typescript-eslint/consistent-type-imports": ["warn", {
            "prefer": "type-imports"
        }],
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-member-accessibility": ["warn", {
            "accessibility": "no-public"
        }],
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/member-delimiter-style": ["warn", {
            "multiline": {
                "delimiter": "semi",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "semi",
                "requireLast": true
            }
        }],
        "@typescript-eslint/member-ordering": "warn",
        "@typescript-eslint/method-signature-style": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-base-to-string": "warn",
        "@typescript-eslint/no-confusing-non-null-assertion": "warn",
        "@typescript-eslint/no-confusing-void-expression": "warn",
        "@typescript-eslint/no-dynamic-delete": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-extra-non-null-assertion": "warn",
        "@typescript-eslint/no-extraneous-class": ["warn", {
            "allowEmpty": true
        }],
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-for-in-array": "warn",
        "@typescript-eslint/no-implicit-any-catch": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-invalid-void-type": "warn",
        "@typescript-eslint/no-misused-new": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/no-namespace": "warn",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "warn",
        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/no-type-alias": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unnecessary-qualifier": "warn",
        "@typescript-eslint/no-unnecessary-type-arguments": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unnecessary-type-constraint": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/non-nullable-type-assertion-style": "warn",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-enum-initializers": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-literal-enum-member": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/prefer-readonly": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/prefer-reduce-type-parameter": "warn",
        "@typescript-eslint/prefer-regexp-exec": "off",
        "@typescript-eslint/prefer-string-starts-ends-with": "warn",
        "@typescript-eslint/prefer-ts-expect-error": "warn",
        "@typescript-eslint/promise-function-async": "warn",
        "@typescript-eslint/require-array-sort-compare": ["warn", {
            "ignoreStringArrays": true
        }],
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/sort-type-union-intersection-members": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        "@typescript-eslint/triple-slash-reference": "warn",
        "@typescript-eslint/type-annotation-spacing": ["warn", {
            "before": false,
            "after": true,
            "overrides": { "arrow": { "before": true, "after": true } }
        }],
        "@typescript-eslint/typedef": "off",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/unified-signatures": "warn",

        // Extension Rules
        "@typescript-eslint/brace-style": ["warn", "1tbs", {
            "allowSingleLine": true
        }],
        "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
        "@typescript-eslint/comma-spacing": ["warn", {
            "before": false,
            "after": true
        }],
        "@typescript-eslint/default-param-last": "warn",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/func-call-spacing": "warn",
        "@typescript-eslint/indent": ["warn", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": "first",
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": {
                "body": 1,
                "parameters": "first"
            },
            "FunctionExpression": {
                "body": 1,
                "parameters": "first"
            },
            "CallExpression": {
                "arguments": "first"
            },
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": "first",
            "flatTernaryExpressions": false,
            "offsetTernaryExpressions": true,
            "ignoreComments": false,
            "ignoredNodes": [
                "FunctionExpression > .params[decorators.length > 0]",
                "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
            ]
        }],
        "@typescript-eslint/init-declarations": "off",
        "@typescript-eslint/keyword-spacing": ["warn", {
            "before": true,
            "after": true
        }],
        "@typescript-eslint/lines-between-class-members": ["warn", "always"],
        "@typescript-eslint/no-array-constructor": "warn",
        "@typescript-eslint/no-dupe-class-members": "warn",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/no-extra-semi": "warn",
        "@typescript-eslint/no-implied-eval": "warn",
        "@typescript-eslint/no-invalid-this": "warn",
        "@typescript-eslint/no-loop-func": "warn",
        "@typescript-eslint/no-loss-of-precision": "warn",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-redeclare": "warn",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-throw-literal": "warn",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/no-useless-constructor": "warn",
        "@typescript-eslint/object-curly-spacing": ["warn", "never", {
            "objectsInObjects": true,
            "arraysInObjects": true
        }],
        "@typescript-eslint/quotes": ["warn", "double", {
            "allowTemplateLiterals": true
        }],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/return-await": "warn",
        "@typescript-eslint/semi": ["warn", "always", {
            "omitLastInOneLineBlock": true
        }],
        "@typescript-eslint/space-before-function-paren": ["warn", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "@typescript-eslint/space-infix-ops": "warn",
    }
}
