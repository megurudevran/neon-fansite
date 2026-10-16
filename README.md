# Neon — VALORANT hayran sitesi (Django)

Elektrik ve hız temalı, Türkçe, responsive bir Neon karakter tanıtım sitesi.
Backend: Django · Frontend: HTML/CSS/JS · Animasyon: GSAP + ScrollTrigger (projede yerel olarak, internetsiz çalışır).
Veritabanı gerekmez.

## Windows PowerShell ile kurulum

Python 3.10 veya üstü kurulu olmalı (`python --version` ile kontrol edin).

```powershell
cd neon-fansite
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py fetch_neon_assets
python manage.py runserver
```

Tarayıcıda şu adresi açın: http://127.0.0.1:8000/

`Activate.ps1` "çalıştırma devre dışı" hatası verirse bir kez şunu çalıştırıp tekrar deneyin:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Görseller

`python manage.py fetch_neon_assets` komutu, Neon'un tam boy çizimini, portresini, arka planını ve yetenek ikonlarını
[valorant-api.com](https://valorant-api.com) üzerinden `static/images/` klasörüne indirir.
Bu komut çalıştırılmazsa site yine açılır; Neon görselinin yerinde yıldırım çizimi (`fallback-neon.svg`) görünür.

- Kendi GIF/WebP animasyonlarınızı `static/gifs/` klasörüne atın; galeriye otomatik eklenir.
- `static/images/` içine eklediğiniz her görsel (adı `ability-`, `fallback`, `neon-icon`, `neon-background` ile başlamayan) galeride görünür.
- `static/videos/` ve `static/gifs/` içindeki medya dosyaları bu depoda paylaşılır; yalnızca size ait veya paylaşma izniniz olan dosyaları ekleyin.
- Yetenek ikonları `ability-c.png`, `ability-q.png`, `ability-e.png`, `ability-x.png` adlarıyla aranır.
  İndirme sırasında komut hangi yeteneğin hangi tuşa eşlendiğini yazdırır; yanlışsa dosya adlarını değiştirin.

## Yetenek videoları

Yetenekler bölümünde ikona tıklayınca sağdaki videoda ilgili yetenek oynar. Videoları `static/videos/` klasörüne koyun.
Dosya adı şunlardan biri olabilir (`.mp4` veya `.webm`, büyük/küçük harf fark etmez):

```
pil.mp4         (Pil)         ya da pasif.mp4
fast-lane.mp4   (Fast Lane)   ya da ability-c.mp4
relay-bolt.mp4  (Relay Bolt)  ya da ability-q.mp4
high-gear.mp4   (High Gear)   ya da ability-e.mp4
overdrive.mp4   (Overdrive)   ya da ability-x.mp4
```

Adlar farklıysa `fan/content.py` içindeki `aliases` listesine kendi dosya adınızı ekleyin. Video bulunamazsa o yetenekte bir uyarı görünür.
Sayfayı yenilemeniz yeterli, sunucuyu yeniden başlatmanız gerekmez.

## İçeriği düzenleme

Tüm metinler `fan/content.py` içinde: bilgi kartları, yetenekler, hikâye, istatistikler, footer (site sahibi adı, e-posta, yıl).
Gerçek ad doğrulanmış olarak biliniyorsa `REAL_NAME` değerini doldurun; kartlarda görünür.

## Proje yapısı

```
config/            Django ayarları, URL, WSGI/ASGI
fan/               Uygulama: view, içerik, indirme komutu
templates/         base.html, index.html, _icon.html
static/css/        style.css
static/js/         main.js, vendor/ (GSAP, ScrollTrigger)
static/images/     Görseller
static/gifs/       GIF / animasyonlu WebP
```

## Üretim ortamı

```powershell
$env:DJANGO_DEBUG = "0"
$env:DJANGO_SECRET_KEY = "uzun-rastgele-bir-deger"
$env:DJANGO_ALLOWED_HOSTS = "alanadiniz.com"
python manage.py collectstatic --noinput
```

Statik dosyalar WhiteNoise ile sunulur. `.env.example` dosyasını `.env` olarak kopyalayarak da değer verebilirsiniz.
`DEBUG=0` iken `DJANGO_SECRET_KEY` tanımlı değilse uygulama bilerek başlamaz.

## Kaynaklar ve telif

- Karakter bilgileri: [Riot Games resmî Neon sayfası](https://playvalorant.com/tr-tr/agents/neon/)
- Görseller: [valorant-api.com](https://valorant-api.com) (topluluk API'si; görseller Riot Games'e aittir)
- Resmî logo ve çizimler için: [VALORANT Asset Kit](https://playvalorant.com/en-us/news/game-updates/valorant-asset-kit/) — kullanım koşullarını okuyun
- Animasyon: [GSAP](https://gsap.com) (GreenSock standart lisansı: https://gsap.com/standard-license)
- Tasarım ilhamı: [valorant-redesign](https://github.com/mehedihasanshefat/valorant-redesign) (kod kopyalanmadı)
- Yazı tipleri: Teko ve Barlow (Google Fonts, SIL Open Font License)

VALORANT ve Riot Games, Riot Games, Inc.'in ticari markalarıdır. Bu site Riot Games tarafından onaylanmamıştır.
Ticari amaçla kullanmayın ve yayına almadan önce Riot Games'in
[Legal Jibber Jabber](https://www.riotgames.com/en/legal) politikasını okuyun.
