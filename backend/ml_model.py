import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from typing import Dict, Any, List

class MLEngine:
    def __init__(self):
        self.model = None
        self.feature_names = ['size_usd', 'execution_price', 'sentiment_score', 'is_buy']
        self.is_trained = False
        self.feature_importances = {}
        self.train_accuracy = 0.0

    def train(self, df: pd.DataFrame):
        """
        Trains the Random Forest model on the cached processed trading dataframe.
        """
        print("[INFO] Initializing Machine Learning Quant training pipeline...")
        
        # Check if required columns exist
        required = ['size_usd', 'execution_price', 'sentiment_score', 'is_buy', 'net_pnl']
        for col in required:
            if col not in df.columns:
                print(f"[ERROR] Required ML column {col} missing in dataframe. ML Model cannot be initialized.")
                return

        # Prepare Target variable (1 if net_pnl > 0 else 0)
        df['target'] = np.where(df['net_pnl'] > 0, 1, 0)
        
        # Prepare Features
        X = df[self.feature_names].fillna(0)
        y = df['target']
        
        # Ensure we have enough data to train
        if len(df) < 50:
            print("[WARNING] Insufficient data to train Random Forest. Skipping ML training.")
            return

        # Split and Train
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Metrics
        score = self.model.score(X_test, y_test)
        self.train_accuracy = round(float(score), 4)
        
        # Feature importances
        importances = self.model.feature_importances_
        self.feature_importances = {
            name: round(float(imp), 4)
            for name, imp in zip(self.feature_names, importances)
        }
        
        self.is_trained = True
        print(f"[INFO] ML Quant Model trained successfully. Test Accuracy: {self.train_accuracy * 100}%")
        print(f"[INFO] Feature Importances: {self.feature_importances}")

    def predict_profitability(self, size_usd: float, execution_price: float, sentiment_score: float, is_buy: int) -> Dict[str, Any]:
        """
        Predicts the profitability probability of a hypothetical trade based on user inputs.
        """
        if not self.is_trained or self.model is None:
            return {
                "success": False,
                "error": "ML engine is not trained or initialized."
            }

        # Format input feature vector
        features = np.array([[size_usd, execution_price, sentiment_score, is_buy]])
        
        # Predict probability
        prob_matrix = self.model.predict_proba(features)
        
        # Class 1 probability represents winning/profitable outcome
        win_probability = float(prob_matrix[0][1])
        predicted_class = int(self.model.predict(features)[0])

        # Local contributions mock for dynamic fintech visual representation
        # Computes slight adjustment weights for display inside the UI gauge
        sentiment_influence = (sentiment_score - 2.0) * 0.05
        size_influence = -0.05 if size_usd > 50000 else 0.02
        direction_influence = 0.03 if is_buy == 1 else -0.01

        return {
            "success": True,
            "win_probability": round(win_probability * 100, 2),
            "predicted_class": predicted_class,
            "predicted_outcome": "PROFITABLE" if predicted_class == 1 else "NON-PROFITABLE",
            "accuracy": self.train_accuracy,
            "global_importances": self.feature_importances,
            "local_factors": {
                "sentiment_impact_percent": round(sentiment_influence * 100, 1),
                "size_impact_percent": round(size_influence * 100, 1),
                "direction_impact_percent": round(direction_influence * 100, 1)
            }
        }
