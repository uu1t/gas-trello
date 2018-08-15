# gas-trello

[![Build Status](https://travis-ci.org/kojole/gas-trello.svg?branch=master)](https://travis-ci.org/kojole/gas-trello)

> Google Apps Script library for Trello’s HTTP API

### Library information

- Title: `Trello`
- Script ID: `1ZXi1qEkqy1qibKPs03qU8yJaQQqEnTC5xlWANX1Ywmeqn4fNoUOW-Zf5`
- Latest version: `1`

## Installation

Installation can be done by managing libraries on Script Editor or editing `appsscript.json`.

### on Script Editor

1. Select **Resources > Libraries...** on Script Editor web UI.
2. Paste script ID `1ZXi1qEkqy1qibKPs03qU8yJaQQqEnTC5xlWANX1Ywmeqn4fNoUOW-Zf5` to the **Add a library** text box and click **Add**.
3. Select the latest version of `Trello` library on the **Version** dropdown.

See details in https://developers.google.com/apps-script/guides/libraries#managing_libraries.

### Editing `appsscript.json`

If you can edit the project manifest (`appsscript.json`), add the library information to the `dependencies.libraries[]` list like this:

```json
{
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "Trello",
        "libraryId": "1ZXi1qEkqy1qibKPs03qU8yJaQQqEnTC5xlWANX1Ywmeqn4fNoUOW-Zf5",
        "version": "1"
      }
    ]
  }
}
```

See details in https://developers.google.com/apps-script/concepts/manifests#editing_a_manifest.

## Usage

```js
// Set API key and token by .setkey() and .setToken()
Trello.setKey('YOUR_TRELLO_API_KEY');
Trello.setToken('YOUR_TRELLO_API_TOKEN');

// Send GET, POST, PUT, DELETE requests by .get(), .post(), .put(), .del()

// Get a card by its ID
var card = Trello.get('cards/YOUR_CARD_ID');
// Pass query param object as the second argument
var card = Trello.get('cards/YOUR_CARD_ID', { fields: 'name,labels,due' });

// Create a new card
Trello.post('cards', { idList: 'YOUR_LIST_ID', name: 'New card' });
```

## Doc

### `setKey(key: string): void`

### `setToken(token: string): void`

Set Trello API key and token for subsequent API requests.
You should call these methods before sending API requests.

For details abount Trello API key and token, see https://developers.trello.com/v1.0/reference#api-key-tokens.

### `rest(method: string, path: string, params?: Object): any`

Send API request.

#### Parameters

| key                  | value                                         | Description                                                                 |
| -------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| `method` <br> string | One of: `GET`, `POST`, `PUT`, `DELETE`        | HTTP method to use when making the request to the Trello API.               |
| `path` <br> string   | Valid Trello API path without prepended `/1/` | API path to use, such as `members/me`                                       |
| `params` <br> Object | Default: `{}`                                 | Query parameters to the API path, such as `{ fields: 'username,fullName' }` |

#### Return value

`JSON.parse`ed reponse object.

### `get(path: string, params?: Object): any`

### `post(path: string, params?: Object): any`

### `put(path: string, params?: Object): any`

### `del(path: string, params?: Object): any`

Convenience methods for each HTTP method: `GET`, `POST`, `PUT`, `DELETE`.

`path` and `params` parameters and return value are same as ones of `rest()` method.

## License

[MIT](https://choosealicense.com/licenses/mit/)
