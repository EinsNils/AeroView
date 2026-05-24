# Plan: Automatischer Release + Deployment

**Status: Teilweise implementiert — Deploy deaktiviert**

## Was wurde erstellt / geändert

| Datei | Aktion |
|-------|--------|
| `docker-compose.prod.yml` | Neu – zieht Images von ghcr.io (für Server) |
| `.github/workflows/ci.yml` | `deploy`-Job ergänzt (aktuell `if: false`) |
| `.github/workflows/release.yml` | Neu – release-please Conventional Commits |

## Deploy aktivieren

Wenn Server ready: In `.github/workflows/ci.yml` den `deploy`-Job ändern:
```yaml
# vorher:
if: false

# nachher:
if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

Dann in GitHub Repo → Settings → Secrets folgende Secrets anlegen:
| Secret | Wert |
|--------|------|
| `DEPLOY_HOST` | IP oder Hostname des VPS |
| `DEPLOY_USER` | SSH-Benutzer (z.B. `deploy`) |
| `DEPLOY_SSH_KEY` | Privater SSH-Key |

## Server-Setup (einmalig)
```bash
mkdir -p /opt/aeroview
# docker-compose.prod.yml dorthin kopieren
cat > /opt/aeroview/.env << EOF
DB_NAME=aeroview
DB_USERNAME=sa
DB_PASSWORD=<echtes-passwort>
EOF
```

## Release-Flow
- Conventional Commits auf `main` → `release-please` erstellt/aktualisiert Release-PR
- Release-PR mergen → GitHub Release + Tag + Changelog automatisch
