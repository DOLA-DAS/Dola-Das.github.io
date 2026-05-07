# Dola Das – Academic Portfolio
## How to deploy on GitHub Pages

### 1. Repository setup
1. Go to https://github.com and log in
2. Create a new repository named exactly: `yourusername.github.io`
   (replace `yourusername` with your GitHub username)
3. Set it to **Public**

### 2. Upload your files
Upload these files maintaining this structure:
```
yourusername.github.io/
├── index.html
├── style.css
├── script.js
└── data/
    ├── profile.png       ← your profile photo
    ├── cv.pdf            ← your CV
    ├── painting1.png     ← painting images
    ├── painting2.png
    └── ...
```

### 3. Enable GitHub Pages
1. Go to your repository → Settings → Pages
2. Under "Source", select: **Deploy from a branch**
3. Branch: **main** | Folder: **/ (root)**
4. Click Save

Your site will be live at: `https://yourusername.github.io`

---

### Adding your paintings
1. Upload painting images (PNG/JPG) to the `data/` folder
2. Open `script.js` and find this section:
```js
const paintings = [
  // 'painting1.png',
  // 'painting2.png',
];
```
3. Remove the `//` and add your filenames, e.g.:
```js
const paintings = [
  'painting1.png',
  'painting2.png',
  'painting3.jpg',
];
```

### Adding social links
Open `index.html` and find the `social-links` section in the hero.
Replace `href="#"` with your actual profile URLs:
- LinkedIn: `https://linkedin.com/in/yourprofile`
- Google Scholar: `https://scholar.google.com/citations?user=YOURID`
- ORCID: `https://orcid.org/YOUR-ORCID`

### Setting up contact form
For the contact form to actually send emails:
1. Go to https://formspree.io and sign up for free
2. Create a new form and copy your endpoint URL
3. In `index.html`, change:
   `<form class="contact-form" id="contact-form">`
   to:
   `<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
4. In `script.js`, remove the `e.preventDefault();` line from the form handler
