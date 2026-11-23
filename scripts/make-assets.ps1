Set-Location C:\Users\Administrator\Desktop\rocket-website
. .\scripts\img.ps1
$out = "public\hero"; New-Item -ItemType Directory -Force $out | Out-Null
function P($p){ Join-Path (Get-Location) $p }
$png = [System.Drawing.Imaging.ImageFormat]::Png

# 1) Logo: the official lockup from the original billboard (white on purple), as transparent masks, tagline removed
$bb = [Img]::Load((P 'public\original\billboard.jpg'))
$lg = [Img]::Crop($bb, 100, 10, 600, 372)
for ($y = 335; $y -lt $lg.Height; $y++) { for ($x = 122; $x -lt $lg.Width; $x++) { $lg.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(141, 38, 147)) } }
$bgLum = [int](141*0.3 + 38*0.59 + 147*0.11)
foreach ($v in @(@('logo-white', [System.Drawing.Color]::White), @('logo-purple', [System.Drawing.Color]::FromArgb(138,40,143)))) {
  $m = [Img]::WhiteMask($lg, $bgLum, $v[1]); $box = [Img]::AlphaBox($m, 20); $t = [Img]::Crop($m, $box.X, $box.Y, $box.Width, $box.Height)
  $t.Save((P "$out\$($v[0]).png"), $png); "$($v[0]) $($t.Width)x$($t.Height)"
  if ($v[0] -eq 'logo-white') { $script:logoW = $t }
}

# 2) Hand holding a phone: cut out the natural-hand photo, paint a purple Rocket screen over the third-party app screen
$h = [Img]::Load((P '_research\unsplash\cTanNCqGYc4.jpg'))
$c = [Img]::Crop($h, 1443, 980, 4537, 5203); $s = [Img]::ScaleW($c, 1000)
$s = [Img]::Crop($s, 0, 0, 930, $s.Height)
$m = [Img]::Matte($s, 196, 26)
$g = [System.Drawing.Graphics]::FromImage($m); $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
# screen rounded rect (coords from the grid view)
$sx = 374; $sy = 64; $sw = 418; $sh = 906; $r = 60
$gp = New-Object System.Drawing.Drawing2D.GraphicsPath
$gp.AddArc($sx, $sy, $r*2, $r*2, 180, 90); $gp.AddArc($sx+$sw-$r*2, $sy, $r*2, $r*2, 270, 90); $gp.AddArc($sx+$sw-$r*2, $sy+$sh-$r*2, $r*2, $r*2, 0, 90); $gp.AddArc($sx, $sy+$sh-$r*2, $r*2, $r*2, 90, 90); $gp.CloseFigure()
$pA = New-Object System.Drawing.Point -ArgumentList $sx, $sy
$pB = New-Object System.Drawing.Point -ArgumentList ($sx + 60), ($sy + $sh)
$cA = [System.Drawing.Color]::FromArgb(255, 122, 32, 196); $cB = [System.Drawing.Color]::FromArgb(255, 70, 8, 128)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $pA, $pB, $cA, $cB
$g.FillPath($grad, $gp)
# soft light sweep
$pC = New-Object System.Drawing.Point -ArgumentList $sx, $sy
$pD = New-Object System.Drawing.Point -ArgumentList ($sx + $sw), ($sy + 300)
$cC = [System.Drawing.Color]::FromArgb(46, 255, 255, 255); $cD = [System.Drawing.Color]::FromArgb(0, 255, 255, 255)
$sweep = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList $pC, $pD, $cC, $cD
# island
$ip = New-Object System.Drawing.Drawing2D.GraphicsPath; $ix=516;$iy=78;$iw=132;$ih=36
$ip.AddArc($ix,$iy,$ih,$ih,90,180); $ip.AddArc($ix+$iw-$ih,$iy,$ih,$ih,270,180); $ip.CloseFigure(); $g.FillPath([System.Drawing.Brushes]::Black, $ip)
# logo + line
$lw = 268; $lh = [int]($logoW.Height * $lw / $logoW.Width)
$g.DrawImage($logoW, [int]($sx + ($sw-$lw)/2), 340, $lw, $lh)
$font = New-Object System.Drawing.Font('Segoe UI Semibold', 36, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sf = New-Object System.Drawing.StringFormat; $sf.Alignment = 'Center'
$cx = $sx + $sw/2
$g.DrawString("Your", $font, [System.Drawing.Brushes]::White, $cx, 548, $sf)
$g.DrawString("Digital Banking", $font, [System.Drawing.Brushes]::White, $cx, 594, $sf)
$g.DrawString("Partner", $font, [System.Drawing.Brushes]::White, $cx, 640, $sf)
$g.Dispose()
$final = [Img]::ScaleW($m, 800)
$final.Save((P "$out\hand-phone.png"), $png); "hand $($final.Width)x$($final.Height) $([int]((Get-Item (P "$out\hand-phone.png")).Length/1KB))KB"

# 3) Woman with a phone (Unsplash JvKszEBumM0): crop and compress
$w = [Img]::Load((P '_research\unsplash\c-JvKszEBumM0.jpg'))
$wc = [Img]::Crop($w, 0, 600, 4000, 4400); $ws = [Img]::ScaleW($wc, 1000)
[Img]::SaveJpg($ws, (P "$out\woman-phone.jpg"), 82)
"woman $($ws.Width)x$($ws.Height) $([int]((Get-Item (P "$out\woman-phone.jpg")).Length/1KB))KB"
