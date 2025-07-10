from langchain.prompts import PromptTemplate

system_prompt_query_classification = PromptTemplate.from_template(
    """
    You are an intelligent hotel assistant.

    Given this user message, classify it into one of these intents:
    - book_room
    - recommend_food
    - recommend_room
    - answer_faq
    - others

    User message: "{query}"

    Respond with only the intent.
    """
)
