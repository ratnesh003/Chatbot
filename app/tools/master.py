from app.prompts.classify_prompt import system_prompt_query_classification
from app.llm.chat_groq import master
from app.state import State

def MasterNode(state: State) -> State:
    return {"messages": master.invoke(state["messages"])}