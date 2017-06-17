import random
import string
import threading

from django.contrib.postgres.fields.jsonb import JSONField
from django.db import models
from abstract_models import APIModel
from async.consumers.party_consumer import PartyConsumer
from core.gamethread import GameThread


class Party(APIModel):
    ENTRY_CODE_LENGTH = 5
    ENTRY_CODE_LIMIT = (26 + 10) ** ENTRY_CODE_LENGTH

    entry_code = models.CharField(
        max_length=ENTRY_CODE_LENGTH,
        blank=True,
        help_text='Der Entrycode wird immer nach Erstellung der Party neu generiert.',
    )
    gamethread_ident = models.CharField(max_length=255, null=True, blank=True)
    frontend_game_indexes = JSONField(null=True, blank=True)
    started = models.BooleanField(default=False)

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

    def start(self):
        """
        Start the party and send a notification to the party members

        :return:
        :rtype:
        """
        gamethread = GameThread(self)
        gamethread.start()
        self.started = True
        self.gamethread_ident = gamethread.ident
        self.save()
        PartyConsumer.party_started(self.id)

    def stop(self):
        """
        Stops the party and send a notification to the party members
        :return:
        :rtype:
        """
        for thread in threading.enumerate():
            if str(thread.ident) == str(self.gamethread_ident):
                thread.stop()
        self.started = False
        self.save()
        PartyConsumer.party_stopped(self.id)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return 'Party({})'.format(self.pk)