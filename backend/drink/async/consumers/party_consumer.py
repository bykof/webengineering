import json

from channels.generic.websockets import JsonWebsocketConsumer
from django.forms.models import model_to_dict


class PartyConsumer(JsonWebsocketConsumer):
    channel_session = True

    LOBBY_GROUP = 'party_{}'
    PARTY_MEMBER_JOINED = 'party_member_joined'
    PARTY_MEMBER_LEAVED = 'party_member_leaved'
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
        self.send(content=content)

    def disconnect(self, message, **kwargs):
        self.party_member.delete()

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