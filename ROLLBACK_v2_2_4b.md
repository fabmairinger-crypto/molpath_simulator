# Rollback – v2.2.4b Translation Integration Test – Blocks 01–03

The patch does not migrate or modify save data.

To roll back:

1. Close the patched HTML.
2. Reopen the original baseline file:
   `/mnt/data/molpath_v2_2_4a_translation_quarantine_patch/molpath_simulator_v2_2_4a_translation_quarantine.html`
3. The language selection in local storage can remain; it is compatible with the baseline.

Base SHA-256:
`2af253fa3495dd8f955b005a8c926907aba64e09aa8f33f5f5083cd65ae64341`

The standalone integration script is appended only to the patched HTML. Removing that script and restoring the three small translator call-site changes also restores baseline behavior, but replacing the file is safer.
