from rest_framework.viewsets import ModelViewSet

from api.serializers.party_serializer import PartySerializer
from core.models import Party


class PartyViewSet(ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
