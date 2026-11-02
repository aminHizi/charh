import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.environ["EMBED_BASE_URL"],
    api_key=os.environ["EMBED_API_KEY"],
)

res = client.embeddings.create(
    model=os.environ["EMBED_MODEL"],
    input=["Bonjour le monde"],
)
print("OK, vector size:", len(res.data[0].embedding))
print("Vector:", res.data[0].embedding)