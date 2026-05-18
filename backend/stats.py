import pandas as pd
import numpy as np
from scipy import stats
from typing import Dict, Any, List

class StatEngine:
    @staticmethod
    def run_correlation(df: pd.DataFrame) -> Dict[str, Any]:
        """
        Runs Pearson and Spearman rank correlation between daily sentiment scores and actual net PnLs.
        """
        sub_df = df[['sentiment_score', 'net_pnl']].dropna()
        
        # Check if enough variance exists to compute correlation
        if len(sub_df) < 5 or sub_df['sentiment_score'].nunique() <= 1 or sub_df['net_pnl'].nunique() <= 1:
            return {
                "pearson": {"coeff": 0.0, "p_value": 1.0, "significant": False},
                "spearman": {"coeff": 0.0, "p_value": 1.0, "significant": False}
            }
            
        try:
            p_coeff, p_pval = stats.pearsonr(sub_df['sentiment_score'], sub_df['net_pnl'])
            s_coeff, s_pval = stats.spearmanr(sub_df['sentiment_score'], sub_df['net_pnl'])
            
            return {
                "pearson": {
                    "coeff": round(float(p_coeff), 5),
                    "p_value": float(p_pval),
                    "significant": bool(p_pval < 0.05)
                },
                "spearman": {
                    "coeff": round(float(s_coeff), 5),
                    "p_value": float(s_pval),
                    "significant": bool(s_pval < 0.05)
                }
            }
        except Exception as e:
            print(f"[ERROR] Correlation computation error: {e}")
            return {
                "pearson": {"coeff": 0.0, "p_value": 1.0, "significant": False},
                "spearman": {"coeff": 0.0, "p_value": 1.0, "significant": False}
            }

    @staticmethod
    def run_hypothesis_tests(df: pd.DataFrame) -> Dict[str, Any]:
        """
        Compares profitability distributions between Fear periods (sentiment <= 1) and Greed periods (sentiment >= 3).
        """
        # Segment PnL based on classification containing 'Fear' or 'Greed'
        fear_pnl = df[df['classification'].str.contains('Fear', na=False, case=False)]['net_pnl'].dropna()
        greed_pnl = df[df['classification'].str.contains('Greed', na=False, case=False)]['net_pnl'].dropna()

        # Check sample sizes
        if len(fear_pnl) < 5 or len(greed_pnl) < 5:
            return {
                "t_test": {"statistic": 0.0, "p_value": 1.0, "significant": False},
                "mann_whitney": {"statistic": 0.0, "p_value": 1.0, "significant": False},
                "samples": {"fear_count": len(fear_pnl), "greed_count": len(greed_pnl)}
            }

        try:
            # Welch's T-Test (equal_var=False)
            t_stat, t_pval = stats.ttest_ind(fear_pnl, greed_pnl, equal_var=False)
            # Mann-Whitney U non-parametric test
            u_stat, u_pval = stats.mannwhitneyu(fear_pnl, greed_pnl)

            return {
                "t_test": {
                    "statistic": round(float(t_stat), 4),
                    "p_value": float(t_pval),
                    "significant": bool(t_pval < 0.05)
                },
                "mann_whitney": {
                    "statistic": round(float(u_stat), 2),
                    "p_value": float(u_pval),
                    "significant": bool(u_pval < 0.05)
                },
                "samples": {
                    "fear_count": len(fear_pnl),
                    "greed_count": len(greed_pnl),
                    "fear_mean_pnl": round(float(fear_pnl.mean()), 2),
                    "greed_mean_pnl": round(float(greed_pnl.mean()), 2)
                }
            }
        except Exception as e:
            print(f"[ERROR] Hypothesis testing computation error: {e}")
            return {
                "t_test": {"statistic": 0.0, "p_value": 1.0, "significant": False},
                "mann_whitney": {"statistic": 0.0, "p_value": 1.0, "significant": False},
                "samples": {"fear_count": len(fear_pnl), "greed_count": len(greed_pnl)}
            }

    @staticmethod
    def get_regime_matrix(df: pd.DataFrame) -> List[Dict[str, Any]]:
        """
        Aggregates statistical KPIs per sentiment regime.
        """
        regimes = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed']
        matrix = []

        for regime in regimes:
            regime_df = df[df['classification'] == regime]
            total_trades = len(regime_df)
            
            if total_trades == 0:
                matrix.append({
                    "regime": regime,
                    "trade_count": 0,
                    "win_rate": 0.0,
                    "avg_pnl": 0.0,
                    "avg_trade_size": 0.0,
                    "total_pnl": 0.0
                })
                continue

            wins = len(regime_df[regime_df['net_pnl'] > 0])
            win_rate = float(wins / total_trades) if total_trades > 0 else 0.0
            avg_pnl = float(regime_df['net_pnl'].mean())
            avg_trade_size = float(regime_df['size_usd'].mean()) if 'size_usd' in regime_df.columns else 0.0
            total_pnl = float(regime_df['net_pnl'].sum())

            matrix.append({
                "regime": regime,
                "trade_count": total_trades,
                "win_rate": round(win_rate * 100, 2),
                "avg_pnl": round(avg_pnl, 2),
                "avg_trade_size": round(avg_trade_size, 2),
                "total_pnl": round(total_pnl, 2)
            })

        return matrix
