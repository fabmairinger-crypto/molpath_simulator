# Apply Turkish locale patch

Base required: **MolPath Simulator v2.5.0b + completed RU patch**.

Copy the patch contents into the application root, preserving paths:
- replace `i18n/languages.js`
- add `i18n/tr.js`

No `index.html` edit is required. The central language registry bootstraps registered locale files automatically.

Before applying, the completed RU base is expected to contain:
- `i18n/languages.js` SHA-256 `be060aadde42f195fc64fced55276be8688564c2d329469c3399cb4f9ac25715`
- `i18n/core.js` SHA-256 `aa89ac9a131b342d174ad84e6d4d82f942937de207eaa8de1c7446c0b3f5b0f1`
- `i18n/ru.js` SHA-256 `8a2d3d1bed1f55a4117b832ad6032dcd056943c06bb27d1aa9f5873188590d79`
