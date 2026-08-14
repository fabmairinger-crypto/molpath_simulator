@echo off
setlocal
cd /d "%~dp0"
if not exist "assets\mtb_crc_001" (
  echo ERROR: assets\mtb_crc_001 not found. Run this file from the patched v3 folder.
  exit /b 1
)
for %%F in (
  "assets\mtb_crc_001\biomarker_board_pending_001.png"
  "assets\mtb_crc_001\biomarker_dashboard_001.png"
  "assets\mtb_crc_001\braf_variant_view_001.png"
  "assets\mtb_crc_001\msi_profile_001.png"
) do (
  if exist %%F del /q %%F
)
echo Obsolete MTB_CRC_001 assets removed.
endlocal
