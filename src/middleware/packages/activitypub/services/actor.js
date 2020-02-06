const ActorService = {
  name: 'activitypub.actor',
  dependencies: ['activitypub.collection', 'ldp'],
  actions: {
    async create(ctx) {
      const actorUri = ctx.params.userData['@id'];

      // Create the collections associated with the user
      await ctx.call('activitypub.collection.create', { collectionUri: actorUri + '/following', ordered: false });
      await ctx.call('activitypub.collection.create', { collectionUri: actorUri + '/followers', ordered: false });
      await ctx.call('activitypub.collection.create', { collectionUri: actorUri + '/inbox', ordered: true });
      await ctx.call('activitypub.collection.create', { collectionUri: actorUri + '/outbox', ordered: true });

      // Attach the newly-created collections to the user's profile
      // await this.broker.call('ldp.patch', {
      //   resourceUri: actorUri,
      //   accept: 'json',
      //   '@context': 'https://www.w3.org/ns/activitystreams',
      //   // TODO find a way to add two types with the patch method
      //   '@type': ['Person', 'http://xmlns.com/foaf/0.1/Person'],
      //   preferredUsername: ctx.params.userData.nick,
      //   name: ctx.params.userData.name + ' ' + ctx.params.userData.familyName,
      //   following: actorUri + '/following',
      //   followers: actorUri + '/followers',
      //   inbox: actorUri + '/inbox',
      //   outbox: actorUri + '/outbox'
      // });

      this.broker.emit('actor.created', ctx.params.userData);
    }
  },
  events: {
    async 'webid.created'(userData) {
      await this.broker.call('activitypub.actor.create', { userData });
    },
    'actor.created'() {
      // Do nothing. We must define one event listener for EventsWatcher middleware to act correctly.
    }
  }
};

module.exports = ActorService;