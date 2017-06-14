from django.db import models

from abstract_models import APIModel
from async.consumers.party_consumer import PartyConsumer
from core.models.party import Party


class PartyMember(APIModel):
    party = models.ForeignKey(Party)
    name = models.TextField()

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            PartyConsumer.party_member_joined(self)
        else:
            super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        PartyConsumer.party_member_leaved(self)
        super().delete(*args, **kwargs)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return 'PartyMember({}, {})'.format(self.pk, self.party)
