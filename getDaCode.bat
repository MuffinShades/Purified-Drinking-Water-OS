rem Get da Code
@echo off
DEL /F "\App"
@RD /S /Q "\App"
call git clone https://github.com/MuffinShades/PurifiedDrinkingWater.git
exit
pause