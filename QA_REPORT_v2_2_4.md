# QA Report v2.2.4

## Scope
Clean additive translation patch on top of v2.2.3. No application, case, scoring, course, report or render logic replaced.

## Translation block
- Menu/sidebar/filter/cart/order-form vocabulary
- Ovar two-round cart/phase hints
- Case-library metadata: 91 case titles, 18 subdomains and 88 core-decision labels
- Languages: EN, RO, EL, ES, FR
- Added dictionary pairs: 803

## Structural checks
- Source baseline: v2.2.3 clean translation rebuild
- Script blocks syntax-checked with Node
- Case engine code unchanged
- No literal closing script tags inside the appended patch payload
