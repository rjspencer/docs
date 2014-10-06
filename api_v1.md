# StageBloc API V1
**It's your data, we're just giving it a good home**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API is actively evolving - please check back here for updates and changes.

### Fork us on GitHub!
All of StageBloc's documentation is up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/v1/`. It can generally be assumed that writing endpoints use `POST` requests and reading endpoints use `GET` requests.

### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first [create a StageBloc account](http://stagebloc.com/signup) and then [register your application in the StageBloc backend](http://stagebloc.com/account/admin/management/developers/) to receive a client ID and secret that will allow users to connect with your application.

Requests can be be made with just a `client_id` parameter, but this is restricted to reading (listing) endpoints. In order to make use of any writing (editing) endpoints, an access token (i.e. validated user) must be present.

### Responses
All dates returned are in `GMT / UTC (+0000)` unless otherwise specified. The format of these dates follows PHP [`date() function`](http://php.net/date) function and is `Y-m-d H:i:s` (i.e. `2014-01-01 12:00:00`).

Responses are returned as `JSON`. To receive a `JSONP` response, include a `GET` parameter named `jsonp` specifying the name of your callback method.

Often times, large objects will be returned with just their ID instead of the whole object if they are nested within the main response. To have these objects expanded, just pass a `GET` parameter named `expand` with the comma separated string of the keys you want to expand.

The general structure of a success response can be seen below.  The `data` key will contain the actual response data whereas the `metadata` key will contain informational content about the request.  

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            ...
        }
    }

The general structure of an error response can be seen below.  

    {
        "metadata": {
            "code": 400,
            "error_type": "InvalidData",
            "error": "The error string to present to the user",
            "dev_notes": "Some notes to help a developer debug the issue"
        },
        "data": null
    }

# Authentication
StageBloc uses the [OAuth2](http://oauth.net/2/) authentication process to get an access token from a request token. The access token is then used to make all subsequent requests.

Access tokens can be revoked on a per application basis at any point in time by the user in their settings area in the StageBloc backend.

Depending on the endpoint, differing levels of authentication exist. Some endpoints require that the authenticated user be a fan while other require that they be an admin of the account.

At the very least, a `client_id` must usually be passed with each request depending on the authentication level of that endpoint. However, if the request is made on behalf of an authenticated user, a `client_id` is not necessary.

Once an access token is received, it should be passed with the request as an HTTP header: `Authorization: OAuth <access token here>`

## /oauth2
`[POST]`  
This endpoint is used to get a request token.

username _(required)_

    the email or username of the user trying to authenticate

password _(required)_

    the password of the user trying to authenticate

response\_type _(required)_

    the response type you'd like to receive

    possible value is `code`

client\_id _(required)_

    the ID of the application this user is connecting to (applications can be created in the backend of StageBloc)

    possible values are any client ID that matches a registered application

redirect\_uri _(required)_

    the redirect URI tied to the application you're connecting the user to

    possible values are the URI that matches the application being used

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "code": "<client ID here>"
        }
    }

## /oauth2/token
`[POST]`  
This endpoint is used to get an access token once a request token is received.

client\_id _(required)_

    the ID of the application this user is connecting to (applications can be created in the backend of StageBloc)

    possible values are any client ID that matches a registered application

client\_secret _(required)_

    the secret of the application this user is connecting to

    possible values are the client secret that matches the application of the passed client ID

grant\_type _(required)_

    the grant type being requested

    possible value is `authorization_code`

code _(required)_

    the request token code received after connecting with the `/oauth2` endpoint

    possible values are any string received during the authentication / connection process
    
include\_admin\_accounts

    whether or not to include the authenticated user's admin accounts with the `access_token` in the response

    accepted values are `true` or `false`

    defaults to `false`

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "access_token": "<access token here>",
            "scope": "non-expiring",
            "user": 1,
            "admin_accounts": [
                <admin accounts here if requested>
            ]
        }
    }
    
# Accounts
These endpoints revolve around StageBloc accounts and their data. An account can have any number of admins, and all content on StageBloc is tied to an account.

## /account/{accountId}
`[GET]`  
Gets an account's information from its ID.

`[POST]`  
Updates an account by its ID. Only admins of the account can use this endpoint.

### POST Variables

`name`
`description`
`stagebloc_url`

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "id": 1,
            "url": "http:\/\/customdomain.com",
            "stagebloc_url": "demo",
            "name": "Demo Account",
            "description": "Description here...",
            "type": "business",
            "stripe_enabled": true,
            "verified": true,
            "photo": {
                <see structure for a photo response>
            }
        }
    }

## /account/{accountId}/content
`[GET]`
Gets an activity stream of recent content from the account. TODO: Need to make second column wider maybe

## /account/{accountId}/children/{type}
`[GET]`
Gets the children accounts of a parent account.

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "child_account_types": [
                "artist",
                ...
            ],
            "child_accounts": [
                <child accounts listed here>
            ]
        }
    }

# Users
These endpoints revolve around StageBloc users and their data. A user on StageBloc can be an admin for any amount of accounts, and their login is tied to their email address. A user can also be a fan of any number of accounts. These endpoints allow for management of both admin and fan relationships between users and their accounts.

## /users/me
`[GET]`  
Gets the currently authenticated user's information.

`[POST]`  
Updates the currently authenticated user's information.

### POST Variables

`bio`  
`birthday`  
`email`  
`username`  
`name`  
`gender`

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "id": 8,
            "url": "https:\/\/stagebloc.dev\/user\/testuser",
            "created": "2009-10-27 14:29:16",
            "name": "Test User",
            "username": "testuser",
            "bio": "Biography here...",
            "color": "70,170,255",
            "birthday": "1995-07-05",
            "gender": "male",
            "email": "testuser@sb.com",
            "photo": {
                "width": 525,
                "height": 500,
                "images": {
                    "thumbnail_url": "http://placekitten.com/300/300",
                    "small_url": "http://placekitten.com/300/300",
                    "medium_url": "http://placekitten.com/300/300",
                    "large_url": "http://placekitten.com/300/300",
                    "original_url": "http://placekitten.com/300/300"
                }
            }
        }
    }

### Response Explanation

email

    this is only included for the currently authenticated user (i.e. won't show up for users other than the authenticated one)

birthday

    this is only included for the currently authenticated user (i.e. won't show up for users other than the authenticated one)

photo

    the user's photo

    the width and height are the dimensions of the originally uploaded photo

## /users/{userId}
`[GET]`
Gets a user by their user ID.

### Example Response

See the response for `/users/me`

# Store and Commerce
These endpoints revolve around StageBloc store and commerce data in the backend. They can be used for tasks including retrieving store items and orders, updating orders, or getting analytics from a store.

## /store/dashboard
`[GET] /account/{accountId}/store/dashboard`  
This endpoint is used to get stats and data regarding commerce and sales (very similar to the data shown on the Store dashboard in the StageBloc backend). It will provide all time, overall stats regarding your store and its revenue as well as results per country you've had at least one order in.

When dealing with monetary values, the currency will be USD.

    {
        "metadata": {
            "http_code": 200
        },
        "data": {
            "total_revenue": 3959.27,
            "total_orders": 204,
            "average_order_price": 19.41,
            "countries": {
                "CAN": {
                    "name": "Canada",
                    "total_orders": 8,
                    "total_revenue": 225.99
                },
                "GBR": {
                    "name": "United Kingdom",
                    "total_orders": 3,
                    "total_revenue": 27.01
                },
                "USA": {
                    "name": "United States of America",
                    "total_orders": 116,
                    "total_revenue": 2836.79
                },
                ...
            }
        }
    }

## /store/items
`[GET] /account/{accountId}/store/items`  
This endpoint is used to get a listing of store items belonging to an account.

order_by

    how to order the returned items

    accepted values are `created`, `modified`, and `price`

    defaults to `created`

direction

    what direction to order the returned items

    accepted values are `ASC` and `DESC`

    defaults to `DESC`

limit

    the number of items to limit the response to

    accepted values are any positive number

    defaults to 50

offset

    how much to offset the returned items by

    accepted values are any number greater than or equal to zero

    defaults to 0

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": [{
            "id": 131,
            "type": "physical",
            "account": 1,
            "title": "Test Shirt",
            "short_url": "http:\/\/stgb.dev\/st\/3g",
            "description": "",
            "sold_out": false,
            "exclusive": false,
            "featured": false,
            "created": "2014-08-03 19:11:19",
            "created_by": 8,
            "modified": "2014-08-03 19:27:45",
            "modified_by": 8,
            "fans_name_price": true,
            "category": null,
            "prices": [{
                "currency": "usd",
                "price": 12
            }],
            "shipping_providers": [{
                "id": 1,
                "name": "Flat Rate",
                "price": 3
            }, {
                "id": 2,
                "name": "USPS",
                "origin_zip_code": "53103",
                "handling_fee": 2
            }],
            "on_sale": false,
            "options": [{
                "name": "Main",
                "sku": "7HWE49JA",
                "upc": null,
                "unlimited": true,
                "sold_out": false,
                "quantity": null,
                "low_stock_threshold": 10,
                "weight": 2,
                "weight_unit": "ounces",
                "height": 0,
                "width": 0,
                "length": 0
            }],
            "photo": 3231,
            "photos": 5
        }, {
            "id": 124,
            "type": "bundle",
            "account": 1,
            "title": "All sorts of stuff",
            "short_url": "http:\/\/stgb.dev\/st\/39",
            "description": "",
            "sold_out": false,
            "exclusive": false,
            "featured": false,
            "created": "2014-07-31 11:59:17",
            "created_by": 8,
            "modified": "2014-08-05 16:30:15",
            "modified_by": 8,
            "fans_name_price": false,
            "category": null,
            "prices": [{
                "currency": "usd",
                "price": 20
            }],
            "living_bundle": false,
            "bundled_items": {
                "store_items": [ ... ],
                "audio": [ ... ],
                "audio_playlists": [ ... ]
            },
            "on_sale": false,
            "photo": null,
            "photos": 0
        }]
    }

### Response Explanation

type

    the type of store item this is
    
    possible values are "physical", "experience", "digital", or "bundle"
    
shipping_providers

    the available shipping methods for this store item, only shows up for items of type "physical"
    
options

    the various SKUs available for this product and their related data
    
bundled_items

    the store items that are in this bundle, only shows up for items of type "bundle"
    
    other store items, audio tracks, or audio playlists can be bundled and will be listed under their respective section in this array
    
photos

    the number of photos this store item has
    
    if you specify to expand the photos key, it will be an array of the photos for this item
    
## /store/orders
`[GET] /account/{accountId}/store/orders`  
This endpoint is used to get retrieve orders that have been made in your store.

When dealing with monetary values, the currency will be USD unless otherwise specified.

order_by

    how to order the returned items
    
    accepted values are `ordered` and `totalAmount`
    
    defaults to `ordered`
    
direction

    what direction to order the returned items
    
    accepted values are `ASC` and `DESC`
    
    defaults to `DESC`
    
limit

    the number of items to limit the response to
    
    accepted values are any positive number
    
    defaults to 50
    
offset

    how much to offset the returned items by
    
    accepted values are any number greater than or equal to zero
    
    defaults to 0

### Example Response

    {
        "metadata": {
            "http_code": 200
        },
        "data": [{
            "id": 580,
            "account": 1,
            "ordered": "2014-08-10 23:18:02",
            "shipped": false,
            "currency": "usd",
            "total": 26.62,
            "total_usd": 26.62,
            "shipping_amount": 5.6,
            "tax_amount": 1.02,
            "stripe_charge_id": "<Stripe charge ID>",
            "email": "testfan@stagebloc.com",
            "user": { <user object> },
            "address": {
                "street_address": "12345 Main Street",
                "street_address_2": "",
                "city": "Chicago",
                "state": "IL",
                "postal_code": "60647",
                "country": "US"
            },
            "transactions": [{
                "id": 2968,
                "modified": "2014-08-10 23:18:03",
                "amount": 0,
                "quantity": 1,
                "item": {
                    "type": "store",
                    "object": { <store object> }
                },
                "shipping": {
                    "provider": "USPS",
                    "method": "USPS Priority Mail",
                    "shipped": null,
                    "tracking_number": null
                }
            }, {
                "id": 2969,
                "modified": "2014-08-10 23:18:03",
                "amount": 0,
                "quantity": 1,
                "item": {
                    "type": "audio",
                    "object": { <audio obkect> }
                }
            }]
        }, {
            "id": 579,
            "account": 1,
            "ordered": "2014-08-10 20:25:55",
            "shipped": false,
            "currency": "usd",
            "total": 31.17,
            "total_usd": 31.17,
            "shipping_amount": 7,
            "tax_amount": 1.17,
            "stripe_charge_id": "<Stripe charge ID>",
            "email": "fakemail@stagebloc.com",
            "user": null,
            "address": {
                "street_address": "555 Main Street",
                "street_address_2": "",
                "city": "Chicago",
                "state": "IL",
                "postal_code": "60642",
                "country": "US"
            },
            "transactions": [{
                "id": 2966,
                "modified": "2014-08-10 20:25:57",
                "amount": 23,
                "status": "Paid",
                "quantity": 1,
                "item": {
                    "type": "store",
                    "object": { <store object> }
                },
                "shipping": {
                    "provider": "USPS",
                    "method": "USPS Priority Mail",
                    "shipped": null,
                    "tracking_number": null
                }
            }]
        }]
    }
    
### Response Explanation

user

    this will be `null` if the order was a guest checkout
    
transactions

    this will list the items in this order
    
transactions item type

    this will list the type of item that was ordered
    
    possible values are "audio", "audio_playlist", "store", "theme", and "fan_club_subscription"
    
## /store/orders/{orderId}
`[POST] /account/{accountId}/store/orders/{orderId}`  
This endpoint can be used to update various elements about orders.

`shipped`  _(required)_  
A date string that specifies when this order was shipped

`tracking_number`  
An optional tracking number for when this item was shipped

`carrier`  
An optional carrier that this was shipped with for use with the `tracking_number`
