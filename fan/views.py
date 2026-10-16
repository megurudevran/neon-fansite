from pathlib import Path

from django.conf import settings
from django.shortcuts import render

from . import content

VIDEO_EXTENSIONS = (".mp4", ".webm")
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
# Galeride gösterilmeyen yardımcı dosyalar
HIDDEN_PREFIXES = ("ability-", "fallback", "neon-icon", "neon-background")


def _files(folder, extensions=None):
    extensions = extensions or IMAGE_EXTENSIONS
    path = Path(settings.BASE_DIR) / "static" / folder
    if not path.is_dir():
        return []
    return sorted(p.name for p in path.iterdir() if p.suffix.lower() in extensions)


def _title(name):
    if name in content.GALLERY_TITLES:
        return content.GALLERY_TITLES[name]
    return Path(name).stem.replace("-", " ").replace("_", " ").capitalize()


def index(request):
    images = _files("images")
    gifs = _files("gifs")

    videos = _files("videos", VIDEO_EXTENSIONS)

    def find_video(aliases):
        for alias in aliases:
            for name in videos:
                stem = Path(name).stem.lower().replace("_", "-").replace(" ", "-")
                if stem == alias or stem.startswith(alias + "-") or stem.endswith("-" + alias):
                    return f"videos/{name}"
        return None

    abilities = []
    for ability in content.ABILITIES:
        item = dict(ability)
        filename = f"ability-{ability['key'].lower()}.png" if ability["key"] else None
        item["image"] = f"images/{filename}" if filename and filename in images else None
        item["video"] = find_video(ability["aliases"])
        abilities.append(item)

    gallery = [
        {"path": f"images/{name}", "title": _title(name), "animated": False}
        for name in images
        if not name.startswith(HIDDEN_PREFIXES)
    ]
    gallery += [{"path": f"gifs/{name}", "title": _title(name), "animated": True} for name in gifs]

    context = {
        "c": content,
        "abilities": abilities,
        "gallery": gallery,
        "hero_image": "images/neon-full.png" if "neon-full.png" in images else None,
        "hero_bg": "images/neon-background.png" if "neon-background.png" in images else None,
        "assets_missing": "neon-full.png" not in images,
    }
    return render(request, "index.html", context)
