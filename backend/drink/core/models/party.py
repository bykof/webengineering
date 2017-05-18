import random
import string

from django.db import models
from abstract_models import APIModel


class Party(APIModel):
    ENTRY_CODE_LENGTH = 5
    ENTRY_CODE_LIMIT = (26 + 10) ** ENTRY_CODE_LENGTH

    entry_code = models.CharField(
        max_length=ENTRY_CODE_LENGTH,
        blank=True,
        help_text='Der Entrycode wird immer nach Erstellung der Party neu generiert.',
    )

    def _generate_entry_code(self):
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(self.ENTRY_CODE_LENGTH))

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None
    ):
        entry_code = self._generate_entry_code()
        index = 0
        while Party.objects.filter(entry_code=entry_code).exists() and index <= self.ENTRY_CODE_LIMIT:
            index += 1
            entry_code = self._generate_entry_code()

        if index > self.ENTRY_CODE_LIMIT:
            raise Exception('Es wurden alle Entry Code ausgebraucht')

        self.entry_code = entry_code
        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return 'Party({})'.format(self.pk)