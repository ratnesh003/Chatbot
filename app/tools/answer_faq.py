import json
import os
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_core.tools import tool

FAQ_PATH = "../data/faqs.json"
with open(FAQ_PATH, "r") as f:
    faq_data = json.load(f)

documents = [
    Document(page_content=entry["question"], metadata={"answer": entry["answer"]})
    for entry in faq_data
]

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory=os.path.join("data", "chroma_faq")
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

@tool
def answer_faq(question: str) -> str:
    """Answer FAQ questions using the vector store."""
    results = retriever.get_relevant_documents(question)
    if results:
        return "\n".join(f"{document.metadata['answer']}" for document in results)
    else:
        return "Sorry, I don't have an answer to that question."