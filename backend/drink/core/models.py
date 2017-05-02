from django.db import models

from drink.abstract_models import APIModel


class Party(APIModel):
    entry_code = models.CharField(max_length=12)

    def __unicode__(self):
        return 'Party({})'.format(self.pk)


class PartyMember(APIModel):
    party = models.ForeignKey(Party)
    name = models.TextField()

    def __unicode__(self):
        return 'PartyMember({}, {})'.format(self.pk, self.party)