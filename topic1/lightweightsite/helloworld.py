import sys
from django.http import HttpResponse
# from django.conf.urls import url
from django.urls import path
from django.conf import settings


settings.configure(
    DEBUG=True,
    SECRET_KEY='ThisIsSecret',
    ROOT_URLCONF=__name__,
    MIDDLEWARE_CLASSES=(
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ),
)

def index(request):
    return HttpResponse('<html><head><title>Simple Django Site</title></head><body><h1>Hello World</h1></body></html>')

urlpatterns = [
    path('', index, name='index'),
]

if __name__ == '__main__':
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)