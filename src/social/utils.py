# https://www.django-rest-framework.org/api-guide/exceptions/#custom-exception-handling

from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    print("Util Error start", response, "response", exc, "exc", context, "context", "Util Error end")

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code

    return response