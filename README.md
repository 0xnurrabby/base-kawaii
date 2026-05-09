<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,8,15&height=180&section=header&text=Base+Kawaii&fontSize=52&fontColor=000000&fontAlignY=38&desc=On-chain+wallet+behavior+visualizer+as+a+kawaii+character&descAlignY=58&descSize=14&animation=fadeIn" width="100%"/>

<div align="center">

[![Live](https://img.shields.io/badge/Live%20App-bbf7d0?style=for-the-badge&logoColor=000)](https://base-kawaii.vercel.app)
[![License](https://img.shields.io/badge/MIT-bfdbfe?style=for-the-badge&logoColor=000)](LICENSE)
[![Platform](https://img.shields.io/badge/Farcaster%20Mini%20App-fde68a?style=for-the-badge&logoColor=000)]()
[![Tech](https://img.shields.io/badge/React%20%2B%20Vite-fca5a5?style=for-the-badge&logoColor=000)]()

</div>

<div align="center">
<i>Enter any Base wallet address and see its on-chain activity transformed into a kawaii character profile with behavior meters, token garden, badges, and a personal story.</i>
</div>

---

## ✦ Features

<div align="center">

| | Feature | What it does |
|:---:|---|---|
| 🐱 | Kawaii persona | Assigns a cute character archetype based on wallet behavior |
| 📊 | Behavior meters | Shows activity levels: DeFi usage, NFT activity, trading frequency |
| 🌿 | Token garden | Visualizes token holdings as a growing garden |
| 🏅 | Badges | Earns badges for on-chain achievements |
| 📅 | Seasons strip | Maps wallet activity to seasonal phases |
| 🕐 | Habit clock | Shows what time of day the wallet is most active |
| 👥 | Besties grid | Finds the wallets this address interacts with most |
| 📖 | Personal story | Generates a short narrative about the wallet's on-chain journey |
| 📈 | Timeline chart | Activity over time visualization |

</div>

---

## ✦ Download & Run

**Step 1** .... Clone the repo

```bash
git clone https://github.com/0xnurrabby/base-kawaii
cd base-kawaii
```

**Step 2** .... Install dependencies

```bash
# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

**Step 3** .... Start dev servers

```bash
# In one terminal (backend)
cd backend
cp .env.example .env
# Fill in BASE_RPC_URL and any API keys in .env
npm run dev

# In another terminal (frontend)
cd frontend
npm run dev
```

---

## ✦ Setup

```
1. Clone the repo
2. Go to backend/ and copy .env.example to .env
3. Fill in your Base RPC URL and API keys
4. Run npm install in both frontend/ and backend/
5. Start both servers (backend first, then frontend)
6. Open http://localhost:5173 in your browser
7. Paste any Base wallet address and click Analyze
```

---

## ✦ Project Structure

```
base-kawaii/
  frontend/
    src/
      App.jsx             ->  main app, wallet form, data rendering
      components/         ->  kawaii UI components (meters, garden, badges, etc.)
      api/
        client.js         ->  API calls to backend
      styles/             ->  Tailwind + custom styles
    index.html            ->  entry point with Farcaster mini app meta
    package.json
    vite.config.js
  backend/
    src/                  ->  Express API routes for wallet data
    .env.example          ->  environment variable template
    package.json
```

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,8,15&height=100&section=footer&animation=fadeIn" width="100%"/>

<div align="center">MIT License .... built by <a href="https://github.com/0xnurrabby">0xnurrabby</a></div>
