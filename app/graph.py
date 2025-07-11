from langgraph.graph import StateGraph, END, START
from langgraph.checkpoint.memory import InMemorySaver
from app.state import State
from app.tools.master import MasterNode
from app.tools.book_room import book_room_node
from app.tools.recommend_food import recommend_food_node
from app.tools.recommend_room import recommend_room_node
from app.tools.answer_faq import answer_faq_node
from langgraph.prebuilt import ToolNode, tools_condition

tools = []

def build_chatbot_graph():
    graph_builder = StateGraph(State)

    graph_builder.add_node(
        "MasterNode", MasterNode
    )

    graph_builder.add_node(
        "tools", ToolNode(tools)
    )

    graph_builder.add_edge(
        start_key=START,
        end_key="MasterNode",
    )
    graph_builder.add_conditional_edges(
        "MasterNode",
        tools_condition,
    )
    graph_builder.add_edge(
        "tools",
        "MasterNode"
    )

    graph_builder.add_edge(
        "tools",
        end_key=END
    )

    checkpointer = InMemorySaver()
    graph = graph_builder.compile(checkpointer=checkpointer)

    return graph
