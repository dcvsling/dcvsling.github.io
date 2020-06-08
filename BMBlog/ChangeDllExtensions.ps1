param([string]$filepath,[string]$tfm)
dir ..\dist\wwwroot\_framework\_bin | rename-item -NewName { $_.name -replace ".dll\b",".dll" }
((Get-Content ..\dist\wwwroot\_framework\blazor.boot.json -Raw) -replace '.dll"','.dll"') | Set-Content ..\dist\wwwroot\_framework\blazor.boot.json
Remove-Item ..\dist\wwwroot\_framework\blazor.boot.json.gz
((Get-Content ..\dist\wwwroot\service-worker-assets.js -Raw) -replace '.dll"','.dll"') | Set-Content ..\dist\wwwroot\service-worker-assets.js