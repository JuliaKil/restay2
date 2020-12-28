"""restay URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from core.views.trip import TripView
from core.views.trips import TripsView
from core.views.transfers import TransfersView
from core.views.transfer import TransferView
from core.views.hotels import HotelsView
from core.views.hotel import HotelView
from core.views.sights import SightsView
from core.views.sight import SightView
from django.conf import settings
from django.contrib.staticfiles.views import serve as serve_static
from django.views.decorators.cache import never_cache


urlpatterns = [
    path('', TemplateView.as_view(template_name="restay/index.html")),
    path('app/', include('frontend.urls')),
    path('api/trip/', TripsView.as_view()),
    path('api/trip/<int:tripId>/', TripView.as_view()),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/transfer/', TransfersView.as_view()),
    path('api/transfer/<int:transferId>/', TransferView.as_view()),
    path('api/hotel/', HotelsView.as_view()),
    path('api/hotel/<int:hotelId>/', HotelView.as_view()),
    path('api/sight/', SightsView.as_view()),
    path('api/sight/<int:sightId>/', SightView.as_view()),
]

if settings.DEBUG:
    urlpatterns += re_path(r'^static/(?P<path>.*)$', never_cache(serve_static)),
