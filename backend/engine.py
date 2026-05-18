import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
import os

class DataEngine:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(DataEngine, cls).__new__(cls, *args, **kwargs)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        
        # Paths to workspace data
        self.base_path = "c:\\Users\\HyuenKai\\Desktop\\CryptoQuant"
        self.processed_path = os.path.join(self.base_path, "Processed Trading Data.csv")
        self.cluster_path = os.path.join(self.base_path, "Trader Clusters.csv")
        self.sentiment_path = os.path.join(self.base_path, "Datasets", "Bitcoin Market Sentiment Dataset.csv")

        # In-memory cache
        self.processed_df = None
        self.cluster_df = None
        self.sentiment_df = None
        self.unique_coins = []
        
        self.load_data()
        self._initialized = True

    def load_data(self):
        print("[INFO] Starting quantitative data engine ingestion pipeline...")
        
        # 1. Load Processed Trading Data
        if os.path.exists(self.processed_path):
            print(f"[INFO] Ingesting Hyperliquid processed trading records from {self.processed_path}...")
            self.processed_df = pd.read_csv(self.processed_path)
            self.processed_df['timestamp_ist'] = pd.to_datetime(self.processed_df['timestamp_ist'])
            self.processed_df['trade_date'] = pd.to_datetime(self.processed_df['trade_date'])
            # Fill NaNs in columns
            self.processed_df['classification'] = self.processed_df['classification'].fillna("Neutral")
            self.processed_df['coin'] = self.processed_df['coin'].fillna("Unknown")
            self.unique_coins = sorted(self.processed_df['coin'].unique().tolist())
        else:
            print(f"[ERROR] Processed trading data not found at {self.processed_path}")
            # Fallback mock setup if not found, but it should exist
            raise FileNotFoundError(f"Processed Trading Data.csv is required. Path: {self.processed_path}")

        # 2. Load Trader Clusters
        if os.path.exists(self.cluster_path):
            print(f"[INFO] Loading trader archetypes and clusters from {self.cluster_path}...")
            self.cluster_df = pd.read_csv(self.cluster_path)
            # Map cluster numerical ids to descriptive institutional archetypes
            archetype_mapping = {
                0: "Institutional Strategists",
                1: "High-Risk Momentum Traders",
                2: "Contrarian Survivors",
                3: "Overleveraged Speculators"
            }
            self.cluster_df['archetype'] = self.cluster_df['cluster'].map(archetype_mapping)
        else:
            print(f"[ERROR] Trader clusters data not found at {self.cluster_path}")
            raise FileNotFoundError(f"Trader Clusters.csv is required. Path: {self.cluster_path}")

        # 3. Load Sentiment Indices
        if os.path.exists(self.sentiment_path):
            print(f"[INFO] Ingesting historical Bitcoin Market Sentiment indices from {self.sentiment_path}...")
            self.sentiment_df = pd.read_csv(self.sentiment_path)
            self.sentiment_df.columns = self.sentiment_df.columns.str.lower().str.strip()
            date_col = next((col for col in self.sentiment_df.columns if 'date' in col), 'date')
            self.sentiment_df[date_col] = pd.to_datetime(self.sentiment_df[date_col])
        else:
            print(f"[WARNING] Bitcoin Market Sentiment dataset not found in datasets folder. Synthesizing from processed data...")
            self.sentiment_df = self.processed_df[['trade_date', 'classification', 'sentiment_score']].drop_duplicates().rename(
                columns={'trade_date': 'date'}
            )

        print("[INFO] Quantitative data caches initialized successfully!")

    def filter_data(self, 
                    coin: Optional[str] = None, 
                    sentiment: Optional[str] = None, 
                    side: Optional[str] = None, 
                    archetype: Optional[str] = None,
                    start_date: Optional[str] = None,
                    end_date: Optional[str] = None) -> pd.DataFrame:
        """
        Slices the master trades dataframe using multiple dimensions dynamically.
        """
        df = self.processed_df.copy()

        if coin and coin != "ALL":
            df = df[df['coin'] == coin]
            
        if sentiment and sentiment != "ALL":
            df = df[df['classification'].str.upper() == sentiment.upper()]
            
        if side and side != "ALL":
            df = df[df['side'].str.upper() == side.upper()]

        if start_date:
            df = df[df['trade_date'] >= pd.to_datetime(start_date)]
            
        if end_date:
            df = df[df['trade_date'] <= pd.to_datetime(end_date)]

        if archetype and archetype != "ALL":
            # Find accounts matching this cluster/archetype
            valid_accounts = self.cluster_df[self.cluster_df['archetype'] == archetype]['account'].tolist()
            df = df[df['account'].isin(valid_accounts)]

        return df

    def get_kpis(self, df: pd.DataFrame) -> Dict[str, Any]:
        """
        Computes the primary quantitative statistics.
        """
        total_trades = len(df)
        if total_trades == 0:
            return {
                "total_trades": 0,
                "total_pnl": 0.0,
                "win_rate": 0.0,
                "average_pnl": 0.0,
                "risk_exposure": 0.0,
                "sentiment_volatility": 0.0,
                "active_traders": 0
            }

        total_pnl = float(df['net_pnl'].sum())
        wins = len(df[df['net_pnl'] > 0])
        win_rate = float(wins / total_trades) if total_trades > 0 else 0.0
        average_pnl = float(df['net_pnl'].mean())
        
        # Risk exposure defined as median size in USD
        risk_exposure = float(df['size_usd'].median()) if 'size_usd' in df.columns else 0.0
        
        # Sentiment volatility represents standard deviation of daily average sentiment scores
        sentiment_volatility = float(df['sentiment_score'].std()) if 'sentiment_score' in df.columns else 0.0
        if np.isnan(sentiment_volatility):
            sentiment_volatility = 0.0
            
        active_traders = int(df['account'].nunique())

        return {
            "total_trades": total_trades,
            "total_pnl": round(total_pnl, 2),
            "win_rate": round(win_rate * 100, 2),
            "average_pnl": round(average_pnl, 2),
            "risk_exposure": round(risk_exposure, 2),
            "sentiment_volatility": round(sentiment_volatility, 3),
            "active_traders": active_traders
        }
