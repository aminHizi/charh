import sys
import json
import pymupdf  # pip install pymupdf


def extract(pdf_path):
    doc = pymupdf.open(pdf_path)
    pages = [page.get_text() for page in doc]
    doc.close()
    return pages


def main():
    if len(sys.argv) != 3:
        print("usage: python extract.py <pdf_path> <out_json_path>", file=sys.stderr)
        sys.exit(1)

    pdf_path, out_path = sys.argv[1], sys.argv[2]

    pages = extract(pdf_path)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"totalPages": len(pages), "pages": pages}, f, ensure_ascii=False)


if __name__ == "__main__":
    main()