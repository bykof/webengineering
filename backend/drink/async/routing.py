from async.consumers.party_consumer import PartyConsumer

channel_routing = [
    PartyConsumer.as_route(r'^/party/(?P<party_id>[^/]+)/'),
]
