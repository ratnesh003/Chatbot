# from langchain_groq import ChatGroq

# llm = ChatGroq(model="llama3-8b-8192")


import os
from dotenv import load_dotenv
load_dotenv()

from langchain_groq import ChatGroq

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in environment")

llm = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")
