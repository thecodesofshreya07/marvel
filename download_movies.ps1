$ErrorActionPreference = "SilentlyContinue"
$headers = @{ "User-Agent" = "Mozilla/5.0" }

$movies = @{
    "black-panther-film"             = "https://upload.wikimedia.org/wikipedia/en/4/4b/Black_Panther_%28film%29_poster.jpg"
    "infinity-war"                   = "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg"
    "endgame"                        = "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"
    "iron-man-film"                  = "https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg"
    "the-avengers"                   = "https://upload.wikimedia.org/wikipedia/en/8/8a/Avengers_2012_film_poster.jpg"
    "iron-man-3"                     = "https://upload.wikimedia.org/wikipedia/en/1/18/Iron_Man_3_poster.jpg"
    "captain-america-first-avenger"  = "https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America%2C_The_First_Avenger_poster.jpg"
    "captain-america-civil-war"      = "https://upload.wikimedia.org/wikipedia/en/d/d9/Captain_America_Civil_War_poster.jpg"
    "incredible-hulk"                = "https://upload.wikimedia.org/wikipedia/en/4/4b/Incredible_Hulk_film_poster.jpg"
    "thor-ragnarok"                  = "https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg"
    "iron-man-2"                     = "https://upload.wikimedia.org/wikipedia/en/e/ed/Iron_Man_2_poster.jpg"
    "black-widow-film"               = "https://upload.wikimedia.org/wikipedia/en/6/67/Black_Widow_%282021_film%29_poster.jpg"
    "captain-america-winter-soldier" = "https://upload.wikimedia.org/wikipedia/en/b/b9/Cap_AmericaTheWinterSoldier.jpg"
    "avengers-age-of-ultron"         = "https://upload.wikimedia.org/wikipedia/en/1/1b/Avengers_Age_of_Ultron.jpg"
    "thor"                           = "https://upload.wikimedia.org/wikipedia/en/f/fc/Thor_%282011_film%29_poster.jpg"
    "thor-dark-world"                = "https://upload.wikimedia.org/wikipedia/en/0/0f/Thor_The_Dark_World_poster.jpg"
}

foreach ($id in $movies.Keys) {
    $url  = $movies[$id]
    $dest = "src\assets\movies\$id.jpg"
    Write-Host "Downloading: $id"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -Headers $headers -TimeoutSec 20 -UseBasicParsing
        $size = (Get-Item $dest).Length
        if ($size -lt 5000) { Remove-Item $dest; Write-Host "  TOO SMALL (likely error page), skipped" }
        else { Write-Host "  OK ($([math]::Round($size/1KB))KB)" }
    } catch {
        Write-Host "  FAILED: $_"
    }
}
Write-Host "All done!"
