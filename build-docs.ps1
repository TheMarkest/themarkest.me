# build-docs.ps1

Write-Host "Checking Node.js version..."
$nodeVersion = node -v
Write-Host "Current Node.js version: $nodeVersion"

# Warning for Node.js version
$majorVersion = [int]($nodeVersion -replace 'v', '').Split('.')[0]
if ($majorVersion -lt 18) {
    Write-Warning "Next.js 15 requires Node.js 18.18.0 or later. Your current version is $nodeVersion."
    Write-Warning "The build might fail. Please upgrade Node.js if it does."
}

Write-Host "Building project..."
# Execute the build command
cmd /c "npm run build"

if ($LASTEXITCODE -eq 0) {
    $blueprintPath = "docs\blueprint.md"
    $hasBlueprint = Test-Path $blueprintPath
    
    if ($hasBlueprint) {
        Write-Host "Backing up blueprint.md..."
        Copy-Item $blueprintPath "blueprint.md.tmp"
    }

    if (Test-Path "docs") {
        Write-Host "Removing old docs folder..."
        Remove-Item -Recurse -Force "docs"
    }
    
    if (Test-Path "out") {
        Write-Host "Moving out to docs..."
        Rename-Item "out" "docs"
        
        if ($hasBlueprint) {
            Write-Host "Restoring blueprint.md..."
            Move-Item "blueprint.md.tmp" "docs\blueprint.md" -Force
        }
        
        # Create .nojekyll just in case Next.js didn't created it (it usually does)
        if (-not (Test-Path "docs\.nojekyll")) {
            New-Item -ItemType File "docs\.nojekyll" | Out-Null
        }

        Write-Host "Build success! Output is in docs/"
    } else {
         Write-Host "Error: 'out' folder not found after build."
    }
} else {
    Write-Host "Build failed using 'npm run build'."
}
