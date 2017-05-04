import random
import string

from django.db import models

from drink.abstract_models import APIModel


class Party(APIModel):
    ENTRY_CODE_LENGTH = 5
    entry_code = models.CharField(max_length=ENTRY_CODE_LENGTH, blank=True)

    def _generate_entry_code(self):
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(self.ENTRY_CODE_LENGTH))

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None
    ):
        self.entry_code = self._generate_entry_code()
        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return 'Party({})'.format(self.pk)


class PartyMember(APIModel):
    party = models.ForeignKey(Party)
    name = models.TextField()

    def __str__(self):
        return 'PartyMember({}, {})'.format(self.pk, self.party)