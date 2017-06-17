import json

from channels.generic.websockets import JsonWebsocketConsumer
from django.forms.models import model_to_dict


class PartyConsumer(JsonWebsocketConsumer):
    channel_session = True

    LOBBY_GROUP = 'party_{}'
    PARTY_MEMBER_JOINED = 'party_member_joined'
    PARTY_MEMBER_LEAVED = 'party_member_leaved'
    PARTY_STARTED = 'party_started'
    PARTY_STOPPED = 'party_stopped'
    GAME_STARTS = 'game_starts'
    CHANNEL_SESSION_PARTY_ID = 'party_id'

    @staticmethod
    def query_string_to_dict(query_string):
        return {
            key_value.split('=')[i]: key_value.split('=')[i + 1]
            for key_value in query_string.split('&')
            for i in range(0, len(key_value.split('=')))
            if i % 2 == 0
        }

    @property
    def party_member(self):
        # Lazy Import
        from core.models.party_member import PartyMember
        # Hole den Partymember aus der Channel Session
        return PartyMember.objects.get(id=self.message.channel_session['party_member'].get('id'))

    def connection_groups(self, **kwargs):
        return [
            self.LOBBY_GROUP.format(kwargs.get('party_id')),
        ]

    def connect(self, message, **kwargs):
        # Hole den Partymember aus dem Querystring in der URL
        query = self.query_string_to_dict(message.content.get('query_string'))

        # Setze den Partymember
        party_member = json.loads(query.get('party_member', {}))

        if party_member:
            message.channel_session['party_member'] = party_member
            self.message.reply_channel.send({"accept": True})

    def receive(self, content, **kwargs):
        self.group_send(
            self.LOBBY_GROUP.format(self.kwargs.get(self.CHANNEL_SESSION_PARTY_ID)),
            content
        )

    def disconnect(self, message, **kwargs):
        party = self.party_member.party
        self.party_member.delete()
        if party.partymember_set.count() == 0:
            if party.gamethread_ident:
                party.stop()

    @classmethod
    def party_member_joined(cls, party_member):
        """
        
        :param party_member: Der gejointe Partymember
        :type party_member: core.models.party_member.PartyMember
        :return: e
        :rtype: 
        """
        cls.group_send(
            cls.LOBBY_GROUP.format(party_member.party_id),
            {
                'party_member': model_to_dict(party_member),
                'action': cls.PARTY_MEMBER_JOINED,
            },
        )

    @classmethod
    def party_member_leaved(cls, party_member):
        """

        :param party_member: Der verlassene Partymember
        :type party_member: core.models.party_member.PartyMember
        :return: e
        :rtype:
        """
        cls.group_send(
            cls.LOBBY_GROUP.format(party_member.party_id),
            {
                'party_member': model_to_dict(party_member),
                'action': cls.PARTY_MEMBER_LEAVED,
            },
        )

    @classmethod
    def party_started(cls, party_id):
        """
        LETS GET THIS PARTY STARTED!

        :return:
        :rtype:
        """
        cls.group_send(
            cls.LOBBY_GROUP.format(party_id),
            {
                'action': cls.PARTY_STARTED,
            }
        )

    @classmethod
    def party_stopped(cls, party_id):
        """
        LETS GET THIS PARTY STOPPED!

        :return:
        :rtype:
        """
        cls.group_send(
            cls.LOBBY_GROUP.format(party_id),
            {
                'action': cls.PARTY_STOPPED,
            }
        )

    @classmethod
    def game_starts(cls, party, party_members):
        cls.group_send(
            cls.LOBBY_GROUP.format(party.id),
            {
                'action': cls.GAME_STARTS,
                'party_members': [
                    model_to_dict(party_member)
                    for party_member in party_members
                ]
            }
        )