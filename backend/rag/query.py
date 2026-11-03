# rag/query.py
import os
import sys
import json
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.environ["EMBED_BASE_URL"],
    api_key=os.environ["EMBED_API_KEY"],
)
MODEL = os.environ["EMBED_MODEL"]
TOP_K = 3


def main():
    if len(sys.argv) != 4:
        print('usage: python query.py <chunks_json> <vectors_json> "<question>"', file=sys.stderr)
        sys.exit(1)

    chunks_path, vectors_path, question = sys.argv[1], sys.argv[2], sys.argv[3]

    with open(chunks_path, encoding="utf-8") as f:
        chunks = json.load(f)["chunks"]
    with open(vectors_path, encoding="utf-8") as f:
        vec_data = json.load(f)["vectors"]

    matrix = np.array([v["embedding"] for v in vec_data])          # shape: (n_chunks, dims)

    res = client.embeddings.create(model=MODEL, input=[question])
    q = np.array(res.data[0].embedding)                            # shape: (dims,)

    # cosine similarity = dot product / (norm * norm)
    scores = (matrix @ q) / (np.linalg.norm(matrix, axis=1) * np.linalg.norm(q))

    top = np.argsort(scores)[::-1][:TOP_K]                         # indices of best scores, highest first
    for i in top:
        print(f"--- chunk {chunks[i]['id']} (page {chunks[i]['page']}) score={scores[i]:.3f}")
        print(chunks[i]["text"][:300], "...\n")


if __name__ == "__main__":
    main()