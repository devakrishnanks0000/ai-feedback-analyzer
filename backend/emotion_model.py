import pickle
import re
import string

with open("emotion_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"\d+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text

def analyze_emotion(text):
    cleaned = clean_text(text)
    text_vector = vectorizer.transform([cleaned])
    prediction = model.predict(text_vector)
    return prediction[0]
