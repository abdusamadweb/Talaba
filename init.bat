@echo off
set SERVER=62.113.58.42
set USERNAME=root
set PASSWORD=57246Abs
set LOCAL_DIR="C:\Users\user\Documents\Front-end\Talaba\Talaba"
set REMOTE_DIR=/var/www/talaba-portal.uz/html/
set ARCHIVE_PATH="C:\Users\user\Documents\Front-end\Talaba\Talaba\dist.tar.gz"


@REM vite build
REM node_modules papkasini chetlab o‘tib arxiv yaratish
tar --exclude=".idea" --exclude=".vscode"  --exclude=".git" --exclude="init.bat"  -czvf %ARCHIVE_PATH% -C "C:\Users\user\Documents\Front-end\Talaba\Talaba\dist" .


echo Starting SCP upload...



REM SCP orqali arxivni yuklash
scp %ARCHIVE_PATH% %USERNAME%@%SERVER%:%REMOTE_DIR%

echo Files uploaded. Extracting on server and starting project...

REM SSH orqali serverda arxivni ochish va `node index.js` buyrug'ini ishga tushirish
ssh %USERNAME%@%SERVER% "cd %REMOTE_DIR% && tar -xzvf dist.tar.gz && rm dist.tar.gz"
@REM
echo Project started on server.
pause
