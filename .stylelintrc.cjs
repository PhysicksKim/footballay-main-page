module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    "max-nesting-depth": [
      5,
      {
        ignore: ["pseudo-classes"],
      },
    ],
    "selector-class-pattern": [
      // lowercase와 숫자, `-` 허용, __, -- 패턴
      "^[a-z0-9]+(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$",
      {
        message:
          "CSS 클래스는 BEM 규칙(block__element--modifier)을 따라야 합니다.",
      },
    ],
    "scss/selector-no-redundant-nesting-selector": true,
    "selector-max-id": 1,
    "order/order": [
      [
        "custom-properties",
        "dollar-variables",
        "declarations",
        {
          type: "at-rule",
          name: "include",
        },
        {
          type: "at-rule",
          name: "extend",
        },
        {
          type: "rule",
          selector: "&:hover",
        },
        {
          type: "rule",
          selector: "&:focus",
        },
        "rules",
      ],
    ],
    "order/properties-alphabetical-order": true,
    "block-no-empty": true,
    "no-duplicate-selectors": true,
    "at-rule-empty-line-before": [
      "always",
      {
        except: [
          "first-nested",
          "after-same-name",
          "blockless-after-blockless",
        ],
        ignore: ["after-comment"],
      },
    ],
    "scss/dollar-variable-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "SCSS 변수는 kebab-case(`$main-color`) 형식이어야 합니다.",
      },
    ],
    "scss/at-mixin-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
      {
        message: "Mixin 이름은 kebab-case(`mixin-foo-bar`) 형식이어야 합니다.",
      },
    ],
  },
};
