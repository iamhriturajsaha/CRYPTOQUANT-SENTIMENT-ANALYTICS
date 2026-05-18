# 💸 CRYPTOQUANT: Sentiment-Driven Quantitative Intelligence Platform

![Pristine Midnight Constellation Interface](https://img.shields.io/badge/Aesthetic-Makoto%20Shinkai%20Midnight-7a5cf2?style=for-the-badge)
![FastAPI Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Next.js Frontend](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)
![Statistical Mathematics](https://img.shields.io/badge/Math-Pearson%20%7C%20Spearman%20%7C%20T--Test-ffb347?style=for-the-badge)

**CRYPTOQUANT** is an institutional-grade, behavior-driven quantitative intelligence platform. It merges real-time Bitcoin market psychology (Fear & Greed Index regimes) with high-frequency Hyperliquid order execution logs to analyze, model, and predict trader profitability, leverage survival rates, and risk profiles. 

All of this quantitative analytics is housed inside a breathtaking **Makoto Shinkai-inspired digital painting aesthetic**, featuring a slowly panning, breathing midnight space-cloud background with glowing Bitcoin constellations, a crescent moon, and staggered neon meteor shooting stars.

---

## 🌌 The Cinematic Shinkai Visual Experience

The platform trades rigid, cold corporate layouts for a gorgeous, hardware-accelerated anime masterpiece:
* **Constellation Parallax Sky**: A custom-generated `shinkai_crypto_night.png` artwork displaying deep midnight space cloud layers, glowing blue/gold BTC constellations, and a crescent moon floating at a dimmed `0.70` opacity behind responsive glassmorphic cards.
* **Drifting Camera Motion**: Paired with custom GPU-accelerated keyframe scaling (`shinkaiPanZoom` in `globals.css`) that gently zooms and pans the background over a 50-second infinite loop at a buttery 60+ FPS.
* **4-Way Starry Meteors**: Four independent neon-glowing shooting stars (White, Twilight Pink, Dawn Cyan, and Golden Horizon) slide diagonally across the screen at staggered interval loops (`16s`, `22s`, `19s`, and `25s`) with unique start delay offset schedules.
* **Premium Typography**: Fully styled using custom imports of Google Fonts like `Outfit` (for rounded, premium modern text) and `JetBrains Mono` (for clean, institutional terminal tickers and charts).

---

## 📈 Platform Architecture & Quantitative Modules

### 1. Backend Quantitative Engines (`backend/`)
Built with **FastAPI** to provide sub-millisecond data aggregation, statistics modeling, and machine learning scoring endpoints:
* **Sentiment Correlation Matrix (`stats.py`)**: Computes **Pearson Linear** and **Spearman Rank** correlation coefficients between market panic indexes and trader realized outcomes, verifying significance values ($p$-values).
* **Behavioral Hypothesis Validator (`stats.py`)**: Runs comparative statistical models (Welch's **T-Test** and **Mann-Whitney U Test**) to determine if trader PnL distributions are significantly altered by Fear vs. Greed regimes.
* **K-Means Wallet Segmenter (`ml_model.py`)**: Performs PCA dimensionality reduction and trains **K-Means clustering** models on five dimensions (profitability, risk, win-rate, consistency, sizing) to group traders into institutional clusters:
  * *Consistent Low-Risk Yielders*
  * *High-Risk Profitable Raiders*
  * *Overleveraged Sentiment-Reactive Losers*
* **Machine Learning RF Simulator (`ml_model.py`)**: Hosts an active **Random Forest classifier** trained to predict whether a given order under specific sentiment scores, execution prices, and sides will yield a positive trade outcome.

### 2. Interactive Frontend Dashboards (`frontend/`)
A Next.js single-page command console loading five major research dashboards:
* **Sentiment Twilight Correlation**: Renders overlapping Composed charts combining linear net realized profits with step-wise Fear & Greed indices.
* **Traders Distribution**: Analyzes leverage behavior, buy vs. sell ratios, and regime-specific profitability.
* **Cluster Segmentation**: Computes and maps 3D coordinate-space scatters of trader wallets across PCA components with custom golden, pink, and cyan neon glowing tags.
* **Risk Analytics**: Displays Value at Risk (VaR), drawdown indices, and account volatility.
* **Machine Learning Simulator**: Features interactive sliders allowing users to customize symbol, size, price, side, and sentiment to run real-time inference on trade outcome viability.

---

## 🚀 Local Installation & Launch Guide

### 🛠️ Prerequisites
* Python 3.9+
* Node.js 18+

---

### 1. Booting the FastAPI Backend Service
Navigate to the root folder:

```bash
# 1. Install required packages
pip install fastapi uvicorn pandas numpy scikit-learn scipy pydantic

# 2. Start the FastAPI server (running on Port 8000)
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

* **Interactive API Playground**: Once running, you can explore the complete Swagger docs at `http://127.0.0.1:8000/docs`.

---

### 2. Booting the Next.js Frontend Console
Navigate to the `frontend/` directory:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (configured on Port 3010)
npx next dev --webpack -p 3010
```

* **Access Website**: Launch the terminal platform immediately at `http://localhost:3010`!

---

## 📂 Project Structure (Optimized & Cleaned)
The codebase has been fully cleaned of all unreferenced test scripts and default placeholder templates to keep it lightweight:

```text
CryptoQuant/
│
├── backend/                         # FastAPI Backend
│   ├── engine.py                    # Core Data Engine & CSV Loader
│   ├── main.py                      # FastAPI App Routers & Server Boot
│   ├── ml_model.py                  # Random Forest ML & KMeans Clustering
│   └── stats.py                     # Welch's T-Test, Pearson/Spearman Correlations
│
├── frontend/                        # Next.js Frontend
│   ├── public/                      # Static Assets (Shinkai Night Wallpaper)
│   └── src/
│       ├── app/                     # Page Layouts, global CSS, and Routers
│       └── components/              # 8 Dashboard Panel Components & Sidebar nav
│
├── Datasets/                        # Quantitative Data Files
│   └── Bitcoin Market Sentiment Dataset.csv
│
├── Crypto.ipynb                     # Pristine Restored Jupyter Research Notebook
├── Processed Trading Data.csv       # Active Cleaned Hyperliquid Records (24.9 MB)
├── Trader Clusters.csv              # Pre-trained Wallet Clusters Map (5.6 KB)
├── .gitignore                       # Standard dependency exclusion map
└── README.md                        # Project Documentation
```
