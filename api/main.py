from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.graph import build_chatbot_graph
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
graph = build_chatbot_graph()

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default_thread"


@app.post("/chat")
async def chat(request: Request, chat_request: ChatRequest):
    """
    Endpoint to handle chat requests.
    """
    state = {"messages": chat_request.messages}
    config = chat_request.config

    output = graph.invoke(state, config)

    return {"output": output, "final_state": output.state}

