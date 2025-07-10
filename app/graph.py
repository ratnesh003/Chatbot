from langgraph.graph import StateGraph, END, START
from langgraph.checkpoint.memory import InMemorySaver
from app.state import State
from app.nodes.classify import classify_query_node
from app.nodes.book_room import book_room_node
from app.nodes.recommend_food import recommend_food_node
from app.nodes.recommend_room import recommend_room_node
from app.nodes.answer_faq import answer_faq_node

def build_chatbot_graph():
    graph_builder = StateGraph(State)

    # Add nodes
    graph_builder.add_node("classify_query", classify_query_node)
    graph_builder.add_node("book_room", book_room_node)
    graph_builder.add_node("recommend_food", recommend_food_node)
    graph_builder.add_node("recommend_room", recommend_room_node)
    graph_builder.add_node("answer_faq", answer_faq_node)

    # Add flow
    graph_builder.add_edge(START, "classify_query")
    graph_builder.add_conditional_edges(
        "classify_query",
        lambda state: state["intent"],
        {
            "book_room": "book_room",
            "recommend_food": "recommend_food",
            "recommend_room": "recommend_room",
            "answer_faq": "answer_faq",
            "others": END,
        }
    )

    graph_builder.add_edge("book_room", END)
    graph_builder.add_edge("recommend_food", END)
    graph_builder.add_edge("recommend_room", END)
    graph_builder.add_edge("answer_faq", END)

    # Final graph
    checkpointer = InMemorySaver()
    graph = graph_builder.compile(checkpointer=checkpointer)

    return graph
