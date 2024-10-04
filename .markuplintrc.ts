import type { Config } from '@markuplint/ml-config';

const config: Config = {
  extends: ['markuplint:recommended'],
  parser: {
    '\\.astro$': '@markuplint/astro-parser',
  },
  rules: {
    'wai-aria': true,
    'label-has-control': false,
    'deprecated-element': true,
    'landmark-roles': false,
    'placeholder-label-option': true,
    'no-use-event-handler-attr': false,
    'require-datetime': true,
    'character-reference': true,
    'class-naming': false,
    'require-accessible-name': true,
    'no-default-value': false,
    'use-list': false,
    'case-sensitive-attr-name': false,
    'case-sensitive-tag-name': false,
    'disallowed-element': true,
    'attr-duplication': true,
    'no-empty-palpable-content': false,
    'no-hard-code-id': false,
    'required-attr': true,
    'end-tag': false,
    'required-h1': true,
    'no-boolean-attr-value': false,
    'id-duplication': true,
    doctype: 'always',
    'no-refer-to-non-existent-id': true,
    'deprecated-attr': true,
    'ineffective-attr': false,
    'permitted-contents': true,
    'attr-value-quotes': false,
    'required-element': true,
    'invalid-attr': {
      options: {
        allowAttrs: [
          {
            name: '{...rest}',
            value: {
              type: 'RegExp',
            },
          },
        ],
      },
    },
  },
  // pretenders: [
  //   {
  //     selector: 'Head',
  //     as: {
  //       element: 'head',
  //       inheritAttrs: true,
  //       attrs: [
  //         {
  //           name: 'title',
  //           value: '',
  //         },
  //       ],
  //     },
  //   },
  // ],
  excludeFiles: ['./public/catalog/*', '**/dist/**/*'],
};

export default config;
