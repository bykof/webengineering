from rest_framework.routers import DefaultRouter

from api.viewsets.party_member_viewset import PartyMemberViewSet
from api.viewsets.party_viewset import PartyViewSet

router = DefaultRouter()
router.register(r'parties', PartyViewSet)
router.register(r'party-members', PartyMemberViewSet)

urlpatterns = router.urls
