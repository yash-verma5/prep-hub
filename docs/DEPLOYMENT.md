# GitHub Pages deployment

This app is static: its questions and UI are bundled at build time, while study progress stays in each browser's `localStorage`.

## First deployment

1. Create an empty GitHub repository, preferably named `iocl-prep-hub`.
2. From this project folder, run:

   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Prepare GitHub Pages deployment"
   git remote add origin https://github.com/<your-username>/iocl-prep-hub.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.

The published URL will be:

```text
https://<your-username>.github.io/iocl-prep-hub/
```

Every future push to `main` runs tests, builds the app, and deploys it.

## Notes

- Browser progress does not transfer from `localhost` to GitHub Pages. Export it from the app first if you want to keep it.
- If you use a user or organisation site repository named `<your-username>.github.io`, change `BASE_PATH` in `.github/workflows/deploy-pages.yml` to `/`.
- A private repository can use Pages only where the account or organisation plan and settings permit it.
