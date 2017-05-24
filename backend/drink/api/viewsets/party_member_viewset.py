from rest_framework.viewsets import ModelViewSet

from api.serializers.party_member_serializer import PartyMemberSerializer
from core.models import PartyMember


class PartyMemberViewSet(ModelViewSet):
    queryset = PartyMember.objects.all()
    serializer_class = PartyMemberSerializer

    # TODO: Filter by Party
