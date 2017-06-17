from threading import Thread
from time import sleep

from async.consumers.party_consumer import PartyConsumer


class GameThread(Thread):

    def __init__(self, party, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.party = party
        self.tick = 0
        self.running = False

    @property
    def party_members(self):
        return self.party.partymember_set.all()

    def start(self):
        self.running = True
        super(GameThread, self).start()
    
    def run(self):
        while self.running:
            sleep(1)
            self.tick += 1
            print(self.party.frontend_game_indexes)
            print('Party: {} is running...'.format(self.party))
            if self.tick == 7:
                print('Game in {} starts with {}'.format(self.party, self.party_members))
                PartyConsumer.game_starts(self.party, self.party_members)

    def stop(self):
        self.running = False
