from rest_framework.serializers import ModelSerializer, ALL_FIELDS

from core.models import PartyMember


class PartyMemberSerializer(ModelSerializer):
    class Meta:
        model = PartyMember
        fields = ALL_FIELDS
