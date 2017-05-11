from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.documentation import include_docs_urls

from api.urls import urlpatterns as api_urlpatterns

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(api_urlpatterns)),
    url(r'^api-docs/', include_docs_urls(title='Drink APP API'))
]
