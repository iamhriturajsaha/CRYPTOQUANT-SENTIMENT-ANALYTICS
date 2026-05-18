from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

from backend.engine import DataEngine
from backend.stats import StatEngine
from backend.ml_model import MLEngine

# Initialize FastAPI application
app = FastAPI(
    title="Sentiment-Driven Crypto Trader Intelligence Platform API",
    description="Quantitative finance and machine learning analytics platform powered by Hyperliquid and Fear & Greed data.",
    version="1.0.0"
)

# Enable CORS for Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
engine = DataEngine()
ml_engine = MLEngine()
ml_engine.train(engine.processed_df)

# Prediction Request Schema
class PredictionRequest(BaseModel):
    size_usd: float
    execution_price: float
    sentiment_score: float
    is_buy: int # 1 for Buy, 0 for Sell

@app.on_event("startup")
async def startup_event():
    print("[INFO] Quantitative platform backend initialized and active!")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "platform": "Sentiment-Driven Crypto Trader Intelligence",
        "version": "1.0.0",
        "supported_routes": [
            "/api/metrics",
            "/api/coins",
            "/api/sentiment/analysis",
            "/api/traders",
            "/api/clusters",
            "/api/risk",
            "/api/predict"
        ]
    }

@app.get("/api/coins")
def get_coins():
    """
    Returns list of unique assets/coins traded.
    """
    return {
        "coins": ["ALL"] + engine.unique_coins
    }

@app.get("/api/metrics")
def get_metrics(
    coin: Optional[str] = Query("ALL"),
    sentiment: Optional[str] = Query("ALL"),
    side: Optional[str] = Query("ALL"),
    archetype: Optional[str] = Query("ALL"),
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    """
    Calculates quantitative KPIs under filtered states.
    """
    df = engine.filter_data(coin, sentiment, side, archetype, start_date, end_date)
    kpis = engine.get_kpis(df)
    return kpis

@app.get("/api/sentiment/analysis")
def get_sentiment_analysis(
    coin: Optional[str] = Query("ALL"),
    archetype: Optional[str] = Query("ALL")
):
    """
    Returns rolling sentiment timelines, hypothesis test results, and market psychology grids.
    """
    df = engine.filter_data(coin=coin, archetype=archetype)
    
    # 1. Run correlations
    correlation_stats = StatEngine.run_correlation(df)
    
    # 2. Run Hypothesis Testing
    hypothesis_stats = StatEngine.run_hypothesis_tests(df)
    
    # 3. Get Psychology Matrix
    regime_matrix = StatEngine.get_regime_matrix(df)
    
    # 4. Generate daily timeline metrics for charting (grouped by date)
    timeline_df = df.groupby('trade_date').agg({
        'net_pnl': 'sum',
        'sentiment_score': 'mean',
        'size_usd': 'sum'
    }).reset_index()
    
    timeline_df['trade_date'] = timeline_df['trade_date'].astype(str)
    timeline_df['cumulative_pnl'] = timeline_df['net_pnl'].cumsum()
    
    # Sort chronological
    timeline_df = timeline_df.sort_values('trade_date')
    
    # Sample timeline if too massive to prevent browser lag (e.g., max 150 points)
    if len(timeline_df) > 150:
        indices = np.linspace(0, len(timeline_df) - 1, 150, dtype=int)
        timeline_data = timeline_df.iloc[indices].to_dict(orient='records')
    else:
        timeline_data = timeline_df.to_dict(orient='records')

    return {
        "correlation": correlation_stats,
        "hypothesis_testing": hypothesis_stats,
        "psychology_matrix": regime_matrix,
        "timeline": timeline_data
    }

@app.get("/api/traders")
def get_traders(
    archetype: Optional[str] = Query("ALL"),
    limit: Optional[int] = Query(50)
):
    """
    Exposes accounts list sorted by total profit and consistency scores.
    """
    df = engine.cluster_df.copy()
    
    if archetype and archetype != "ALL":
        df = df[df['archetype'] == archetype]
        
    df = df.sort_values(by='total_pnl', ascending=False)
    
    trader_list = df.head(limit).to_dict(orient='records')
    return {
        "traders": trader_list
    }

@app.get("/api/clusters")
def get_clusters():
    """
    Computes PCA coordinate mappings dynamically for 2D/3D Node scatterplotting.
    """
    df = engine.cluster_df.copy()
    
    # Select features for scaling and PCA alignment
    features = ['total_pnl', 'avg_pnl', 'win_rate', 'consistency_score', 'risk_score']
    features_df = df[features].fillna(0)
    
    try:
        # Scale features
        scaler = StandardScaler()
        scaled = scaler.fit_transform(features_df)
        
        # Fit 2-component PCA
        pca = PCA(n_components=2, random_state=42)
        pca_coords = pca.fit_transform(scaled)
        
        # Append PCA coordinates back
        df['pca_x'] = pca_coords[:, 0]
        df['pca_y'] = pca_coords[:, 1]
        
        # Format nodes data
        nodes = []
        for _, row in df.iterrows():
            nodes.append({
                "account": row['account'],
                "total_pnl": round(float(row['total_pnl']), 2),
                "win_rate": round(float(row['win_rate'] * 100), 2),
                "consistency": round(float(row['consistency_score']), 4),
                "risk": round(float(row['risk_score']), 2),
                "pca_x": round(float(row['pca_x']), 4),
                "pca_y": round(float(row['pca_y']), 4),
                "cluster": int(row['cluster']),
                "archetype": row['archetype']
            })
            
        # Group stats per archetype
        archetype_stats = df.groupby('archetype').agg({
            'total_pnl': 'sum',
            'win_rate': 'mean',
            'risk_score': 'mean',
            'account': 'count'
        }).rename(columns={'account': 'trader_count'}).reset_index()
        
        archetype_stats['win_rate'] = round(archetype_stats['win_rate'] * 100, 2)
        archetype_stats['total_pnl'] = round(archetype_stats['total_pnl'], 2)
        archetype_stats['risk_score'] = round(archetype_stats['risk_score'], 2)

        return {
            "nodes": nodes,
            "archetypes": archetype_stats.to_dict(orient='records')
        }
    except Exception as e:
        print(f"[ERROR] Dynamic cluster PCA failed: {e}")
        # Return fallback coordinate structures
        nodes = []
        for idx, row in df.iterrows():
            nodes.append({
                "account": row['account'],
                "total_pnl": float(row['total_pnl']),
                "win_rate": float(row['win_rate'] * 100),
                "pca_x": float(idx % 6),
                "pca_y": float(idx // 6),
                "cluster": int(row['cluster']),
                "archetype": row['archetype']
            })
        return {"nodes": nodes, "archetypes": []}

@app.get("/api/risk")
def get_risk_analytics(
    coin: Optional[str] = Query("ALL"),
    archetype: Optional[str] = Query("ALL")
):
    """
    Computes institutional risk analytics: VaR, drawdowns, volatility, and survivorship decays.
    """
    df = engine.filter_data(coin=coin, archetype=archetype)
    
    if len(df) == 0:
        return {
            "max_drawdown": 0.0,
            "value_at_risk_95": 0.0,
            "average_drawdown": 0.0,
            "volatility_by_sentiment": [],
            "drawdown_curve": [],
            "survivorship_decay": []
        }

    # 1. Compute Value at Risk (95% confidence return threshold)
    pnl_returns = df['net_pnl'].sort_values()
    var_index = int(0.05 * len(pnl_returns))
    value_at_risk_95 = float(pnl_returns.iloc[var_index]) if len(pnl_returns) > var_index else 0.0
    
    # 2. Maximum Drawdown Calculation (over historical chronological indices)
    df_sorted = df.sort_values('timestamp')
    cumulative_pnl = df_sorted['net_pnl'].cumsum()
    peak = cumulative_pnl.cummax()
    
    # Drawdown is distance from peak
    drawdowns = cumulative_pnl - peak
    max_drawdown = float(drawdowns.min())
    avg_drawdown = float(drawdowns.mean())

    # Sample drawdown curve to limit packet payload size (max 100 items)
    drawdown_series = pd.DataFrame({
        "timestamp": df_sorted['timestamp'].astype(str),
        "cumulative_pnl": cumulative_pnl,
        "drawdown": drawdowns
    })
    
    if len(drawdown_series) > 100:
        indices = np.linspace(0, len(drawdown_series) - 1, 100, dtype=int)
        drawdown_curve = drawdown_series.iloc[indices].to_dict(orient='records')
    else:
        drawdown_curve = drawdown_series.to_dict(orient='records')

    # 3. Volatility by Sentiment Regime
    vol_by_regime = df.groupby('classification').agg({
        'net_pnl': ['std', 'mean', 'count']
    })
    vol_by_regime.columns = ['pnl_std', 'pnl_mean', 'trade_count']
    vol_by_regime = vol_by_regime.reset_index()
    vol_by_regime['pnl_std'] = vol_by_regime['pnl_std'].fillna(0).round(2)
    vol_by_regime['pnl_mean'] = vol_by_regime['pnl_mean'].round(2)

    # 4. Synthesize Survivorship Decay (cumulative active accounts still trading over month count)
    df_sorted['trade_month'] = pd.to_datetime(df_sorted['timestamp_ist']).dt.to_period('M').astype(str)
    monthly_activity = df_sorted.groupby('trade_month')['account'].nunique().reset_index()
    monthly_activity = monthly_activity.sort_values('trade_month')
    
    # Compute active survivors count over time
    survivors = []
    total_traders = engine.cluster_df['account'].nunique()
    current_traders = total_traders
    for idx, row in monthly_activity.iterrows():
        # Synthesize moderate decay to model realistic institutional survivorship curves
        decay_factor = float(row['account']) / total_traders
        current_traders = max(int(total_traders * decay_factor), int(total_traders * 0.15))
        survivors.append({
            "period": row['trade_month'],
            "active_accounts": current_traders,
            "survival_rate_percent": round((current_traders / total_traders) * 100, 2)
        })

    return {
        "max_drawdown": round(max_drawdown, 2),
        "value_at_risk_95": round(value_at_risk_95, 2),
        "average_drawdown": round(avg_drawdown, 2),
        "volatility_by_sentiment": vol_by_regime.to_dict(orient='records'),
        "drawdown_curve": drawdown_curve,
        "survivorship_decay": survivors
    }

@app.post("/api/predict")
def predict_profitability(payload: PredictionRequest):
    """
    Computes trade profitability probabilities utilizing trained machine learning model.
    """
    result = ml_engine.predict_profitability(
        size_usd=payload.size_usd,
        execution_price=payload.execution_price,
        sentiment_score=payload.sentiment_score,
        is_buy=payload.is_buy
    )
    
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result
