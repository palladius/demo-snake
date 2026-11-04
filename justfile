# Puffin Snake (`palladius/demo-snake`) — GitHub Pages Helper

default:
    @just --list

# Create public repo palladius/demo-snake, push main, and enable GitHub Pages
publish-ghp:
    gh auth setup-git || true
    gh repo create palladius/demo-snake --public --source=. --remote=origin --push || git push -u origin main
    gh api -X POST repos/palladius/demo-snake/pages -f "source[branch]=main" -f "source[path]=/" || true
    @echo "✅ Live at: https://palladius.github.io/demo-snake/"
