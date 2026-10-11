from app.services.embedding_service import save_embedding


result = save_embedding(
    text="AI fashion recommendation application",
    text_type="test",
    reference_id=999
)

print("Embedding ID:", result.id)
print("Dimensions:", len(result.embedding))