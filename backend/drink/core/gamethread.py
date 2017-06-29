from threading import Thread
from time import sleep
import random

from async.consumers.party_consumer import PartyConsumer


class GameThread(Thread):
    """
    Ein GameThread sorgt für den Ablauf der Spiele.
    Er wählt zufällig mehrere Spieler aus und zufällig ein Spiel und schickt dies an die PartyMember.

    Regeln:
    - Ein Spiel dauert maximal MAX_SECONDS Sekunden (damit der GameThread die Leute wieder berücksichtigen kann)
    - Das wars :)

    """

    def __init__(self, party, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.party = party
        self.tick = 0
        self.running = False
        self.playing_party_members = []

    @property
    def party_members(self):
        return self.party.partymember_set.all()

    def start(self):
        self.running = True
        super(GameThread, self).start()

    def random_game(self):
        return self.party.frontend_game_indexes[random.randint(0, len(self.party.frontend_game_indexes) - 1)]

    def random_party_members(self):
        """
        Random Party Members gibt 1 oder eine gerade Anzahl oder alle Party Members zurück
        :return:
        :rtype: list
        """
        party_members_length = len(self.party_members)
        max_party_members = random.randint(1, party_members_length)

        if max_party_members == 1 and party_members_length >= max_party_members:
            max_party_members = party_members_length

        if max_party_members % 2 != 0 and max_party_members != party_members_length:
            max_party_members -= 1

        random.shuffle(list(self.party_members))
        return self.party_members[:max_party_members]

    def random_teams(self, party_members):
        """
        Random Teams liefert eine Liste von Listen zurück, worin PartyMembers sind.
        Die Listen in der Liste sind die Teamzusammenstellungen
        :param party_members:
        :type party_members:
        :return:
        :rtype:
        """
        len_party_members = len(party_members)
        if len_party_members % 2 == 0:
            print('party number', len_party_members / 2)

            return [
                party_members[:int(len_party_members / 2)],
                party_members[int(len_party_members / 2):]
            ]
        return [party_members]

    def run(self):
        while self.running:
            sleep(1)
            self.tick += 1
            print('Party: {} is running...'.format(self.party))
            if self.tick == 7:
                selected_party_members = self.random_party_members()
                selected_teams = self.random_teams(selected_party_members)

                PartyConsumer.game_starts(
                    self.party,
                    selected_party_members,
                    selected_teams,
                    self.random_game(),
                )

    def stop(self):
        self.running = False
