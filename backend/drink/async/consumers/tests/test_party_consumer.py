from channels.channel import Group
from channels.test.base import ChannelTestCase
from channels import Channel

from async.consumers.party_consumer import PartyConsumer
from core.models.party_member import PartyMember
from core.models.party import Party


class TestPartyConsumer(ChannelTestCase):

    def setUp(self):
        self.party = Party.objects.create()
        self.party_member = PartyMember.objects.create(party=self.party, name='Test Tester')

    def test_party_member_joined(self):
        test_channel = 'test-channel'
        Group(PartyConsumer.LOBBY_GROUP.format(self.party.pk)).add(test_channel)
        PartyConsumer.party_mmber_joined(party_member=self.party_member)
        result = self.get_next_message(test_channel, require=True)
        self.assertEqual(
            result['content']['text'],
            {

            }
        )
