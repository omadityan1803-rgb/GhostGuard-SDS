import joblib
from skl2onnx import convert_sklearn, to_onnx
from skl2onnx.common.data_types import FloatTensorType
import numpy as np

# Load and export XGBoost to ONNX
model = joblib.load('backend/app/ml/model.pkl')

# For XGBoost → ONNX use onnxmltools
import onnxmltools
from onnxmltools.convert.common.data_types import FloatTensorType as OnnxFloat

onnx_model = onnxmltools.convert_xgboost(
    model, 
    initial_types=[('features', OnnxFloat([None, 16]))]
)
onnxmltools.utils.save_model(onnx_model, 'backend/app/ml/model.onnx')
print("ONNX model exported.")
```

---

## PHASE 3 — Backend API (FastAPI)

### `backend/requirements.txt`
```
fastapi==0.110.0
uvicorn==0.27.0
xgboost==2.0.3
scikit-learn==1.4.0
joblib==1.3.2
redis==5.0.1
sqlalchemy==2.0.27
psycopg2-binary==2.9.9
python-dotenv==1.0.1
onnxruntime==1.17.1
numpy==1.26.4
pydantic==2.6.0
