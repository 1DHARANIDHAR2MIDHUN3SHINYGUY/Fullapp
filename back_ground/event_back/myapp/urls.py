from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdminViewSet, CorporateEventViewSet, EventRegisterViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'corporate-events', CorporateEventViewSet)
router.register(r'event-registers', EventRegisterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
