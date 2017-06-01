from rest_framework.viewsets import ModelViewSet

from api.serializers.party_serializer import PartySerializer
from core.models.party import Party


class PartyViewSet(ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer

    # TODO: start party and let the sockets know it!
