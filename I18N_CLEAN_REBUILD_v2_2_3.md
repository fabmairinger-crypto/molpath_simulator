# i18n Clean Rebuild Audit – v2.2.3

The clean build uses the working v2.2.1 HTML as the sole application baseline. The broken v2.2.2 HTML is not used as a source. Only translations with complete EN/RO/EL/ES/FR values are imported from the v2.2.2 message catalog.

- Existing foundation entries per target language: 105
- Imported entries per target language: 347
- Resulting entries per target language: 452
- Import mechanism: one isolated post-load `Object.assign` per language
- Main application script modified: no
- Stable DOM reserialized: no
