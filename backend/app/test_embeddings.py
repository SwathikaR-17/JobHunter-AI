import os
import math

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return result.embeddings[0].values


def cosine_similarity(a, b):

    dot_product = sum(x * y for x, y in zip(a, b))

    magnitude_a = math.sqrt(sum(x * x for x in a))
    magnitude_b = math.sqrt(sum(x * x for x in b))

    return dot_product / (magnitude_a * magnitude_b)


text_a = "AI fashion recommendation application"

text_b = "Machine learning system that recommends clothes based on user preferences"

text_c = "Civil engineering project for designing concrete bridges"


embedding_a = get_embedding(text_a)
embedding_b = get_embedding(text_b)
embedding_c = get_embedding(text_c)


similarity_ab = cosine_similarity(
    embedding_a,
    embedding_b
)

similarity_ac = cosine_similarity(
    embedding_a,
    embedding_c
)


print("A ↔ B similarity:", similarity_ab)
print("A ↔ C similarity:", similarity_ac)