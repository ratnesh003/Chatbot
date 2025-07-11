from app.prompts.system_prompt import system_prompt
from app.llm.chat_groq import master
from app.state import State

# def MasterNode(state: State) -> State:
#     return {"messages": master.invoke(state["messages"])}

from langchain_core.messages import SystemMessage

def MasterNode(state: State) -> State:
    messages = state["messages"]

    system_prompt_ = SystemMessage(content=system_prompt.format(query=messages[-1].content))
    messages.insert(0, system_prompt_)

    response = master.invoke(messages)
    messages.append(response)

    return {"messages": messages}
