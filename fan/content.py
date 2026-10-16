"""Sitenin tüm metinleri burada. Değiştirmek için sadece bu dosyayı düzenleyin."""

OFFICIAL_URL = "https://playvalorant.com/tr-tr/agents/neon/"
VALORANT_URL = "https://playvalorant.com/tr-tr/"

# Doğrulanmış gerçek adı biliyorsanız buraya yazın; yazılırsa bilgi kartlarında görünür.
REAL_NAME = None

PROFILE = [
    {"label": "Ajan", "value": "Neon"},
    {"label": "Rol", "value": "Düellocu"},
    {"label": "Köken", "value": "Filipinler"},
    {"label": "Güç", "value": "Biyo-elektrik"},
    {"label": "Oyun tarzı", "value": "Hız ve baskı"},
]

TAGLINE = "Vücudunun ürettiği elektriği, üretildiği hızda boşaltan Filipinli ajan."

# Videolar static/videos/ içinde "slug" ile aranır (örn. fast-lane.mp4 ya da ability-c.mp4).
ABILITIES = [
    {"key": "", "slug": "pil", "aliases": ["pil", "pasif", "passive", "battery", "ability-p"], "name": "Pil", "icon": "battery",
     "short": "Zamanla pasif olarak yakıt yeniler."},
    {"key": "C", "slug": "fast-lane", "aliases": ["fast-lane", "fastlane", "ability-c"], "name": "Fast Lane", "icon": "wall",
     "short": "İki enerji hattı fırlatır; hatlar görüşü kesen, hasar veren elektrik duvarlarına dönüşür."},
    {"key": "Q", "slug": "relay-bolt", "aliases": ["relay-bolt", "relaybolt", "ability-q"], "name": "Relay Bolt", "icon": "bolt",
     "short": "Bir kez seken yıldırım fırlatır; çarptığı yüzeydeki oyuncuları sersemletir."},
    {"key": "E", "slug": "high-gear", "aliases": ["high-gear", "highgear", "ability-e"], "name": "High Gear", "icon": "run",
     "short": "Koşu hızını anında artırır; enerji doluyken kayma hamlesi yapılır."},
    {"key": "X", "slug": "overdrive", "aliases": ["overdrive", "ultimate", "ability-x"], "name": "Overdrive", "icon": "beam",
     "short": "Silahı yıldırım huzmesine dönüşür; öldürmeler süreyi uzatır."},
]

STORY_INTRO = (
    "Neon'un hikâyesi bir hızdan ibaret değil; o hızı taşıyabilen bir bedenin hikâyesi. "
    "Aşağıdaki özet, resmî ajan tanıtımının çizdiği genel çerçeveye dayanır. "
    "Ayrıntılı ve güncel kurgu için resmî ajan sayfasına bakın."
)

TIMELINE = [
    {
        "title": "Manila'dan yola çıkış",
        "text": "Neon, Filipinler'den gelen bir ajan. Enerjisi ve temposu, çıktığı şehrin yoğun ritmini akla getirir.",
    },
    {
        "title": "Bedenin ürettiği elektrik",
        "text": "Gücü biyo-elektrik: vücudu elektrik üretiyor ve Neon bunu üretildiği hızda boşaltıyor. Hızı, bu gücü tutmak yerine akıtmayı seçmesinden doğuyor.",
    },
    {
        "title": "VALORANT Protokolü",
        "text": "Neon, Radyant enerjisinin etrafında şekillenen çatışmada Protokol'ün ajanlarından biri olarak yer alıyor.",
    },
    {
        "title": "Sahada Düellocu",
        "text": "Takımın önünde alan açan, rakibi hızıyla şaşırtan bir Düellocu: duvarlarla görüşü keser, sersemletir, sonra Overdrive ile kapatır.",
    },
]

CLOSING = (
    "VALORANT, Riot Games'in taktiksel nişancı oyunu. Neon, bu evrenin en hızlı ajanlarından biri. "
    "Bu site bir hayran çalışmasıdır; ajanın tüm resmî bilgileri ve en güncel hâli Riot Games'in sayfasındadır."
)

FOOTER = {
    "owner": "Site sahibi adı",
    "year": 2026,
    "contact_label": "İletişim",
    "contact_url": "mailto:ornek@eposta.com",
    "disclaimer": (
        "Bu site Riot Games tarafından onaylanmamıştır ve Riot Games ya da VALORANT'ı yapan veya yöneten "
        "kişilerin görüş ve fikirlerini yansıtmaz. VALORANT ve Riot Games, Riot Games, Inc.'in ticari markalarıdır."
    ),
}

# Galeri başlıkları (dosya adı → görünen başlık). Listede olmayan dosyalar adından başlık alır.
GALLERY_TITLES = {
    "neon-full.png": "Neon, tam boy çizim",
    "neon-bust.png": "Neon, portre",
    "neon-background.png": "Ajan arka planı",
    "neon-killfeed.png": "Ölüm akışı portresi",
}
