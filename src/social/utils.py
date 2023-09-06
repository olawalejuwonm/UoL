# https://www.django-rest-framework.org/api-guide/exceptions/#custom-exception-handling

from rest_framework.views import exception_handler
import cloudinary

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    print("Util Error start", response, "response", exc, "exc", context, "context", "Util Error end")

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code

    return response

# Global response format
def response_format(message, data=None):
    print("response_format start", message, "message", data, "data", "response_format end")
    return {
        'message': message,
        'data': data,
    }

# Upload file to cloudinary, accepts file object and options object that will be passed to cloudinary
def upload_file(request, fileName, **kwargs):
    file = request.FILES.get(fileName)
    print("upload_file start", file, "file", kwargs, "options", "upload_file end")
    return cloudinary.uploader.upload(file, **kwargs)['url']
# def return_populatedlist