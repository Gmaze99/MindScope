from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from typing import List

app = FastAPI(title="AI Wellness Dashboard")

# In-memory store (for now)
MOOD_HISTORY = []

class MoodInput(BaseModel):
    mood: str

class MoodRecord(MoodInput):
    timestamp: datetime

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/mood", response_model=MoodRecord)
def submit_mood(mood_input: MoodInput):
    record = {"mood": mood_input.mood, "timestamp": datetime.utcnow()}
    MOOD_HISTORY.append(record)
    return record

@app.get("/api/history", response_model=List[MoodRecord])
def get_history():
    return MOOD_HISTORY
