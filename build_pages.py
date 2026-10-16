"""Render the Django homepage and static assets for GitHub Pages."""
import os
import shutil
from pathlib import Path


def main():
    base_dir = Path(__file__).resolve().parent
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    os.environ.setdefault("DJANGO_DEBUG", "1")
    os.environ.setdefault("DJANGO_SECRET_KEY", "github-pages-build-only")
    os.environ.setdefault("DJANGO_STATIC_URL", "/neon-fansite/static/")

    import django

    django.setup()

    from django.test import Client

    response = Client().get("/", HTTP_HOST="localhost")
    if response.status_code != 200:
        raise SystemExit(f"Homepage render failed: HTTP {response.status_code}")

    output_dir = base_dir / "_site"
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)
    (output_dir / "index.html").write_bytes(response.content)
    shutil.copytree(base_dir / "static", output_dir / "static")
    print(f"GitHub Pages site built in {output_dir}")


if __name__ == "__main__":
    main()