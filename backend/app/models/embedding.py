from sqlalchemy import Column, Integer, String, Text, JSON

from app.database import Base


class TextEmbedding(Base):

    __tablename__ = "text_embeddings"

    id = Column(Integer, primary_key=True, index=True)

    text = Column(Text, nullable=False)

    embedding = Column(JSON, nullable=False)

    text_type = Column(String, nullable=False)

    reference_id = Column(Integer, nullable=True)