import os

from dotenv import load_dotenv
from google import genai

from app.database import SessionLocal
from app.models.embedding import TextEmbedding


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_embedding(text):

    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return result.embeddings[0].values


def save_embedding(text, text_type, reference_id):

    db = SessionLocal()

    try:

        # Check whether this text is already stored
        existing = db.query(TextEmbedding).filter(
            TextEmbedding.text == text,
            TextEmbedding.text_type == text_type,
            TextEmbedding.reference_id == reference_id
        ).first()

        if existing:
            return existing

        embedding = generate_embedding(text)

        new_embedding = TextEmbedding(
            text=text,
            embedding=embedding,
            text_type=text_type,
            reference_id=reference_id
        )

        db.add(new_embedding)
        db.commit()
        db.refresh(new_embedding)

        return new_embedding

    finally:

        db.close()