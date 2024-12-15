import re
from fastapi.openapi.utils import get_openapi


def generate_operation_id(tag: str, summary: str) -> str:
  summary_snake = re.sub(r'\W|_+', '_', summary).lower()
  return f"{tag}_{summary_snake}"


def make_custom_openapi(app):
  def custom_openapi():
    if app.openapi_schema:
      return app.openapi_schema
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="Custom OpenAPI schema with consistent operation IDs",
        routes=app.routes,
    )

    # Loop through all paths and update operation IDs
    for path, methods in openapi_schema["paths"].items():
      for method, endpoint in methods.items():
        # Use the first tag or "default"
        tags = endpoint.get("tags", ["default"])
        summary = endpoint.get("summary", "default_summary")
        endpoint["operationId"] = generate_operation_id(tags[0], summary)

    app.openapi_schema = openapi_schema
    return app.openapi_schema
  return custom_openapi
