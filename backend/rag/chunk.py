import sys
import json
from langchain_text_splitters import RecursiveCharacterTextSplitter


def count_words(text):
    return len(text.split())


# cut points are tried in order; "▪" is the slide bullet marker
splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,                 # max words per chunk
    chunk_overlap=30,               # words shared between consecutive chunks
    length_function=count_words,
    separators=["\n\n", "\n", "▪", ". ", " ", ""],
)


def chunk_pages(pages):
    chunks = []
    for page_number, text in enumerate(pages, start=1):
        if not text.strip():
            continue
        # split per page, so a chunk never spans two pages and keeps its page number
        for piece in splitter.split_text(text):
            chunks.append({
                "id": len(chunks),
                "page": page_number,
                "text": piece.strip(),
            })
    return chunks


def main():
    if len(sys.argv) != 3:
        print("usage: python chunk.py <texts_json> <chunks_json>", file=sys.stderr)
        sys.exit(1)

    in_path, out_path = sys.argv[1], sys.argv[2]

    with open(in_path, encoding="utf-8") as f:
        doc = json.load(f)

    chunks = chunk_pages(doc["pages"])

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"chunks": chunks}, f, ensure_ascii=False)

    print(f"{len(chunks)} chunks from {doc['totalPages']} pages")


if __name__ == "__main__":
    main()