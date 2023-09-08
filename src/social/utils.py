# https://www.django-rest-framework.org/api-guide/exceptions/#custom-exception-handling

from rest_framework.views import exception_handler
import cloudinary

from authn.serializers import UserSerializer

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # print("Util Error start", response, "response", exc, "exc", context, "context", "Util Error end")

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
def upload_file(request, **kwargs):
    try:
        fileUploaded = []
        # Iterate through files
        for fileName in request.FILES:
            # Upload file to cloudinary
            file = request.FILES.get(fileName)
            print("upload_file start", file, "file", kwargs, "options", "upload_file end")
            upload_url = cloudinary.uploader.upload(file, **kwargs)['secure_url']
            # assign uploaded file url to request.data
            request.data[fileName] = upload_url
            fileUploaded.append(upload_url)
        return fileUploaded
        
    except Exception as e:
        print("upload_file error", e, "error", "upload_file error")
        return None

def populate(queryset, key, dataSerializer):
    alldata = []
    for item in queryset:
        data = dataSerializer(item).data
        populated_data = UserSerializer(getattr(item, key)).data
        data[key] =populated_data
        alldata.append(data)
    return alldata
        
# This is used for multiple field population
def populate_multiple(queryset, keys, dataSerializer):
    alldata = []
    for item in queryset:
        data = dataSerializer(item).data
        for key in keys:
            populated_data = UserSerializer(getattr(item, key)).data
            data[key] =populated_data
        alldata.append(data)
    return alldata
