@echo off
rem Get da Code
DEL /F "\Purified-Drinking-Water-OS"
@RD /S /Q "\Purified-Drinking-Water-OS"
call git clone https://github.com/MuffinShades/Purified-Drinking-Water-OS.git
exit
pause