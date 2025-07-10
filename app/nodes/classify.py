from app.prompts.classify_prompt import system_prompt_query_classification
from app.llm.chat_groq import llm
from app.state import State

def _query_classification(query: str) -> str:
    prompt = system_prompt_query_classification.format_prompt(query=query)
    response = llm.invoke(prompt.to_messages())
    return response.content.strip()

def classify_query_node(state: State) -> State:
    last_message = state["messages"][-1]
    query = last_message.content
    intent = _query_classification(query)
    return {**state, "intent": intent}
