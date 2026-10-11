from pathlib import Path
from pypdf import PdfReader


pdf_path = Path("Swathika.pdf")

reader = PdfReader(pdf_path)

text = ""

for page in reader.pages:
    page_text = page.extract_text()

    if page_text:
        text += page_text + "\n"


print(text)