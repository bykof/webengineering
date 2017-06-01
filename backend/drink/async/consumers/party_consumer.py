from channels.generic.websockets import JsonWebsocketConsumer
from django.forms.models import model_to_dict


class PartyConsumer(JsonWebsocketConsumer):
    channel_session = True

    LOBBY_GROUP = 'party_{}'
    PARTY_MEMBER_JOINED = 'party_member_joined'
    CHANNEL_SESSION_PARTY_ID = 'party_id'

    def connection_groups(self, **kwargs):
        return [
            self.LOBBY_GROUP.format(kwargs.get('party_id')),
        ]

    def connect(self, message, **kwargs):
        # TODO: in die session muss die id des partymemebers sein, damit beim disconnect, dieser aus der liste entfernt
        # TODO: entfernt werden kann

        self.message.reply_channel.send({"accept": True})

    def receive(self, content, **kwargs):
        self.send(content=content)

    def disconnect(self, message, **kwargs):
        # TODO: entferne die session vom channel von der party
        pass

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
