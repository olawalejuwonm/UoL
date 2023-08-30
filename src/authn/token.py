# Did this because I wanted to use Bearer token instead of Token token
from rest_framework.authentication import TokenAuthentication

class BearerTokenAuthentication(TokenAuthentication):
    keyword = 'Bearer'