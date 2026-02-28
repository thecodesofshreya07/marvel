$ErrorActionPreference = "SilentlyContinue"

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    "Referer" = "https://www.marvel.com/"
}

# Character images now loaded from superhero-api CDN (no local download needed)

# ── Movie posters (TMDB public-domain-style posters) ──
$movies = @{
    "black-panther-film"              = "https://image.tmdb.org/t/p/w300/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
    "infinity-war"                    = "https://image.tmdb.org/t/p/w300/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    "endgame"                         = "https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    "iron-man-film"                   = "https://image.tmdb.org/t/p/w300/78lPtwv72eTNqFW9COBH0PRvN5I.jpg"
    "the-avengers"                    = "https://image.tmdb.org/t/p/w300/cezWGskPY5x7GaglTTRN4Fugfb8.jpg"
    "iron-man-3"                      = "https://image.tmdb.org/t/p/w300/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg"
    "captain-america-first-avenger"   = "https://image.tmdb.org/t/p/w300/vSNxAJTlD0r02V9sPYpOjPkYAPo.jpg"
    "captain-america-civil-war"       = "https://image.tmdb.org/t/p/w300/rAGiXaUfDXY4GJnfpzDPDpXMnSB.jpg"
    "incredible-hulk"                 = "https://image.tmdb.org/t/p/w300/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg"
    "thor-ragnarok"                   = "https://image.tmdb.org/t/p/w300/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
    "iron-man-2"                      = "https://image.tmdb.org/t/p/w300/6WBeq4fCfn7AN33GmEPlkHIAH3K.jpg"
    "black-widow-film"                = "https://image.tmdb.org/t/p/w300/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg"
    "captain-america-winter-soldier"  = "https://image.tmdb.org/t/p/w300/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg"
    "avengers-age-of-ultron"          = "https://image.tmdb.org/t/p/w300/t90Y3G8UGQp0f0DrP60wRu9ffrG.jpg"
    "thor"                            = "https://image.tmdb.org/t/p/w300/prSfAi1xGrhLQNxVSUFh2xbmoU9.jpg"
    "thor-dark-world"                 = "https://image.tmdb.org/t/p/w300/bnY4yRDpS4pELz2ckdU4y8VV4bX.jpg"
    "spider-man-homecoming"           = "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    "spider-man-far-from-home"        = "https://image.tmdb.org/t/p/w300/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg"
    "spider-man-no-way-home"          = "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
}

foreach ($id in $movies.Keys) {
    $url  = $movies[$id]
    $dest = "src\assets\movies\$id.jpg"
    Write-Host "Downloading movie: $id"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -Headers $headers -TimeoutSec 15
        Write-Host "  OK: $dest"
    } catch {
        Write-Host "  FAILED: $id — $_"
    }
}

Write-Host "`nAll done!"
