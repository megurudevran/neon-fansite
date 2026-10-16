"""Neon görsellerini valorant-api.com üzerinden static/images klasörüne indirir.

Kullanım:  python manage.py fetch_neon_assets
"""
import json
import urllib.request
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

NEON_UUID = "bb2a4828-46eb-8cd1-e765-15848195d751"
API_URL = f"https://valorant-api.com/v1/agents/{NEON_UUID}?language=tr-TR"
HEADERS = {"User-Agent": "neon-fansite/1.0 (fan project)"}

# API alanı → hedef dosya adı
AGENT_FIELDS = {
    "fullPortrait": "neon-full.png",
    "bustPortrait": "neon-bust.png",
    "displayIcon": "neon-icon.png",
    "background": "neon-background.png",
    "killfeedPortrait": "neon-killfeed.png",
}


def _get(url):
    request = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


class Command(BaseCommand):
    help = "Neon ajan görsellerini indirir ve static/images içine kaydeder."

    def handle(self, *args, **options):
        target = Path(settings.BASE_DIR) / "static" / "images"
        target.mkdir(parents=True, exist_ok=True)

        try:
            data = json.loads(_get(API_URL))["data"]
        except Exception as exc:  # ağ ya da JSON hatası
            raise CommandError(f"Ajan verisi alınamadı: {exc}")

        downloads = {}
        for field, filename in AGENT_FIELDS.items():
            if data.get(field):
                downloads[filename] = data[field]

        # Yetenek ikonları: slot adları ajan başına farklı olabildiği için sıraya göre eşleştirilir.
        # Beklenen sıra: C, Q, E, X
        slots = {"Grenade": "c", "Ability1": "q", "Ability2": "e", "Ultimate": "x"}
        for ability in data.get("abilities", []):
            key = slots.get(ability.get("slot"))
            if key and ability.get("displayIcon"):
                downloads[f"ability-{key}.png"] = ability["displayIcon"]
                self.stdout.write(f"  {key.upper()} = {ability.get('displayName')}")

        ok, failed = 0, []
        for filename, url in downloads.items():
            try:
                (target / filename).write_bytes(_get(url))
                ok += 1
                self.stdout.write(self.style.SUCCESS(f"✔ {filename}"))
            except Exception as exc:
                failed.append(filename)
                self.stdout.write(self.style.WARNING(f"✘ {filename}: {exc}"))

        self.stdout.write(f"\n{ok} dosya indirildi, {len(failed)} başarısız.")
        self.stdout.write(
            "Yetenek ikonlarının hangi tuşa denk geldiğini yukarıdaki listeden kontrol edin; "
            "yanlışsa dosya adlarını (ability-c/q/e/x.png) değiştirin."
        )
