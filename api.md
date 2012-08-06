# Home
**"It's your data, we're just giving it a good home."**

Use the StageBloc API to develop custom, standalone integrations with StageBloc.

### Under Development
The API (and therefore these docs) are still currently under development. That means that there will be changes made, so if you're planning on using the API, check back here for updates and changes frequently.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

# General Information
The root URL of the API is `https://api.stagebloc.com/2.0/`.

Responses can be formatted in either JSON or XML by simply changing the extension of the endpoint between `.xml` and `.json`. For instance, to list an accounts blog entries, you could use either `/blog/list.xml` or `/blog/list.json`.



### Authorization
Connecting with the StageBloc API uses the OAuth 2.0 standard. You must first register your application in the StageBloc backend to receive a client ID and secret that will allow users to connect with your application.

### Wrappers
There is currently a PHP wrapper available for connecting with the API. It can be found on [GitHub](https://github.com/stagebloc/php-stagebloc-api). Instructions for how to use it are included in the `README` file of that repository.

If you want to create your own wrapper in another language, please do! Let us know, and we can link to it from here.

# /blog
This endpoint is used for interacting with an account's blog posts.

## /list
order_by
:	how to order the results, _possible values are published, created, modified, or title_, *defaults to published*

direction
:	what direction to return the results in, _possible values are ASC or DESC_, *defaults to DESC*

limit
:	the limit of results to return, *default is none*

offset
:	the offset of the results to returns, *defaults to 0*

status
:	comma seperated list of the status of blog entries to return, _possible values are 0 (draft) or 1 (published)_, *defaults to 1*

year
:	the year to limit the published dates of the entries to, *defaults to none*

month
:	the month to limit the published dates of the entries to, *defaults to none*

ignore_sticky
:	whether or not to ignore sticky posts (i.e. posts that will be returned first regardless of the `order_by` and `direction` parameters)

### Example Response (XML)
    <response>
      <total>486</total>
      <items>
        <item>
          <id>6317</id>
          <title>Blog Post Title!</title>
          <body>Blog post body!</body>
          <status>1</status>
          <short_url>http://stgb.com/b/2SV</short_url>
          <published>2012-06-25 12:30:00</published>
          <created>2012-06-25 12:30:53</created>
          <modified>2012-07-17 15:33:11</modified>
          <sticky>0</sticky>
          <exclusive>1</exclusive>
          <user>
            <id>8</id>
            <email>hi@stagebloc.com</email>
            <name>Demo Admin</name>
          </user>
          <modified>2012-07-17 15:33:11</modified>
          <modified_by>
            <id>8</id>
            <email>hi@stagebloc.com</email>
            <name>Demo Admin</name>
          </modified_by>
        </item>
      </items>
    </response>
    
### Example Response (JSON)
    {
        "response": {
            "total": "486",
            "items": [{
                "item": {
                    "id": "6317",
                    "title": "Blog Post Title!",
                    "body": "Blog post body!",
                    "status": "1",
                    "short_url": "http:\/\/stgb.local\/b\/2SV",
                    "published": "2012-06-25 12:30:00",
                    "created": "2012-06-25 12:30:53",
                    "modified": "2012-07-17 15:33:11",
                    "sticky": "0",
                    "exclusive": "1",
                    "user": {
                        "id": "8",
                        "email": "hi@stagebloc.com",
                        "name": "Demo Admin"
                    },
                    "modified_by": {
                        "id": "8",
                        "email": "hi@stagebloc.com",
                        "name": "Demo Admin"
                    }
                }
            }]
        }
    }