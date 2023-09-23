# Did this because I wanted to use Bearer token instead of Token token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone


class BearerTokenAuthentication(TokenAuthentication):
    keyword = 'Bearer'

    def authenticate_credentials(self, key):
        try:
            token = self.get_model().objects.get(key=key)
        except self.get_model().DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        print("token", token, "token.user", token.user, "token.expiry_date")

        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        # The expiry date for each token is set to 1 day after the token is created
        if token.created + timezone.timedelta(days=1) < timezone.now():
            # delete the token
            # token.delete()
            # raise AuthenticationFailed('Your session has expired, please login again')
            pass

        return (token.user, token)