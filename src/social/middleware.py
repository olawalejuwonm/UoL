import json
from django.http import JsonResponse

class JsonErrorHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        message = response.reason_phrase
        print("JSON ERROR Error start", response, "response", self.get_response, "get_response", request, "request", "Error end")
        # convert response to a serializable format
        serializable_response = {}
        status_code = response.status_code if hasattr(response, 'status_code') else 500
        # if isinstance(response, JsonResponse):
        #     response = response.content.decode('utf-8')
        #     response = json.loads(response)
        #     response = JsonResponse(response, status=response['status_code'])
        error = None
        if response.status_code >= 400:
            if isinstance(response.content, bytes):
                response = response.content.decode('utf-8')
            try:
                response = json.loads(response)
                error = response
            except:
                error = response
        
            data = {
                'message': response.reason_phrase,
                'error': error
            }
            return JsonResponse(data, status=status_code)
        return response