import json
from django.http import JsonResponse

class JsonErrorHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        message = response.reason_phrase
        status_code = response.status_code if response.status_code >= 400 else 500

        details = None
        print("Error start", response, "response", message, "get_response", details, "request", "Error end", response.status_code)

        try:
            details = json.loads(response.content.decode('utf-8'))
            # If message is Bad Request, get the first error detail
            if status_code == 400:
                message = details[list(details.keys())[0]][0]
            if status_code == 403:
                message = details['detail']
            if status_code == 401:
                message = details['detail'] if 'detail' in details else response.reason_phrase
             # if details['message] exist and it's a string (which is serializable)
             # This will return the message from the backend
            if 'message' in details and isinstance(details['message'], str):
                message = details['message']
        except:
            pass

        if response.status_code >= 400:
            data = {
                'message': message,
                'details': details
            }
            return JsonResponse(data, status=status_code)
        return response