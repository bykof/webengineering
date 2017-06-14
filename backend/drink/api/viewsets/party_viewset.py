from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import detail_route
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from api.serializers.party_member_serializer import PartyMemberSerializer
from api.serializers.party_serializer import PartySerializer
from core.models.party import Party


class PartyViewSet(ModelViewSet):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('entry_code',)

    @detail_route()
    def party_members(self, request, pk):
        return Response(
            data=PartyMemberSerializer(
                self.get_object().partymember_set.all(),
                many=True
            ).data
        )
