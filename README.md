# corsregistry

CORS enabled npm registry proxy. Primary goal of this repository is to
provide data to https://github.com/anvaka/npmgraph.an

Since the npm registry [does not support cors](https://github.com/npm/npm-registry-couchapp/issues/108)
or [jsonp](https://github.com/npm/npm-registry-couchapp/issues/157) I hacked
this together to alleviate the problem.

The proxy reroutes all requests to https://skimdb.npmjs.com and returns CORS
enabled response for whitelisted domains. The URL mapping is one to one.

# install

With [npm](https://npmjs.org) do:

```
npm install corsregistry
```

You can deploy this to your own [heroku](https://www.heroku.com) instance.
Just make sure to update white-listed domains in the [index.js](https://github.com/anvaka/corsregistry/blob/master/index.js).

# license

MIT
