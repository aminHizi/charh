import os
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.environ["EMBED_BASE_URL"],
    api_key=os.environ["EMBED_API_KEY"],
)

res = client.embeddings.create(
    model=os.environ["EMBED_MODEL"],
    input=["Bonjour le monde","salut a tous","cours de pharmacologie","un virus","une maladie"],
)
a, b, c, d, e = np.array([item.embedding for item in res.data], dtype=np.float32)

def similarity(x, y):
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))


print("bonjour vs salut        :", similarity(a, b))
print("pharmacologie vs virus  :", similarity(c, d))
print("bonjour vs virus        :", similarity(a, d))
print("virus vs maladie      :", similarity(d, e))