# 💸CryptoQuant Sentiment Analytics

# Overview
This project explores the relationship between cryptocurrency market sentiment and trader behavior using -
- Bitcoin Fear & Greed Index data.
- Historical Hyperliquid trading activity.

The objective is to analyze how market psychology influences -
- Trader profitability.
- Risk-taking behavior.
- Leverage usage.
- Position sizing.
- Trading consistency.
- Survivability under volatile conditions.

This project combines -
- Quantitative finance.
- Behavioral finance.
- Statistical analysis.
- Machine learning.
- Trader segmentation.
- Data visualization.

to generate actionable trading and risk-management insights.

# Business Objective
Cryptocurrency markets are highly sentiment-driven.

Understanding how traders behave during -
- Fear.
- Extreme Fear.
- Greed.
- Extreme Greed.

can help -
- Quantitative analysts.
- Risk teams.
- Trading platforms.
- Hedge funds.
- Market researchers.

identify profitable behavioral patterns and improve trading strategies.

# Problem Statement
The project investigates the following questions -
- Do traders perform better during Fear or Greed?
- Does leverage usage increase during Greed?
- Are losses larger during market panic?
- Which trader profiles survive volatile conditions?
- Are contrarian traders more profitable?
- Can sentiment be used as a trading signal?

# Datasets Used
## 1. Bitcoin Market Sentiment Dataset
Contains daily Bitcoin market sentiment classifications.

### Features
| Column | Description |
|---|---|
| Date | Sentiment date |
| Classification | Fear / Greed classification |
| Value | Numerical sentiment score |

### Sentiment Regimes
| Sentiment | Interpretation |
|---|---|
| Extreme Fear | Panic selling |
| Fear | Risk aversion |
| Neutral | Balanced market |
| Greed | Risk-on behavior |
| Extreme Greed | Market euphoria |

## 2. Hyperliquid Historical Trader Dataset
Contains historical cryptocurrency trading records.

### Important Features
| Column | Description |
|---|---|
| Account | Trader wallet |
| Coin | Traded asset |
| Execution Price | Trade execution price |
| Size USD | Position size |
| Side | Buy/Sell |
| Closed PnL | Realized profit/loss |
| Fee | Trading fee |
| Timestamp | Trade timestamp |

# Technologies Used
## Programming Language
- Python.

## Libraries
- Pandas
- NumPy.
- Matplotlib.
- Seaborn.
- Plotly.
- SciPy.
- Scikit-Learn.
- XGBoost.

# Local Installation & Launch Guide

## Prerequisites
* Python 3.9+
* Node.js 18+

## 1. Booting the FastAPI Backend Service

Navigate to the root folder -
```bash
# 1. Install required packages
pip install fastapi uvicorn pandas numpy scikit-learn scipy pydantic

# 2. Start the FastAPI server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8555
```

## 2. Booting the Next.js Frontend Console
Navigate to the `frontend/` directory -
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npx next dev --webpack -p 3010
```

# Project Workflow
```text
1. Data Collection.
2. Data Cleaning.
3. Data Integration.
4. Feature Engineering.
5. Exploratory Data Analysis.
6. Statistical Testing.
7. Trader Segmentation.
8. Behavioral Finance Analysis.
9. Machine Learning Modeling.
10. Business Insights & Recommendations.
```

# Data Cleaning & Preprocessing
The following preprocessing steps were performed -
- Standardized column names.
- Datetime conversion.
- Duplicate removal.
- Missing value handling.
- Invalid trade filtering.
- Infinite value handling.
- Numeric type corrections.
- Outlier inspection.

# Data Integration
Trading records were merged with daily sentiment data using trade dates.

Each trade was mapped into a sentiment regime -
- Fear.
- Extreme Fear.
- Greed.
- Extreme Greed.
- Neutral.

This enabled regime-based trading analysis.

# Feature Engineering
Several quantitative trading metrics were engineered.

## Trader Metrics
- Total PnL.
- Average PnL.
- Net PnL.
- Win Rate.
- Trade Frequency.
- Average Trade Size.
- Rolling Profitability.
- Risk Score.
- Consistency Score.
- Volatility-adjusted returns.

## Behavioral Metrics
- Buy vs Sell behavior.
- Sentiment-specific profitability.
- Contrarian trade detection.
- Profit persistence.

# Exploratory Data Analysis (EDA)
Comprehensive EDA was performed to analyze -
- Sentiment distribution.
- Profitability distribution.
- Trade size behavior.
- Leverage/risk behavior.
- Symbol-wise performance.
- Correlation structures.
- Time-series profitability trends.

# Statistical Analysis
The project includes rigorous statistical testing.

## Tests Performed
### Pearson Correlation
Measured linear relationships between sentiment and profitability.

### Spearman Correlation
Measured rank-based relationships for non-normal financial data.

### T-Test
Compared profitability between Fear and Greed regimes.

### Mann-Whitney U Test
Performed robust non-parametric distribution comparison.

# Trader Segmentation
Traders were clustered using -
- Profitability.
- Risk.
- Win rate.
- Consistency.
- Position sizing.

## Clustering Techniques
- KMeans Clustering.
- PCA Visualization.

## Trader Profiles Identified
- Consistent low-risk traders.
- High-risk profitable traders.
- Overleveraged losing traders.
- Sentiment-reactive traders.

# Machine Learning
A Random Forest classifier was built to predict profitable trades.

## Model Inputs
- Trade size.
- Execution price.
- Sentiment score.
- Buy/Sell behavior.

## Outputs
- Profitability prediction.
- Feature importance analysis.

# Key Insights
- Sentiment Strongly Influences Trader Behavior - Risk appetite increased significantly during Greed regimes.
- Fear Regimes Produced Higher Volatility - Loss distributions widened during Fear periods, indicating panic-driven activity.
- Consistent Traders Outperformed Aggressive Traders - Risk-adjusted consistency was more sustainable than high-leverage strategies.
- Contrarian Traders Demonstrated Better Resilience - Buy-side trades during Extreme Fear showed stronger long-term profitability.
- Overleveraged Traders Showed Poor Survivability - High-risk clusters exhibited larger drawdowns and unstable profitability.

# Visualizations Included
- Sentiment distribution charts.
- PnL distribution plots.
- Boxplots by sentiment.
- Correlation heatmaps.
- PCA cluster visualization.
- Interactive Plotly dashboards.

# Future Improvements
Potential enhancements include -
- Real-time sentiment ingestion.
- Advanced time-series forecasting.
- Reinforcement learning agents.
- Regime-switching models.
- Portfolio optimization.
- Streamlit deployment.
- Real-time dashboarding.
