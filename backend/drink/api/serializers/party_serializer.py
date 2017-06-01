from rest_framework.serializers import ModelSerializer, ALL_FIELDS

from core.models.party import Party


class PartySerializer(ModelSerializer):
    class Meta:
        model = Party
        fields = ALL_FIELDS
