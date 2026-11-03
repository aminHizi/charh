import os
import sys
import json
import time
from dotenv import load_dotenv
from openai import OpenAI, RateLimitError

load_dotenv()

client = OpenAI(
    base_url=os.environ["EMBED_BASE_URL"],
    api_key=os.environ["EMBED_API_KEY"],
)
MODEL = os.environ["EMBED_MODEL"]
BATCH_SIZE = 32


def embed_texts(texts):
    vectors = []
    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i:i + BATCH_SIZE]
        for attempt in range(5):
            try:
                res = client.embeddings.create(model=MODEL, input=batch)
                vectors.extend(item.embedding for item in res.data)   # same order as the input
                break
            except RateLimitError:
                time.sleep(2 ** attempt)                              # wait 1s, 2s, 4s... then retry
        else:
            raise RuntimeError("Rate limited too many times")
    return vectors


def main():
    if len(sys.argv) != 3:
        print("usage: python embed.py <chunks_json> <vectors_json>", file=sys.stderr)
        sys.exit(1)

    in_path, out_path = sys.argv[1], sys.argv[2]

    with open(in_path, encoding="utf-8") as f:
        chunksObject = json.load(f)

    vectors = embed_texts([c["text"] for c in chunksObject["chunks"]])

    out = {
        "model": MODEL,
        "dimensions": len(vectors[0]),
        "vectors": [{"id": c["id"], "embedding": v} for c, v in zip(chunksObject["chunks"], vectors)],
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f)

    print(f"{len(vectors)} vectors, {out['dimensions']} dimensions, model {MODEL}")


if __name__ == "__main__":
    main()