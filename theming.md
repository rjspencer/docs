# Home
Hello there. You are about to embark on an epic journey through StageBloc's theming engine documentation. It may sound scary, but if you have a basic understanding of HTML, CSS, or JavaScript, you should not have any issues.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

## Requirements
Here are a few (loose) requirements to keep in mind when submitting and creating a theme:

1. Please host all external assets on our CDN.

2. If you're creating a mobile theme, please be sure to include the `ShowMobileSiteLink` and `ShowDesktopSiteLink` variables so that users can choose which version of a site to see.

## Code Style Guidelines
Here are a few tips and tricks that we have when writing a theme. These are just some loose guidelines -- don't follow them if necessary.

* Use semicolons in JavaScript. We do compress / minify your JavaScript before we upload it to our CDN, which may cause issues from time to time.

* Remember to keep metadata in mind. For instance, when people share links to Facebook, you have control over the information Facebook pulls from the page. Check out this [obligatory StackOverflow post](http://stackoverflow.com/a/7623986/115629) for more info.

## General Information
Here is some general information about custom themes.

* If you don't explicitly provide a favicon in the `<head>` of your HTML, we'll add the [default StageBloc favicon](https://stagebloc.com/images/favicon.ico) for you. To add your own favicon, simply upload it as a Theme Asset and put it in your theme's `<head>` HTML tag.

* We also add various `<meta>` tags to your `<head>` content if they aren't explicitly set to aid in SEO. For instance, many tags from the [Open Graph Protocol](http://ogp.me/) are automatically added.

* We allow you to upload assets *(images, fonts, favicons, etc)* to our CDN and encourage you to use this when creating a theme. This means you don't have to host any part of your theme outside of StageBloc, making it easier for you.

* CSS and JS are both minified before being uploaded to our CDN so that you get the maximum performance and caching when users come to your site.

# Pages
Each view on StageBloc has a `{Page}` block. [You can also create your own custom pages](#custom-pages). The URL structure shown is the default, they can be altered via the `url` [Page Option](#page-options).

*Note: Not all pages are required. Define pages that make sense for your theme, and the rest will be taken care of by the theming engine. No links will be broken.*

### page:About
This page should show general information about the account.

Url structure: /about  
Recommended modules: AccountAbout

### page:ActivityStreamList
This page should show a listing of content posted and reposted by the current account. *By default this is the homepage.*

Url structure: /activities  
Recommended modules: ActivityStreamList

### page:AudioList
This page should show a listing of audio content such as audio objects or audio playlists.

Url structure: /audio  
Recommended modules: AudioList, AudioView, AudioPlaylistList, AudioPlaylistView

### page:AudioView
This page should show content for an audio object.

Url structure: /audio/[%id]  
Recommended modules: AudioView

### page:AudioPlaylistList
This page should show a listing of audio playlists

Url structure: /audio/playlists  
Recommended modules: AudioPlaylistView

### page:AudioPlaylistView
This page should show content for an audio playlist.

Url structure: /audio/playlists/[%id]  
Recommended modules: AudioPlaylistView

### page:BlogList
This page should show a listing of blog posts posted by the account.

Url structure: /blog  
Recommended modules: BlogList, BlogView

### page:BlogView
This page should show the content of an individual blog post.

Url structure: /blog/[%id]  
Recommended modules: BlogView

### page:BlogCommentView
This page should show the content of an individual blog post comment.

Url structure: /blog/comment/[%id]  
Recommended modules: CommentView, BlogView

### page:Error404
This page will be loaded whenever a unknown URL structure is hit.  *Note: This page will not be called when no content is available for a defined view. Also see {Else} blocks for Modules*

Url structure: /PageThatDoesNotExist

### page:EventPastList
This page should show a listing of events that have already finished.

Url structure: /events/past  
Recommended modules: EventList

### page:EventUpcomingList
This page should show a listing of events that have not yet finished.

Url structures: /events  &  /events/upcoming  
Recommended modules: EventList

### page:EventView
This page should show information for an event.

Url structure: /events/[%id]  
Recommended modules: EventView

### page:Fansite
This page should use `{if:UserIsFollowing}` and show fansite content if true or a `JoinFansiteLink` if false

Url structure: /fansite/
Recommended modules: ActivityStreamList with `exclusive` as true

### page:PhotoAlbumList
This page should show a listing of photo albums

Url structure: /photos/albums/  
Recommended modules: PhotoAlbumList

### page:PhotoAlbumView
This page should show the photos contained inside a photo album.

Url structure: /photos/albums/[%id]  
Recommended modules: PhotoAlbumView

### page:PhotoList
This page should show a listing of either (a) all photos or (b) all photo albums.

Url structure: /photos  
Recommended modules: PhotoList

### page:PhotoView
This page should show a single photo.

Url structure: /photos/[%id]  
Recommended modules: PhotoView

### page:StatusList
This page should show a listing of statuses posted by the account.

Url structure: /statuses  
Recommended modules: StatusList

### page:StatusView
This page should show an individual status.

Url structure: /statuses/[%id]  
Recommended modules: StatusView

### page:StoreItemList
This page should show a listing of store items posted by the account.

Url structure: /store  
Recommended modules: StoreItemList

### page:StoreItemView
This page should show an individual store item.

Url structure: /store/[%id]
Recommended modules: StoreItemView

### page:User
This page shows an individual fan of an account

Url structure: /fansite/user/[%id]
Recommended modules: UserView

### page:VideoList
This page should show a listing of videos.

Url structure: /videos/  
Recommended modules: VideoList

### page:VideoView
This page should show the content for an individual video.

Url structure: /videos/[%id]  
Recommended modules: VideoView

### page:VideoPlaylistList
This page should show a listing of video playlists.

Url structure: /videos/playlists
Recommended modules: ViewPlaylistList

### page:VideoPlaylistView
This page should show an individual video playlist.

Url structure: /videos/playlists/[%id]  
Recommended modules: ViewPlaylistView

## Page Options
Pages, like [Variables With Options](#variables-with-options), can have their own options.

homepage
:	flag representing if the page should be used as the homepage

	accepted values are true or false
	
	default homepage is `ActivityStreamList`, if that Page isn't defined the first defined Page in the theme's HTML will be used as the homepage
	
url
:	the URL to override the page's default URL

	accepted values are any string valid in a URL

		{Page:EventList url="shows"}
			<!-- The events page would now be at /shows, not /events -->
		{/Page:EventList}

## Custom Pages
Custom pages can be defined using the following syntax:
	
	{Page:CustomMyAwesomePage}
	
	{/Page:CustomMyAwesomePage}

They can contain any modules or blocks that you choose to put inside of them, however pagination may not be reliable. The page URL of the example page above will be /MyAwesomePage
 
# Variables

Variables use the following syntax:
	
	{VariableName}
	{VariableWithOption option1="value" option2="value"}
	  
## Global Variables
To use a global variable, simply place `{VariableName}` anywhere inside of your theme.

### AccountName
Returns the account's Account Name

### Body-ID
Returns the general section the page is in. Eg: blog, statuses, video, audio

### CSS
Returns a `<link rel="stylesheet" />` tag with a link to the theme's CSS on StageBloc's CDN.

### JS
Returns a `<script src="">` tag with a link to the theme's JS on StageBloc's CDN.

### jQuery
Include the latest version of jQuery on the page via Google's CDN.

*Note: this variable will eventually support defining a specific version to grab from Google*

### jPlayer
Include the jPlayer JavaScript library. Requires that {jQuery} is also included and comes before the {jPlayer} variable.

### Link-\[%Section]
Get a relative url to a particular section of the site. *Note: This will also reflect any changes to [Page URLs](#page-options) you might have made*

Supported: Audio, Events, EventsPast, Blog, Statuses, Photos, Videos, Home, Store, Fansite

	<a href="{Link-Videos}">See my killer video about how to weave baskets underwater!</a>
	becomes
	<a href="/account-name-or-custom-domain/videos">See my killer videos about how to weave baskets underwater!</a>

## Custom Variables
You can define blocks of code to reuse throughout the rest of your theme. This can be useful when repeating layout elements on your site on some pages, but not others.

To define a variable, use the following syntax:

	{variable:CustomMyCoolVariable}
		<aside>Hi there, I am a nifty variable!</aside>
	{/variable:CustomMyCoolVariable}

In this example, your variable name is `MyCoolVariable`. Note that custom variables, like custom homepages, must start with the word `Custom`.

After defining your variable, you can access its data just like a normal global variable.

	{CustomMyCoolVariable}

This will return exactly what was inside your declaration.

	<aside>Hi there, I am a nifty variable!</aside>

You can put anything inside your variables, including modules, blocks, and pages. Get creative and build some unique sites!

## {option} Variables
You can set up ways for StageBloc users to customize their theme to their liking without them doing any HTML/CSS/JS editing with custom theme {option}s.

*Note: These shouldn't be used as theme assets (things users won't change, such as sprites)*

*Note: Less is often more. If someone wants very specific, fine tune control, it's best if they just edit the theme.*

Examples (line spacing for legibility):

	{option:Image
		group="background"
		name="image"
		format="background-image: url(%s);"
		defaultFormat=""
	}

After the first instance not all options need be defined. Simply provide `group` and `name` and the value from the first use will be returned.

Example:

	div#one {
		{option:Select group="background" name="BG Color" format="background-color: %s;" presets="red,blue,green,yellow,magenta" default="red"}
	}

	/* Now that the entire option variable has been defined, this second instance does not require as much data */
	div#two {
		{option:Select group="background" name="BG Color"}
	}

### option:*
These options are common across all of the following `{option}` variables.

name (*required*)
:	the name of the option field. Also the title in the left side of the theme management area

group
:	items in groups are name-spaced and put together in the theme management options area

format
:	the way the data is outputted. This is equivalent to [PHP's sprintf()](http://php.net/sprintf) if you'd like to force a format. Default: `%s`

defaultFormat
:	format of the default data. Default: copy of `format`

default
:	when no value has been specified, use this data is used instead

### option:Image
Provides users with a file upload box where they can upload JPEG, GIF, and PNG files to be used in the theme. Data returned is the full URL to the image uploaded.

### option:Color
Provides users with a color select box. Data returned is a full HEX value including pound sign OR the three RGB values comma separated (see `rgb` option).

rgb
:	if true, returns three numbers comma separated, if false hex. Default: false.
	ex: 255,255,255 or #ffffff

### option:Select
Provides users with a drop down box containing a list of predefined values. Data returned is the value selected.

presets
:	define a comma separated list of values

		{option:Select
			group="background"
			name="repeat"
			format="background-repeat: %s;"
			presets="repeat,no-repeat,repeat-x,repeat-y"
			default="no-repeat"
		}


### option:Textarea
Provides users with a textbox where they can input any string. Data returned is user's string.

## Variables with Options
Variables with options use the following syntax:

	{VariableName option1="value" option2="value"}
	
### AccountPhotoUrl
The URL for the account's photo	

size
:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

defaultPhoto
:	the URL of a photo to use if one isn't set and you don't want to use our default photo

### AdminListLikeCount
Shows the amount of likes the collective admins for an account have

oneItemText
:	the text to append to the count if it happens to be 1

numerousItemText
:	the text to append to the count if it is anything other than 1

### AudioAddToCartLink
Creates a link that, when clicked, will add the item to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag

    defaults to `"Add To Cart"`

audioid (*required*)
:	the ID of the audio you want to add to the user's cart

class
:	the class to assign to the `<a>` tag

### AudioFreeDownloadLink
Creates a link that, when clicked, will download an audio file (unless it requires a follow to download, in which a modal will first show up)

text
:	the text to be put inside the `<a>` tag

    defaults to `"Download"`

audioid (*required*)
:	the ID of the audio you want to download

class
:	the class to assign to the `<a>` tag

### AudioPlaylistAddToCartLink
Creates a link that, when clicked, will add the audio playlist to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag

    defaults to `"Add To Cart"`

preorderText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist

    defaults to `"Pre-order"`

preorderSoldOutText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist and it has sold out (if it has a limit on the amount of orders)

    defaults to `"Pre-order Sold Out"`

audioplaylistid (*required*)
:	the ID of the audio you want to add to the user's cart

class
:	the class to assign to the `<a>` tag

### AudioPlaylistFreeDownloadLink
Creates a link that, when clicked, will download an audio playlist (unless it requires a follow to download, in which a modal will first show up) *Note: This will check to make sure a playlist is capable of being downloaded for free as well*

text
:	the text to be put inside the `<a>` tag

    defaults to `"Download"`

audioplaylistid (*required*)
:	the ID of the audio playlist you want to download

class
:	the class to assign to the `<a>` tag

### ChildsAccountIDs
A comma seperated list of children accountIDs of the current account, useful with the `accountid` parameter of some modules

type
:	the type of accounts to limit the results to

    accepted values are any comma seperated combination of `alumni`, `artists`, or `management`

    defaults to `alumni,artist,management` (all three)

includeCurrent
:    whether or not to include the current account with the children

    accepted values are `true` or `false`
    
    defaults to `false`
    
### CommentLink
Add a link to comment on a specific item in a modal, will also show any previously existing comments

LinkText
:	the text to show in the link for adding a comment

    defaults to `"Add A Comment"`

class
:	the class to give the `<a>` tag

### CreatedDate, ModifiedDate, PublishedDate
Show the date of various objects
  
format
:	the format of the date according to [PHP date() function](http://php.net/date) 

    accepted values are a formatted date, `relative` (returns time ago such as "5 seconds ago"), or `gmdate` (a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream))

    defaults to `n/j/y`
    
### JoinFansiteLink
A link that opens a modal and allows a user to join the site's fansite

text
:	the text to be put inside the `<a>` tag

    defaults to `"Join Fansite"`

class
:	the class to assign to the `<a>` tag

### LikeLink
Add a link to like a specific item  

likeText
:	the text to show when the item hasn't yet been liked by the viewer

    defaults to `"Like"`

unlikeText
:	the text to show when the item has been liked by the viewer

    defaults to `"Unlike"`

class
:	the class to give the `<a>` tag

### PhotoAddToCartLink
Creates a link that, when clicked, will add the photo to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag

    defaults to `"Add Print To Cart"`

photoid (*required*)
:	the ID of the photo you want to add to the user's cart

class
:	the class to assign to the `<a>` tag

### ReportContentLink
A link to open a modal for reporting (flagging) content as inappropriate, etc

linkText
:	the text to show in the '<a>' tag

	defaults to `"Report Content"`

class
:	the class to give the `<a>` tag

### RepostLink
Add a link to repost a specific item

repostText
:	the text to show when the item hasn't yet been reposted by the viewer

    defaults to `"Repost"`

unrepostText
:	the text to show when the item has been reposted by the viewer

    defaults to `"Unrepost"`

class
:	the class to give the `<a>` tag

### SecureEmail
Securely put a mailto: link in a theme  

address (*required*)
:	the email address

text
:	the text inside the `<a>` tag

    defaults to `address`

### ShowDesktopSiteLink
Creates a link that, when clicked, will force the browser to show the desktop version of a site, this link will only be added if the browser is a mobile browser

text
:	the text to be put inside the `<a>` tag

    defaults to `"Desktop Site"`
    
class
:	the class to assign to the `<a>` tag

### ShowMobileSiteLink
Creates a link that, when clicked, will force the browser to show the mobile version of a site for a month (via a cookie), this link will only be added if the browser is a mobile browser

text
:	the text to be put inside the `<a>` tag

    defaults to `"Mobile Site"`
    
class
:	the class to assign to the `<a>` tag

### StoreItemAddToCartLink
Creates a link that, when clicked, will add the store item to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag

    defaults to `"Add To Cart"`

preorderText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist *defaults to "Pre-order"*

preorderSoldOutText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist and it has sold out (if it has a limit on the amount of orders)

    defaults to `"Pre-order Sold Out"`

storeitemid
:	the ID of the audio you want to add to the user's cart

	defaults to the ID of the currently rendered `block`

class
:	the class to assign to the `<a>` tag

### StoreItemFreeDownloadLink
Creates a link that, when clicked, will download a store item (unless it requires a follow to download, in which a modal will first show up)

text
:	the text to be put inside the `<a>` tag

    defaults to `"Download"`

storeitemid
:	the ID of the audio playlist you want to download

	defaults to the ID of the currently rendered `block`

class
:	the class to assign to the `<a>` tag

### SubmitFanContentLink
Creates a link that, when clicked, will open a modal to allow the fan to submit content

linktext
:	the text to be put inside the `<a>` tag

    defaults to `"Add Content"`

contenttype
:	the content type to default to in the modal, either `status`, `photo`, `blog`, or `video`

	defaults to `status`

class
:	the class to assign to the `<a>` tag

# If Statements
If statements will check if a certain statement is true, and if it is, add the code inside. We also support the use of `{if:Else}` delimiters that will add a different code block if false. For example:
	
	{if:EventHasMinimumAge}
		This event requires that you are over the age of {EventAge} to enter.
	{if:Else}
		This event allows people (and aliens disguised as people) of any age to enter.
	{/if:EventHasMinimumAge}

Most if statements will only function in certain modules or blocks.

Nesting of if statements is also supported. For example:

	{if:AudioCanBeSold}
		{AudioAddToCartLink audioId="{AudioId}" text="Buy Now"}<br/>
		{if:AudioCanNamePrice}min {/if:AudioCanNamePrice}${AudioPrice} USD
	{/if:AudioCanBeSold}
	
Lastly, if statements also support the use of `||` and `&&` for AND and OR logic. However, mixing of ANDs and ORs is not currently allowed. For example:

	{if:ActivityIsBlog||ActivityIsAudio||ActivityIsVideo||ActivityIsAudio}
		<h1><a href="{ActivityUrl}">{ActivityTitle}</a></h1>
	{/if:ActivityIsBlog||ActivityIsAudio||ActivityIsVideo||ActivityIsAudio}


### if:ActivityIs[%type]
Use this if statement to compare if a certain activity list item is of a certain type. The types `Blog`, `Status`, and `StoreItem` will also catch their respective `Repost` items, so use `if:ActivityIsRepost` to differentiate between reposts and non-reposts.

Supported types: Audio, Blog, Event, Photo, PhotoAlbum, Repost, Status, StoreItem, Video  
Recommended modules: ActivityStreamList

### if:AudioHasLyrics
Check to see if the audio has lyrics

### if:AudioCanBeDownloadedForFree
Check to see if the audio can be downloaded for free

Recommended block: AudioView

### if:AudioCanBeSold
Check to see if the audio is being sold

Recommended block: AudioView

### if:AudioPlaylistCanBeDownloadedForFree
Check to see if the audio playlist can be downloaded for free

Recommended block: AudioPlaylistView

### if:AudioPlaylistCanBeSold
Check to see if the audio playlist is being sold

Recommended block: AudioPlaylistView

### if:AudioPlaylistCanNamePrice
Check to see if the audio playlist supports naming a price

Recommended block: AudioPlaylistView

### if:BrowserIsMobile
Check to see if the viewer is on a mobile browser or not

### if:StoreItemCanBeDownloadedForFree
Check to see if the store item can be downloaded for free

Recommended block: StoreItemView

### if:StoreItemCanBeSold
Check to see if the store item is being sold

Recommended block: StoreItemView

### if:StoreItemCanNamePrice
Check to see if the store item supports naming a price

Recommended block: StoreItemView

### if:StoreItemIsOnSale
Check to see if the store item is on sale or not

Recommended block: StoreItemView

### if:StoreItemIsPhysical
Check to see if the store item is a physical good (instead of a digital good)

Recommended block: StoreItemView

### if:StoreItemIsSoldOut
Check to see if the store item is sold out or not

Recommended block: StoreItemView

### if:EventHasEnded
Check if an event's end time is after the current time.

Recommended block: EventView

### if:EventHasMinimumAge
Check if an event has a required minimum age (any age greater than zero).

Recommended block: EventView

### if:EventHasTitle
Check if an event has a title.

Recommended block: EventView

### if:EventHasPrice
Check if an event has a price. Note that a price of "0" is considered a price, as it is free.

Recommended block: EventView

### if:EventHasSupportingActs
Check if there is at least one supporting act for an event.

Recommended block: EventView

### if:Has[%direction]BlogPost
Check if a previous or next blog post exists.

Supported directions: Previous, Next  
Recommended block: BlogView

### if:Has[%direction]Photo
Check if a previous or next photo exists, relative to the current photo album.

Supported directions: Previous, Next
Recommended block: PhotoView

### if:HasPastEvents
Check if past events exist for current account.

Recommended page: EventList  
Global: Yes, this if statement will run anywhere.

### if:HasTags
Check if the current content item has any tags

Recommended blocks: BlogView, StatusView, PhotoView, PhotoAlbumView, EventView, AudioView, AudioPlaylistView, VideoView, VideoPlaylistView

### if:EventHasTicketsBuyLink
Check if the event has a ticket buy link attached

Recommended blocks: EventView

### if:PhotoCanBeSold
Check to see if the photo can be sold

Recommended block: PhotoView

### if:ReadMore
Checks if the current excerpt is trimmed to length of 600 characters (give or take, depending on HTML tags).

Recommended blocks: ActivityStreamView, BlogView  
Recommended pages: ActivityStreamList, BlogList

### if:UserIsFollowing
Checks to see if the user is logged in and following the current account or not

### if:VenueHasWebsite
Checks if a venue has a website.

Recommended blocks: EventView, AudioView

# Modules & Blocks
The general syntax for modules and their blocks is as follows:

	{module:ModuleName}
		{block:BlockName}
			...
			{BlockVariable1}
			...
			{BlockVariable2}
			...
		{/block:BlockName}
	{/module:ModuleName}

## AccountAbout

### block:AccountAbout

AccountAboutName
:    the name of the account

AccountAbout
:	the biography text of the account

AccountAboutCleaned
:	the bio text stripped of all tags except: `<span><em><strong><a><u><i><b>`

AccountAboutUrl
:    the main URL of the account

### block:AccountLink

LinkUrl
:	The URL

LinkTitle
:	The name of the link

## ActivityStreamList
Events are grouped in the activity stream.

supported (*required*)
:	a comma separated list of supported content types

    accepted values are `audio`, `blog`, `blog_reposts`, `events`, `photos`, `statuses`, `status_reposts`, `videos`, `store`

    defaults to none

groupPhotos
:	should photos be grouped into album updates

    defaults to `true`

limit
:	how many items per page. defaults to 10

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

### block:ActivityStreamView

ActivityAuthorName
:	author's name

ActivityAuthorPhotoUrl
:	url to a 130x130px user photo

ActivityTitle
:	the content's title

	*Note: for events, the title will be set to* [%number] events added today! *.*

ActivityId
:	the content's id

ActivityBody
:	the main content needed, as defined:

	* Blog: the full blog post HTML
	* Event: the same as {ActivityTitle}: [%number] events added today!
	* Statuses: full status content
	* Photos albums: album description
	* Videos: video embed code
	* Video playlists: playlist description
	* Audio: Link to streamable MP3
	* Audio playlists: playlist description
	* Store items: item description

ActivityCSSClass
:	the relevant classes from this list: repost, blog, status, event, video, audio, photo

ActivityDate
:	the date modified (photo albums), created (events, videos, audio), or published (blogs, statuses)
	
	**Options**
	
	format
	:	the format of the date according to [PHP date() function](http://php.net/date) *defaults to n/j/y*  
	:	if set to "relative", returns time ago such as "5 seconds ago"
	:	if set to "gmdate", returns a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream)


ActivityExcerpt
:	a trimmed version of {ActivityBody}, roughly 600 characters, taking into account HTML

ActivityExcerptCleaned
:	a trimmed version of {ActivityExcerpt} stripped of all HTML except: `<span><em><strong><a><u><i><b>`

ActivityUrl
:	the permalink to the content's individual page

ActivityPhotoCount
:	number of photos added to a photo album item

ActivityPhotoUrl
:	a playlist cover image or a default one if there is no cover set

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

RepostedContentTimeAgo
:	if reposted, how long ago in relative time

RepostedFromAccountName
:	if reposted, what was the original account

RepostedFromAccountPhotoUrl
:	if reposted, what was the original account's photo

RepostedFromAccountUrl
:	if reposted, what was the original content permalink url

## AudioList
A listing of audio objects  

### Options

audioplaylistid
:	a audio playlist id to limit the videos to

    defaults to none

limit
:	a limit on the amount of returned audio objects

    defaults to `50`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

featured
:	whether or not to just show the featured audio track

	accepted values are `true` or `false`

	defaults to `false`

direction
:	the direction in which to show the audio

    defaults to `asc`
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalAudio:
:	the total amount of audio tracks, or if `audioplaylistid` is set, how many audio tracks in that playlist

## AudioView
A view for a single audio object. *Meant to be used with {Page:AudioView}*  

audioid
: an ID for which audio to show *defaults to the one given to {Page:AudioView} if in that page

### block:AudioView
AudioAccountId
:    the ID of the account that created this audio

AudioLink
:	a permalink to the audio's individual page

AudioTitle
:	the title of the audio

AudioId
:	the ID of the audio object

AudioLyrics
:	the lyrics for the audio

AudioDescription
:	the description for the audio object

AudioRecordedDate
:	the date this audio was recorded on
	
	**Options**
	
	format
	:	the format of the date according to [PHP date() function](http://php.net/date) *defaults to n/j/y*  
	:	if set to "relative", returns time ago such as "5 seconds ago"
	:	if set to "gmdate", returns a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream)

AudioCredits
:	the credits for the audio object

AudioArtist
:	the artist for the audio object

AudioFreeDownloadQuality, AudioPaidDownloadQuaility
:	a string representing the quality of the free/paid version of this audio. it will be one of the following:

		* 128kb MP3
		* 320kb MP3
		* Original WAV
		* Original AIFF
		* Original WAV / AIFF
		
AudioOrderNumber
:	the order of this audio in a potential playlist

AudioStreamUrl
:	the URL to use when streaming the audio

AudioPhotoUrl
:	a cover image or a default one if there is no cover set

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

## AudioPlaylistList
A listing of audio playlists  

### Options

featured
:	whether or not to just show the featured audio playlist

    accepted values are `true` or `false`

    defaults to `false`

featuredfirst
:	whether or not to show the featured audio playlist first in the listing

### Variables

TotalAudioPlaylists
: the total amount of audio playlists

## AudioPlaylistView
A single view for an audio playlist. *Meant to be used with {Page:AudioPlaylistView}*

### block:AudioPlaylistView
AudioPlaylistDescription
:	the description for the audio playlist

AudioPlaylistId
:	the ID for the audio playlist

AudioPlaylistUrl
:	a permalink for the playlist's individual page

AudioPlaylistTitle
:	the title of the audio playlist *Note: if there is a pre-order currently active for the audio playlist, it'll use that instead*

AudioPlaylistAudioCount
:	the amount of audio objects in this playlist

AudioPlaylistPhotoUrl
:	a playlist cover image or a default one if there is no cover set

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

AudioPlaylistArtist
:	the artist for the audio playlist

AudioPlaylistLabel
:	the label for the audio playlist

AudioPlaylistPrice
:	the price for the playlist *Note: if there is a pre-order currently active for the playlist, it'll use that price instead*

AudioPlaylistReleaseDate
:	the datetime the audio playlist was released on
	
	**Options**
	
	format
	:	the format of the date according to [PHP date() function](http://php.net/date) *defaults to n/j/y*  
	:	if set to "relative", returns time ago such as "5 seconds ago"
	:	if set to "gmdate", returns a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream)

AudioPlaylistFreeDownloadQuality, AudioPlaylistPaidDownloadQuaility
:	a string representing the quality of the free/paid version of this audio playlist. it will be one of the following:

		* 128kb MP3
		* 320kb MP3
		* Original WAV
		* Original AIFF
		* Original WAV / AIFF
		
CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the audio playlist to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the audio playlist

## BlogList
A listing of blogs

### Options

limit
: the amount of blogs to list per page

    defaults to `5`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results
    
direction
:	the direction in which to order the blog posts

    accepted values are `asc` or `desc`

    defaults to `desc`
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalBlogs
:	the total amount of blog posts

## BlogView
A view for a single blog post. Meant to be used with `{Page:BlogView}`

### block:BlogPost
AuthorName
:	author's name

AuthorPhotoUrl
:	url to a 130x130px user photo. if one isn't available, we'll use a default placeholder

BlogPostAccountId
:    the ID of the account that created this post

BlogPostTitle
:	the content's title

BlogPostId
:	the content's ID

BlogPostBody
:	the main content for the blog post

BlogPostExcerpt
:	the 1500 character beginning of a blog post

BlogPostUrl
:	the permalink to the content's individual page

PreviousBlogPostId, NextBlogPostId
:	the ID of the blog post previous/next to the current one if it exists

PreviousBlogPostTitle, NextBlogPostTitle
:	the title of the blog post previous/next to the current one if it exists

PreviousBlogPostUrl, NextBlogPostUrl
:	the permalink of the blog post previous/next to the current one if it exists

## CommentList
A view for a listing of the most recent comments, it will use the content of the currently rendered item

### Options
limit
:	the amount to limit the comments to

	accepted values are any number between 1 and 10 *Note: to show more then 10 comments, see the `CommentLink` variable*
	
	defaults to 10
	
## CommentView
A view for a single comment

### block:CommentView

CommentText
:	the text of the comment

CommentUserId
:	the ID of the user who posted the comment *Can be used with `block:UserView`

CommentId
:	the ID for the comment

CommentItemId
:	the ID of the item the comment was written about

## ChildAccountList
A listing of accounts that are children of the current account

### Options

type
:	the type of accounts to limit the results to

    accepted values are any comma seperated combination of `alumni`, `artists`, or `management`

    defaults to `alumni,artist,management` (all three)
    
### block:ChildAccountView
ChildAccountName
:	name of the child account

ChildAccountUrl
:    the URL of the child account

ChildAccountId
:    the ID of the child account

## BuyLinkList
A listing of buy links for the following modules: AudioView, AudioPlaylistView

### block:BuyLinkView

BuyLink
:	the actual link

BuyLinkTitle
:	the title for the buy link

BuyLinkPrice
:	the price of the material for the buy link

BuyLinkCurrency
:	the currency of the material in the buy link

## EventList
A listing of events.  

### Options

limit
: the amount of events to list per page

    defaults to `50`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

upcoming
: whether or not to show upcoming events

    accepted values are `true` or `false`

    defaults to `true`

past
: whether or not to show past events, also see `{if:HasPastEvents}`

    accepted values are `true` or `false`

    defaults to `false`

direction
: the direction to show the events in

    accepted values are `asc` or `desc`

    defaults to `asc`
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalEvents
: the amount of events loaded based on your values for upcoming and/or past

## EventView
A view for a single event. Meant to be used with `{Page:EventView}`

### block:EventView

EventAccountId
:    the ID of the account that created the event

EventAges
:	will return either "Any Age" or "[%Age]+" (meaning this age and up), also see `{if:EventHasMinimumAge}`

EventCity 
:	the city in which the event is taking place

EventState
:	the state in which the event is taking place

EventDescription
:	the description of the event

EventPhotoUrl
:	the cover photo representing the event

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

Event[Start|End]Date
:	the datetime the event is set to begin or end
	
	**Options**
	
	format
	:	the format of the date according to [PHP date() function](http://php.net/date) *defaults to n/j/y*  
	:	if set to "relative", returns time ago such as "5 seconds ago"
	:	if set to "gmdate", returns a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream)

EventUrl
:	a permalink to the event's individual page

EventLocation
:	a string constructed by StageBloc based on the information available for the location. if in the USA, it will return "city, state", otherwise it will return "city, state, country"

EventPrice
:	the event for the price, also see `{if:EventHasPrice}`

EventTitle
:	the title for the event, also see `{if:EventHasTitle}`

TicketsBuyLink
:	a link to where tickets for this event can be purchased

VenueName
:	the name of the venue where this event is taking place

SupportingActs
:	a comma separated listing of the supporting acts for the event, also see `{if:EventHasSupportingActs}`

VenueWebsiteUrl
:	the URL to the venue where the event is taking place. Also see {if:VenueHasWebsite}

## FanList
A list of fans for this account

### block:UserView
See `UserView` module for `UserView` block variables

## FollowingList
A list of accounts that this account's admins are following

### block:FollowingView

FollowingAccountName
:	the name of the account being following

FollowingAccountUrl
:	the URL of the account being followed

## Navigation
Display all the links to active, defined content sections. *Note: If you do not have the page defined in your theme, the link will not show to that section, however the section will still work with our fallback pages.

You can override the link text in navigation modules as options. Example:

	{module:Navigation home="News" events="Shows"}
	<ul>
		{block:NavigationItem}
			<li><a href="{Url}" class="{CSSClass}">{LinkText}</a></li>
		{/block:NavigationItem}
	</ul>
	{/module:Navigation}

This will generate links like this:

	<ul>
		<li><a href="/" class="active">News</a></li>
		<li><a href="/events" class="">Shows</a></li>
	</ul>

All variables:

ignore
:	list of top level links to ignore in navigation

	default: `blog,statuses`

order
:	comma separated list to push to beginning; unlisted items will remain in default position


## Pagination
This module latches onto the last seen module and provides next/previous links to go through the pages. **Note:** this currently must be the first module *after* the module you wish to paginate

### block:PreviousPage
Renders only if there is a previous page.

PreviousPage
:	link to previous page

### block:NextPage
Renders only if there is a next page.

NextPage
:	link to next page

## PhotoAlbumList
A listing of photo albums for the account

### Options

limit
: the amount of photo albums to list per page

    defaults to `5`
    
offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

direction
:	the direction in which to order the photo albums

    accepted values are `asc` or `desc`

    defaults to `desc`
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalPhotoAlbums
: the total amount of photo albums

## PhotoAlbumView
A view for a single photo album. *Meant to be used with {Page:PhotoAlbumView}*

### block:PhotoAlbumView
PhotoAlbumPhotoUrl
: the cover photo for the album

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the album to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the photo album

PhotoAlbumAccountId
:    the ID of the account that created the photo album

PhotoAlbumDescription
:	the description of the photo album

PhotoAlbumUrl
:	a permalink to the photo album's individual page

PhotoAlbumId
:	the ID of the photo album

PhotoAlbumTitle
:	the title for the photo album

PhotoAlbumPhotoCount
:	the number of photos in this photo album

## PhotoList
A listing of photos.

### Options

accountcontent
: whether or not to show photos created by admins of the account *Note: see `fancontent`*

    defaults to true

accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to just the ID of the current account

albumid
: an album id of which to limit the returned photos to

    defaults to none

direction
:	the direction in which to order the photos

    accepted values are `asc` or `desc`

    defaults to `desc`
    
fancontent
: whether or not to show photos submitted to the accounts by fans

    defaults to false

limit
: the amount of photos to list per page

    defaults to `10`

offset
:	skip X number of items, still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results
	
userid
:    the user to limit the photos to *Note: if `fancontent` is enabled, this must be a fan of the account and / or if `accountcontent` is enabled, this must be an admin of the account*

    defaults to empty (i.e. all fans and / or all admins)

### Variables

TotalPhotos
: the total amount of photos, or if `albumid` is set, how many photos in this album

## PhotoView
A view for a single photo. *Meant to be used with {Page:PhotoView}*

### Options
  
photoid
: an ID for which photo to show *defaults to the one given to {Page:PhotoView} if in that {Page}*

### block:PhotoView

PhotoAccountId
:    the ID of the account that created the photo

PhotoId
:	the ID of the photo

PhotoUrl
:	the permalink to this photo's individual page

PhotoTitle
:	the title of this photo

PhotoDescription
:	the description of the photo

PhotoAlbumUrl
:	a permalink to the photo's album's individual page

PhotoAlbumId
:	the ID of the photo's album

PhotoAlbumTitle
:	the title for the photo's album

PhotoAlbumPhotoCount
:	the number of photos in this photo's album

Source-Thumb
:	A square thumbnail, 130x130

Source-Small
:	Photo with max width of 250

Source-Medium
:	Photo with max width of 500

Source-Large
:	Photo with max width of 800

	Use Source-Large when possible

Source-Original
:	The originally uploaded photo.

ShortUrl-Thumb
:	A square thumbnail, 130x130

ShortUrl-Small
:	Photo with max width of 250

ShortUrl-Medium
:	Photo with max width of 500

ShortUrl-Large
:	Photo with max width of 800

ShortUrl-Original
:	The originally uploaded photo.

	Use ShortUrls when sharing photos

PreviousPhotoId, NextPhotoId
:	the ID of the photo previous/next to the current one if it exists

PreviousPhotoTitle, NextPhotoTitle
:	the title of the photo previous/next to the current one if it exists

PreviousPhotoUrl, NextPhotoUrl
:	the permalink of the photo previous/next to the current one if it exists

## StatusList
A listing of statuses.

### Options

accountcontent
: whether or not to show statuses created by admins of the account *Note: see `fancontent`*

    defaults to true

accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to just the ID of the current account

direction
:	the direction in which to order the photos

    accepted values are `asc` or `desc`

    defaults to `desc`
    
fancontent
: whether or not to show statuses submitted to the accounts by fans

    defaults to false

limit
: the amount of statuses to list per page

    defaults to `10`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results
    
userid
:    the user to limit the statuses to *Note: if `fancontent` is enabled, this must be a fan of the account and / or if `accountcontent` is enabled, this must be an admin of the account*

    defaults to empty (i.e. all fans and / or all admins)

### Variables

TotalStatuses
:	total amount of statuses

## StatusView
A view for an individual status. *Meant to be used with {Page:StatusView}*

### block:StatusPost

AuthorName
:	the author of the status

AuthorPhotoUrl
:	a 130x130 pixel image of the author of the photo or a placeholder if the photo doesn't exist

StatusAccountId
:    the ID of the account that posted this status

StatusText
:	the actual text of the status post

StatusTextWithLinks
:	the actual text of the status post with links converted into HTML <a> tags

## StoreItemList
A listing of store items.

### Options

limit
: the amount of store items to list per page

    defaults to `20`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

direction
:	the direction in which to order the store items

    accepted values are `asc` or `desc`

    defaults to `desc`
    
type
:	the type of store item

	accepted values are any comma seperated string of the following constants: digital, physical
    
status
:	the status of the store items

	accepted values are any comma seperated string of the following constants: listed, coming_soon, sold_out
	
	defaults to all three
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalStoreItems
:	total amount of store items

## StoreItemView
A view for an individual store item. *Meant to be used with {Page:StoreItemView}*

### block:StoreItemView

StoreItemAccountId
:    the ID of the account that created the store item

StoreItemUrl
:	the URL for the store item

StoreItemTitle
:	the title of the store item *Note: if there is a pre-order currently active for the store item, it'll use that title instead*

StoreItemDescription
:	the description of the store item *Can contain HTML code*

StoreItemPrice
:	the price of the store item with any active sales applied *Note: if there is a pre-order currently active for the store item, it'll use that price instead*

StoreItemOriginalPrice
:	the original price of the store item (i.e. no sales applied) *Note: if there is a pre-order currently active for the store item, it'll use that price instead*

StoreItemId
:	the ID for the store item

StoreItemPhotoAlbumId
:	the ID of the photo album that holds the photos for this store item *Note: This can be used with the `PhotoList` module to easily list store item photos*

StoreItemPhotoUrl
: the image representing the store item

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

## TagList
A listing of tags for the current content item
Options  
limit
:	an amount to limit the tags for the item by

### block:TagView
Tag
:	the actual tag

## UserView
A view for a single user

### Options
userid
:	the ID of the user to show

	defaults to the user in the URL

### block:UserView

UserId
:	the ID of the user

UserName
:    the real name of the user

UserUsername
:    the username of the user

UserPhotoUrl
: the image representing the user

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

	defaultphoto
	:	the URL of a photo to use if one isn't set and you don't want to use our default photo

## VideoList
A listing of videos.

### Options

videoplaylistid
:	a video playlist id to limit the videos to

    defaults to none

limit
:	a limit on the amount of returned videos

    default to `50`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

direction
:	the direction in which to order the videos

    accepted values are `asc` or `desc`

    defaults to `asc`

featured
:	whether or not to show the just featured video

    accepted values are `true` or `false`

    defaults to `false`
    
accountid
: a comma separated list of the IDs of the accounts to limit the results to, must be children accounts of the current account, see variable `{ChildAccountIDs}`

    defaults to none (i.e. the current account)

### Variables

TotalVideos
: the total amount of videos, or if `videoplaylistid` is set, the total videos in this playlist

## VideoView
A view for a single video. *Meant to be used with {Page:VideoView}*  

videoid
: an ID for which video to show *defaults to the one given to {Page:VideoView} if in that page

### block:VideoView
VideoAccountId
:    the ID of the account that posted the video

VideoUrl
:	a permalink to the video's individual page on StageBloc

VideoJavaScriptEscapedTitle
:	the title of the video escaped so that it is able to be used with JavaScript

VideoID
:	the ID of the video

VideoDescription
:	the description of the video

VideoJavaScriptEscapedDescription
:	the description of the video escaped to be used in JavaScript

VideoEmbedCode
:	the embed code for the given video

VideoJavaScriptEncodedEmbedCode
:	the embed code encoded for use in a URL

VideoJavaScriptEscapedEmbedCode
:	the embed code escaped to be used in JavaScript

VideoThumbnailUrl
:	a URL to a thumbnail image used to represent this video 

## VideoPlaylistList
A listing of video playlists

### Options

limit
:	a limit on the amount of returned audio objects

    defaults to `50`

offset
:	skip X number of items. Still returns `limit` items

paging (advanced option)
:	define how many items are on this page
	
	This option is only useful if you are using multiple modules with both `limit`s and `offset`s. You need to explicitiy set how many items are on the current page, or pagination will return unexpected results

### Variables

TotalVideoPlaylists
: the total amount of video playlists

## VideoPlaylistView
A view for a single video playlist

### block:VideoPlaylistView
VideoPlaylistDescription
:	the description for the playlist

VideoPlaylistId
:	the ID for the video playlist

VideoPlaylistUrl
:	a permalink to the video playlist's individual page

VideoPlaylistTitle
:	the title for the video playlist

VideoPlaylistVideoCount
:	the amount of videos in this playlist

VideoPlaylistPhotoUrl
:	a photo of the cover of the playlist

	**Options**
	
	size
	:	accepted sizes are "thumbnail", "small", "medium", "large", "original"

CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the video playlist to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the video playlist

# SB Nav
SB Nav is the little control box that appears in a corner of the screen. It allows users to log in; follow and unfollow accounts; and edit, like, repost, and buy content. As a theme author, you can change a few things.

### {SBNav position=""}
You can set the sbnav position with the {SBNav} variable. Place it anywhere in your theme and SB Nav will be placed in the specified corner. *Note: This will be ignored on mobile themes as SBNav is forced to the top of the screen*

position
:	which corner to be placed in

    accepted values are two words in any order, separated by a space: `top`, `bottom`, `left`, `right`

### SB Nav Color
When submitting a theme, you can select a default color (in HEX value format) that you feel best matches and fits in. Users have the option to override this in their account's theme management section.

# Example Theme
Here's a boilerplate theme to kickstart your development. [View these files on GitHub](https://github.com/stagebloc/docs/tree/master/boilerplate_theme).

### HTML
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			{CSS}
			{jQuery}
			{jPlayer}
		</head>
		<body id="{Body-ID}">
			<header>
				<h1><a href="{Link-Home}">{AccountName}</a></h1>
				{module:Navigation}
					<nav id="main-nav">
						<ul>
						{block:NavigationItem}
							<li class="{CSSClass}"><a href="{Url}">{LinkText}</a></li>
						{/block:NavigationItem}
						<li><a href="{Link-Archive}">Archive</a></li>
						</ul>
					</nav>
				{/module:Navigation}
			</header>

			<div id="content">
				{page:ActivityStreamList}
					<div id="main-content">
						{module:ActivityStreamList embedWidth="500" supported="audio,blog,events,photos,statuses,videos,store"}
							{block:ActivityStreamView}
								<article class="post {ActivityCSSClass}">
									<header>
										{if:ActivityIsBlog||ActivityIsRepost||ActivityIsVideo||ActivityIsAudio||ActivityIsStoreItem}
											<h1><a href="{ActivityUrl}">{ActivityTitle}</a></h1>
										{/if:ActivityIsBlog||ActivityIsRepost||ActivityIsVideo||ActivityIsAudio||ActivityIsStoreItem}
									</header>

									<div class="post-body">
										{if:ActivityIsBlog||ActivityIsVideo||ActivityIsStoreItem}
											{ActivityExcerpt}
										{/if:ActivityIsBlog||ActivityIsVideo||ActivityIsStoreItem}
										{if:ActivityIsAudio}
											<div id="jquery_jplayer{ActivityId}" class="jp-jplayer"></div>
											<div id="jp_container{ActivityId}" class="jp-audio jp-audio-single jp-audio-activity-stream" data-id="{ActivityId}" data-url="{ActivityExcerpt}">
												<ul class="jp-controls">
													<li><a href="javascript:;" class="jp-play" tabindex="1"><span>play</span></a></li>
													<li><a href="javascript:;" class="jp-pause" tabindex="1"><span>pause</span></a></li>
												</ul>
												<div class="jp-current-time"></div>
												<div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div>
												<div class="jp-time-left"></div>
												<div class="clear"></div>
											</div>
										{/if:ActivityIsAudio}
										{if:ActivityIsRepost}
											{ActivityExcerpt}

											<div class="repost">
												<a href="{RepostedFromAccountUrl}" class="repost-account-image-link">
													<img src="{RepostedFromAccountPhotoUrl}" class="repost-account-image" />
												</a>
												<div class="repost-info">
													<a href="{RepostedFromAccountUrl}">{RepostedFromAccountName}</a>
													{RepostedContentTimeAgo}
												</div>
											</div>
										{/if:ActivityIsRepost}
										{if:ActivityIsStatus}
											<a href="{ActivityUrl}"><span class="status-quote-mark">&ldquo;</span>{ActivityExcerpt}</a>
										{/if:ActivityIsStatus}
										{if:ActivityIsEvent}
											{ActivityTitle}
										{/if:ActivityIsEvent}

										{if:ActivityIsEvent}
											{module:EventList upcoming="true" past="true" dateadded="{ActivityDate format="gmdate"}" limit="8"}
												<ul class="events-list compact">
												{block:EventView}
													<li>
														<span class="event-date">{ActivityDate format="M j"}</span>
														<span class="event-location">{EventLocation}</span>
														<small class="event-actions">
															 <a class="event-more" href="{EventUrl}">more info</a>
														 </small>
													</li>
												{/block:EventView}
												</ul>
											{/module:EventList}
										{/if:ActivityIsEvent}

										{if:ActivityIsPhoto}
										<a href="{ActivityUrl}"><img src="{ActivityPhotoUrl size="medium"}" alt="{ActivityTitle}" title="{ActivityTitle}" /></a>
										{/if:ActivityIsPhotoAlbum}

									{if:ReadMore}
										<a class="read-more" href="{ActivityUrl}">read more</a>
									{/if:ReadMore}

									</div>

									<footer>
										<span class="footer-info">
											{LikeLink likeText="Like" unlikeText="Unlike"}
											{if:ActivityIsBlog||ActivityIsStatus||ActivityIsRepost}
												{RepostLink repostText="Repost" unRepostText="UnRepost"}
											{/if:ActivityIsBlog||ActivityIsStatus||ActivityIsRepost}
											{if:ActivityIsPhotoAlbum}
												{ActivityPhotoCount} photos <a href="{ActivityUrl}">view all photos</a>
											{/if:ActivityIsPhotoAlbum}
										</span>
										<a href="{ActivityUrl}" class="datetime-link" title="{ActivityDate format="D M j Y g:i A"}">{ActivityDate format="relative"}</a>
									</footer>
								</article>
							{/block:ActivityStreamView}
						{Else}
							<article class="post nocontent">
								<p>Oh snap! We haven't written anything yet.</p>
							</article>
						{/module:ActivityStreamList}

						{module:Pagination}
							<div id="pagination">
								{block:NextPage}
								<a href="{NextPage}">Older</a>
								{/block:NextPage}
								{block:PreviousPage}
								<a href="{PreviousPage}">Newer</a>
								{/block:PreviousPage}
							</div>
						{/module:Pagination}

					</div>
				{/page:ActivityStreamList}

				{page:BlogView}
					<div id="main-content">
						{module:BlogView}
							{block:BlogPost}
								<article class="post blog individual">
									<header>
										<h1>{BlogPostTitle}</h1>
									</header>
									{BlogPostBody}
									<footer>
										<span class="footer-info">
											{LikeLink likeText="Like" unlikeText="Unlike"}
											{RepostLink repostText="Repost" unRepostText="UnRepost"}
										</span>
										{PublishedDate format="D M j Y g:i A"}
									</footer>
									<div id="single-item-navigation">
										{if:HasNextBlogPost}
										<div><a href="{NextBlogPostUrl}">Newer</a></div>
										{/if:HasNextBlogPost}
										{if:HasPreviousBlogPost}
										<div><a href="{PreviousBlogPostUrl}">Older</a></div>
										{/if:HasPreviousBlogPost}
									</div>
								</article>
								{if:HasTags}
									<section id="tags" class="blog-post-tags">
										<h2>Tags</h2>
										{module:TagList}
											{block:TagView}
												<span class="tag">{Tag}</span>
											{/block:TagView}
										{/module:TagList}
									</section>
								{/if:HasTags}
							{/block:BlogPost}
						{Else}
							<div class="nocontent">
								<p>Sorry, but this blog post was not found!</p>
							</div>
						{/module:BlogView}
					</div>
				{/page:BlogView}

				{page:StatusView}
					<div id="main-content">
						{module:StatusView}
							{block:StatusPost}
								<article class="post status individual">
									<div class="post-body">
										<a><span class="status-quote-mark">&ldquo;</span>{StatusText}</a>
									</div>
									<footer>
										<span class="footer-info">
											{LikeLink likeText="Like" unlikeText="Unlike"}
											{RepostLink repostText="Repost" unRepostText="UnRepost"}
										</span>
										{CreatedDate format="D M j Y g:i A"}
									</footer>
								</article>
							{/block:StatusPost}
						{Else}
							<div class="nocontent">
								<p>Sorry, but this status was not found!</p>
							</div>
						{/module:StatusView}
					</div>
				{/page:StatusView}

				{page:StoreItemList}
					<div id="main-content">
						{module:StoreItemList}
							<h2>Store Items</h2>
							<ul class="store-blocks">
								{block:StoreItemView}
								<li>
									<a href="{StoreItemUrl}">
										<img src="{StoreItemPhotoUrl}" alt="{StoreItemTitle} cover" title="{StoreItemTitle} cover" />
										<span class="title">{StoreItemTitle}</span>
										<span class="price">{if:StoreItemCanBeSold}
										${StoreItemPrice}
										{if:Else}
											{if:StoreItemCanBeDownloadedForFree}
												Free
											{/if:StoreItemCanBeDownloadedForFree}
										{/if:StoreItemCanBeSold}</span>
									</a>
								</li>
								{/block:StoreItemView}
							</ul>
						{Else}
							<div class="nocontent">
								<p>No store items yet! Check back later.</p>
							</div>
						{/module:StoreItemList}
					</div>
					{module:Pagination}
						<div id="pagination">
							{block:NextPage}<a href="{NextPage}">Older</a>{/block:NextPage}
							{block:PreviousPage}<a href="{PreviousPage}">Newer</a>{/block:PreviousPage}
						</div>
					{/module:Pagination}
				{/page:StoreItemList}
				{page:StoreItemView}
					{module:StoreItemView}
						<div class="store-item-container">
							{block:StoreItemView}
								<div class="store-item-info">
									{if:StoreItemCanBeSold}
									<div class="buy-link">
										{StoreItemAddToCartLink storeitemid="{StoreItemId}" text="Buy Now"}<br />
										{if:StoreItemCanNamePrice}min {/if:StoreItemCanNamePrice}${StoreItemPrice} USD
									</div>
									{/if:StoreItemCanBeSold}
									{if:StoreItemCanBeDownloadedForFree}
									<div class="buy-link">
										{StoreItemFreeDownloadLink storeitemid="{StoreItemId}" text="Download"}
									</div>
									{/if:StoreItemCanBeDownloadedForFree}
									<h2>{StoreItemTitle}</h2>

									<div class="description long">
										<img class="inlineImage" src="{StoreItemPhotoUrl size="small"}" />
										{StoreItemDescription}
									</div>
								</div>

								{if:HasTags}
								<section id="tags-sidebar" class="store-tags">
									<h2>Tags</h2>
									{module:TagList}
										{block:TagView}
											<span class="tag">{Tag}</span>
										{/block:TagView}
									{/module:TagList}
								</section>
								{/if:HasTags}
							{/block:StoreItemView}
						</div>
					{Else}
					<div class="nocontent">
						<p>Sorry, but this store item wasn't found!</p>
					</div>
					{/module:StoreItemView}
				{/page:StoreItemView}

				{page:EventUpcomingList}
					<div id="main-content">
						{module:EventList upcoming="true" past="false"}
							<h2>Upcoming Events</h2>
							{if:HasPastEvents}
							<a href="{Link-EventsPast}" id="other-events">view past events</a>
							{/if:HasPastEvents}
							<ul class="events-list">
								{block:EventView}
								<li>
									<span class="event-date">{EventStartDate format="M j"}</span>
									<span class="event-venue"><a href="{EventUrl}">{VenueName}</a></span>
									<span class="event-location">{EventLocation}</span>
									<span class="event-actions">
										{if:EventHasTicketsBuyLink}
										<a class="event-tickets" href="{TicketsBuyLink}">tickets</a> |
										{/if:EventHasTicketsBuyLink}
										<a class="event-more" href="{EventUrl}”>more</a>
									</span>
								</li>
								{/block:EventView}
							</ul>
						{Else}
							<h2>Upcoming Events</h2>
							{if:HasPastEvents}
							<a href="{Link-EventsPast}" id="other-events">view past events</a>
							{/if:HasPastEvents}
							<div class="nocontent">
								<p>Uh oh! No upcoming events...</p>
							</div>
						{/module:EventList}

						{module:Pagination}
							<div id="pagination">
								{block:NextPage}
								<a href="{NextPage}">Older</a>
								{/block:NextPage}
								{block:PreviousPage}
								<a href="{PreviousPage}">Newer</a>
								{/block:PreviousPage}
							</div>
						{/module:Pagination}
					</div>
				{/page:EventUpcomingList}

				{page:EventPastList}
					<div id="main-content">
						{module:EventList upcoming="false" past="true" order="desc"}
							<h2>Past Events</h2>
							<a href="{Link-Events}" id="other-events">view upcoming events</a>
							<ul class="events-list">
								{block:EventView}
								<li>
									<span class="event-date">{EventStartDate format="M j"}</span>
									<span class="event-venue"><a href="{EventUrl}">{VenueName}</a></span>
									<span class="event-location">{EventLocation}</span>
									<span class="event-actions">
										<a class="event-more" href="{EventUrl}">more</a>
									</span>
								</li>
								{/block:EventView}
							</ul>
						{Else}
							<h2>Past Events</h2>
							<a href="{Link-Events}" id="other-events">view upcoming events</a>
							<div class="nocontent">
								<p>Uh oh! No past events...</p>
							</div>
						{/module:EventList}

						{module:Pagination}
							<div id="pagination">
								{block:NextPage}
								<a href="{NextPage}">Older</a>
								{/block:NextPage}
								{block:PreviousPage}
								<a href="{PreviousPage}">Newer</a>
								{/block:PreviousPage}
							</div>
						{/module:Pagination}
					</div>
				{/page:EventPastList}

				{page:EventView}
						{module:EventView}
							<div id="main-content">
								{block:EventView}
									<div id="event-datetime">
										<span id="event-month">{EventStartDate format="M"}</span>
										<span id="event-day">{EventStartDate format="j"}</span>
										<span id="event-year">{EventStartDate format="Y"}</span>

										<div id="event-datetime-sub">
											{EventStartDate format="l"}<br />
											{EventStartDate format="g:i a"}<br />
											{if:EventHasMinimumAge}{EventAges}{/if:EventHasMinimumAge}
										</div>
									</div>

									<div class="event-details">
										<div id="event-header">
											{VenueName}, {EventLocation}
										</div>
										{if:HasSupportingActs}
										<div class="event-details">
											<span id="event-supportingacts">with {SupportingActs}</span>
										</div>
										{/if:HasSupportingActs}
										<div class="event-details">
											{if:EventHasPrice}
											<span id="event-price">${EventPrice}</span>
											{/if:EventHasPrice}
											{if:EventHasTicketsBuyLink}
											<a href="{TicketsBuyLink}" id="event-tickets">buy tickets</a>
											{/if:EventHasTicketsBuyLink}
											<div id="event-description">{EventDescription}</div>
										</div>
									</div>
									{if:HasTags}
										<section id="tags" class="event-tags">
											<h2>Tags</h2>
											{module:TagList}
												{block:TagView}
													<span class="tag">{Tag}</span>
												{/block:TagView}
											{/module:TagList}
										</section>
									{/if:HasTags}
								{/block:EventView}
						{Else}
							<div class="nocontent">
								<p>Sorry, this event wasn't found!</p>
							</div>
						{/module:EventView}
					</div>
				{/page:EventView}

				{page:VideoList}
					{module:VideoList featured="true" embedWidth="500"}
						<div class="video-container">
						{block:VideoView}
							<div class="video">
								{VideoEmbedCode}
								<h2><a href="{VideoUrl}">{VideoTitle}</a></h2>
								{VideoDescription}
							</div>

							{if:HasTags}
							<section id="tags" class="video-tags">
								<h2>Tags</h2>
								{module:TagList}
									{block:TagView}
										<span class="tag">{Tag}</span>
									{/block:TagView}
								{/module:TagList}
							</section>
							{/if:HasTags}
						{/block:VideoView}
						</div>
					{/module:VideoList}

					{module:VideoPlaylistList}
						<div id="main-content">
							<h2>Playlists</h2>
							<ul class="playlists-block">
							{block:VideoPlaylistView}
								<li id="playlist{AudioPlaylistId}"><a href="{VideoPlaylistUrl}">
									{if:VideoPlaylistHasThumbnail}
										<img src="{VideoPlaylistPhotoUrl}" title="{VideoPlaylistTitle}" />
									{/if:VideoPlaylistHasThumbnail}
									<h3>{VideoPlaylistTitle}</h3>
									<span class="total">{VideoPlaylistVideoCount} videos</span>
								</a></li>
							{/block:VideoPlaylistView}
							</ul>
						</div>
					{Else}
						<div class="nocontent">
							<p>Sorry, but we haven't added any video playlists yet!</p>
						</div>
					{/module:VideoPlaylistList}
				{/page:VideoList}

				{page:VideoPlaylistView}
					{module:VideoPlaylistView}
						{block:VideoPlaylistView}
							<div class="video-container"></div>
							<div id="playlistTitle">
								Playlist: <span class="title">{VideoPlaylistTitle}</span><span class="total">{VideoPlaylistVideoCount} videos</span>
							</div>
							<div id="video-grid">
							{module:VideoList videoplaylistid="{VideoPlaylistId}" limit="12" embedWidth="500"}
								<script>sbVideoList = {};</script>
								<ul class="video-blocks">
								{block:VideoView}
									<li><a href="{VideoUrl}" data-id="{VideoId}">
										<div class="image"><img src="{VideoThumbnailUrl}" title="{VideoTitle}" /></div>
										<span>{VideoTitle}</span><span class="nowPlaying">Now Playing</span>
									</a></li>

									<script>sbVideoList[{VideoId}] = '<div class="video">{VideoJavaScriptEscapedEmbedCode}<h2><a href="{VideoUrl}">{VideoJavaScriptEscapedTitle}</a></h2>{VideoJavaScriptEscapedDescription}</div>{if:HasTags block="VideoView"}<section id="tags" class="video-tags"><h2>Tags</h2>{module:TagList}{block:TagView}<span class="tag">{Tag}</span>{/block:TagView}{/module:TagList}</section>{/if:HasTags}'</script>
								{/block:VideoView}
								</ul>
							{/module:VideoList}
							{module:Pagination}
								<div id="pagination">
									{block:PreviousPage}
									<a href="{PreviousPage}">Newer</a>
									{/block:PreviousPage}
									{block:NextPage}
									<a href="{NextPage}">Older</a>
									{/block:NextPage}
								</div>
							{/module:Pagination}
							{if:HasTags}
							<section id="tags" class="video-playlist-tags">
								<h2>Tags</h2>
								{module:TagList}
									{block:TagView}
										<span class="tag">{Tag}</span>
									{/block:TagView}
								{/module:TagList}
							</section>
							{/if:HasTags}
							</div>
						{/block:VideoPlaylistView}
					{Else}
						<div class="nocontent">
							<p>Sorry, but this video playlist was not found!</p>
						</div>
					{/module:VideoPlaylistView}

					{module:VideoPlaylistList}
						<div id="main-content">
							<h2>Playlists</h2>
							<ul class="playlist-blocks">
							{block:VideoPlaylistView}
								<li id="block{VideoPlaylistId}"><a href="{VideoPlaylistUrl}">
									{if:VideoPlaylistHasThumbnail}
										<img src="{VideoPlaylistPhotoUrl}" title="{VideoPlaylistTitle}" />
									{/if:VideoPlaylistHasThumbnail}
									<h3>{VideoPlaylistTitle}</h3>
									<span class="total">{VideoPlaylistVideoCount} videos</span>
								</a></li>
							{/block:VideoPlaylistView}
							</ul>
						</div>
					{/module:VideoPlaylistList}
				{/page:VideoPlaylistView}

				{page:VideoView}
					{module:VideoView embedWidth="500"}
						<div class="video-container">
						{block:VideoView}
							<div class="video">
								{VideoEmbedCode}
								<h2><a href="{VideoUrl}">{VideoTitle}</a></h2>
								{VideoDescription}
							</div>

							{if:HasTags}
							<section id="tags" class="video-tags">
								<h2>Tags</h2>
								{module:TagList}
									{block:TagView}
										<span class="tag">{Tag}</span>
									{/block:TagView}
								{/module:TagList}
							</section>
							{/if:HasTags}
						{/block:VideoView}
						</div>
					{Else}
						<div class="nocontent">
							<p>Sorry, but this video was not found!</p>
						</div>
					{/module:VideoView}
				{/page:VideoView}

				{page:PhotoList}
					{module:PhotoAlbumList}
						<div id="main-content">
							<h2>Photo Albums</h2>
							<ul class="album-blocks">
								{block:PhotoAlbumView}
								<li>
									<a href="{PhotoAlbumUrl}">
										<img src="{PhotoAlbumPhotoUrl}" alt="{PhotoAlbumTitle} cover" title="{PhotoAlbumTitle} cover" />
										<span class="title">{PhotoAlbumTitle}</span>
										{PhotoAlbumPhotoCount} photos
									</a>
								</li>
								{/block:PhotoAlbumView}
							</ul>
						</div>
					{Else}
						<div class="nocontent">
							<p>No photos yet! Check back later.</p>
						</div>
					{/module:PhotoAlbumList}
				{/page:PhotoList}

				{page:PhotoView}
					{module:PhotoView}
						<div id="main-content">
							{block:PhotoView}
							<article class="post individual photo">
								<img class="photo-image" src="{Source-Large}" alt="{PhotoTitle}" title="{PhotoTitle}" />
								<h1 class="photo-title">{PhotoTitle}</h1>
								<p class="photo-backtoalbum">{PhotoAlbumPhotoCount} photos in <a href="{PhotoAlbumUrl}">{PhotoAlbumTitle}</a></p>
								<div class="photo-description">
									{PhotoDescription}
								</div>
								<div class="single-item-navigation">
									{if:HasNextPhoto}
									<div><a href="{NextPhotoUrl}">Newer</a></div>
									{/if:HasNextPhoto}
									{if:HasPreviousPhoto}
									<div><a href="{PreviousPhotoUrl}">Older</a></div>
									{/if:HasPreviousPhoto}
								</div>
								<footer>
									<span class="footer-info">
										{LikeLink likeText="Like" unlikeText="Unlike"}
									</span>
									{CreatedDate format="D M j Y g:i A"}
								</footer>

								{if:HasTags}
									<section id="tags" class="photo-tags">
										<h2>Tags</h2>
										{module:TagList}
											{block:TagView}
												<span class="tag">{Tag}</span>
											{/block:TagView}
										{/module:TagList}
									</section>
								{/if:HasTags}
							</article>
							{/block:PhotoView}
						</div>
					{Else}
						<div class="nocontent">
							<p>Sorry, but this photo couldn't be found! <a href="{Link-Photos}">View other photos instead?</a></p>
						</div>
					{/module:PhotoView}
				{/page:PhotoView}

				{page:PhotoAlbumView}
					{module:PhotoAlbumView}
						<div id="main-content">
							{block:PhotoAlbumView}
								<div class="photos-section">
									<div id="album-info">
										<img id="album-cover" src="{PhotoAlbumPhotoUrl}" alt="{PhotoAlbumTitle} cover" title="{PhotoAlbumTitle} cover"/>
										<span id="album-title">{PhotoAlbumTitle}</span>
										<div id="album-last-updated">last updated {ModifiedDate format="F j, Y"}</div>
										<div id="description">{PhotoAlbumDescription}</div>
										<div id="album-photo-count">{PhotoAlbumPhotoCount} photos</div>
									</div>
								</div>
								{module:PhotoList albumid="{PhotoAlbumId}" limit="24"}
									<ul class="photos-list">
										{block:PhotoView}
										<li><a href="{PhotoUrl}" title="{PhotoTitle}"><img src="{Source-Thumb}" alt="{PhotoTitle}" title="{PhotoTitle}" /></a></li>
										{/block:PhotoView}
									</ul>
								{/module:PhotoList}

								{module:Pagination}
									<div id="pagination">
										{block:NextPage}
										<a href="{NextPage}">Older</a>
										{/block:NextPage}
										{block:PreviousPage}
										<a href="{PreviousPage}">Newer</a>
										{/block:PreviousPage}
									</div>
								{/module:Pagination}

								{if:HasTags}
									<section id="tags" class="photo-album-tags">
										<h2>Tags</h2>
										{module:TagList}
											{block:TagView}
												<span class="tag">{Tag}</span>
											{/block:TagView}
										{/module:TagList}
									</section>
								{/if:HasTags}
							{/block:PhotoAlbumView}
						</div>
					{Else}
						<div class="nocontent">
							<p>Sorry, but this photo album was not found!</p>
						</div>
					{/module:PhotoAlbumView}
				{/page:PhotoAlbumView}

				{page:AudioList}
					{module:AudioPlaylistList featured="true"}
						<div id="main-content">
							{block:AudioPlaylistView}
								<div class="playlist-info">
									{if:AudioPlaylistHasThumbnail}
										<img src="{AudioPlaylistPhotoUrl}" class="cover-photo" title="{AudioPlaylistTitle}" />
									{/if:AudioPlaylistHasThumbnail}
									{if:AudioPlaylistCanBeSold}
									<div class="buy-link">
										{AudioPlaylistAddToCartLink audioPlaylistId="{AudioPlaylistId}" text="Buy Now"}<br />
										{if:AudioPlaylistCanNamePrice}min {/if:AudioPlaylistCanNamePrice}${AudioPlaylistPrice} USD
									</div>
									{/if:AudioPlaylistCanBeSold}
									{if:AudioPlaylistCanBeDownloadedForFree}
									<div class="buy-link">
										{AudioPlaylistFreeDownloadLink audioPlaylistId="{AudioPlaylistId}" text="Download"}<br />
										{AudioPlaylistFreeDownloadQuality}
									</div>
									{/if:AudioPlaylistCanBeDownloadedForFree}
									<h2>{AudioPlaylistTitle}</h2>
									<p>{AudioPlaylistArtist}</p>

									<div class="description">
										{AudioPlaylistDescription}
										<p>{if:AudioPlaylistHasReleaseDate}
											<strong>Released</strong> on {AudioPlaylistReleaseDate format="F n, Y"}{if:AudioPlaylistHasLabel} by {AudioPlaylistLabel}{/if:AudioPlaylistHasLabel}
										{if:Else}{if:AudioPlaylistHasLabel}
											<strong>Released</strong> by {AudioPlaylistLabel}
										{/if:AudioPlaylistHasLabel}{/if:AudioPlaylistHasReleaseDate}

										{module:BuyLinkList}
											<span class="buy-links">{Block:BuyLinkView}<a href="{BuyLink}">{BuyLinkTitle}</a>{/Block:BuyLinkView}</span>
										{/module:BuyLinkList}</p>
									</div>
								</div>

								<div id="jquery_jplayer" class="jp-jplayer"></div>
								<div id="jp_container" class="jp-audio">
									<ul class="jp-controls">
										<li><a href="javascript:;" class="jp-previous" tabindex="1"><span>previous</span></a></li>
										<li><a href="javascript:;" class="jp-play" tabindex="1"><span>play</span></a></li>
										<li><a href="javascript:;" class="jp-pause" tabindex="1"><span>pause</span></a></li>
										<li><a href="javascript:;" class="jp-next" tabindex="1"><span>next</span></a></li>
									</ul>
									<div class="jp-current-time"></div>
									<div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div>
									<div class="jp-time-left"></div>
									<div class="clear"></div>
								</div>

								{module:AudioList audioplaylistid="{AudioPlaylistId}"}
								<ul class="playlist-tracks">
									{block:AudioView}
									<li data-url="{AudioStreamUrl}">
										<span class="number">{AudioOrderNumber}</span>
										<span class="title">{AudioTitle}</span>
										<div class="links">
											{if:AudioCanBeSold}{AudioAddToCartLink audioId="{AudioId}" text="buy"}{/if:AudioCanBeSold}
											{if:AudioCanBeDownloadedForFree}{AudioFreeDownloadLink audioId="{AudioId}"}{/if:AudioCanBeDownloadedForFree}
											<a href="{AudioLink}">details</a>
										</div>
									</li>
									{/block:AudioView}
								</ul>
								{/module:AudioList}
							{/block:AudioPlaylistView}
						</div>
					{/module:AudioPlaylistList}

					{module:AudioPlaylistList}
						<div id="main-content">
							<h2>Playlists</h2>
							<ul class="playlist-blocks">
							{block:AudioPlaylistView}
								<li id="playlist{AudioPlaylistId}"><a href="{AudioPlaylistUrl}">
									{if:AudioPlaylistHasThumbnail}
										<img src="{AudioPlaylistPhotoUrl}" title="{AudioPlaylistTitle}" />
									{/if:AudioPlaylistHasThumbnail}
									<span class="total">{AudioPlaylistAudioCount} tracks</span>
									<h3>{AudioPlaylistTitle}</h3>
								</a></li>
							{/block:AudioPlaylistView}
							</ul>
						</div>
						{Else}
						<div class="nocontent">
							<p>We haven't uploaded any audio tracks yet, check back later!</p>
						</div>
					{/module:AudioPlaylistList}
				{/page:AudioList}

				{page:AudioPlaylistView}
					{module:AudioPlaylistView}
						<div id="main-content">
							{block:AudioPlaylistView}
								<div class="playlist-info">
									{if:AudioPlaylistHasThumbnail}
										<img src="{AudioPlaylistPhotoUrl}" class="cover-photo" title="{AudioPlaylistTitle}" />
									{/if:AudioPlaylistHasThumbnail}
									{if:AudioPlaylistCanBeSold}
									<div class="buy-link">
										{AudioPlaylistAddToCartLink audioPlaylistId="{AudioPlaylistId}" text="Buy Now"}<br />
										{if:AudioPlaylistCanNamePrice}min {/if:AudioPlaylistCanNamePrice}${AudioPlaylistPrice} USD
									</div>
									{/if:AudioPlaylistCanBeSold}
									{if:AudioPlaylistCanBeDownloadedForFree}
									<div class="buy-link">
										{AudioPlaylistFreeDownloadLink audioPlaylistId="{AudioPlaylistId}" text="Download"}<br />
										{AudioPlaylistFreeDownloadQuality}
									</div>
									{/if:AudioPlaylistCanBeDownloadedForFree}
									<h2>{AudioPlaylistTitle}</h2>
									<p>{AudioPlaylistArtist}</p>

									<div class="description">
										{AudioPlaylistDescription}
										<p>{if:AudioPlaylistHasReleaseDate}
											<strong>Released</strong> on {AudioPlaylistReleaseDate format="F n, Y"}{if:AudioPlaylistHasLabel} by {AudioPlaylistLabel}{/if:AudioPlaylistHasLabel}
										{if:Else}{if:AudioPlaylistHasLabel}
											<strong>Released</strong> by {AudioPlaylistLabel}
										{/if:AudioPlaylistHasLabel}{/if:AudioPlaylistHasReleaseDate}

										{module:BuyLinkList}
											<span class="buy-links">{Block:BuyLinkView}<a href="{BuyLink}">{BuyLinkTitle}</a>{/Block:BuyLinkView}</span>
										{/module:BuyLinkList}</p>
									</div>
								</div>

								<div id="jquery_jplayer" class="jp-jplayer"></div>
								<div id="jp_container" class="jp-audio">
									<ul class="jp-controls">
										<li><a href="javascript:;" class="jp-previous" tabindex="1"><span>previous</span></a></li>
										<li><a href="javascript:;" class="jp-play" tabindex="1"><span>play</span></a></li>
										<li><a href="javascript:;" class="jp-pause" tabindex="1"><span>pause</span></a></li>
										<li><a href="javascript:;" class="jp-next" tabindex="1"><span>next</span></a></li>
									</ul>
									<div class="jp-current-time"></div>
									<div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div>
									<div class="jp-time-left"></div>
									<div class="clear"></div>
								</div>

								{module:AudioList audioplaylistid="{AudioPlaylistId}"}
								<ul class="playlist-tracks">
									{block:AudioView}
									<li data-url="{AudioStreamUrl}">
										<span class="number">{AudioOrderNumber}</span>
										<span class="title">{AudioTitle}</span>
										<div class="links">
											{if:AudioCanBeSold}{AudioAddToCartLink audioId="{AudioId}" text="buy"}{/if:AudioCanBeSold}
											{if:AudioCanBeDownloadedForFree}{AudioFreeDownloadLink audioId="{AudioId}"}{/if:AudioCanBeDownloadedForFree}
											<a href="{AudioLink}">details</a>
										</div>
									</li>
									{/block:AudioView}
								</ul>
								{Else}
								<div class="empty-audio-playlist">
									<p>Sorry, this playlist is empty.</p>
								</div>
								{/module:AudioList}

								{if:HasTags}
								<section id="tags" class="audio-playlist-tags">
									<h2>Tags</h2>
									{module:TagList}
										{block:TagView}
											<span class="tag">{Tag}</span>
										{/block:TagView}
									{/module:TagList}
								</section>
								{/if:HasTags}
							{/block:AudioPlaylistView}
						</div>
					{Else}
						<div class="nocontent">
							<p>Sorry, but this playlist was not found!</p>
						</div>
					{/module:AudioPlaylistView}

					{module:AudioPlaylistList}
						<div id="audio-playlist-list-container">
							<h2>Playlists</h2>
							<ul class="playlist-blocks">
							{block:AudioPlaylistView}
								<li id="playlist{AudioPlaylistId}"><a href="{AudioPlaylistUrl}">
									{if:AudioPlaylistHasThumbnail}
										<img src="{AudioPlaylistPhotoUrl}" title="{AudioPlaylistTitle}" />
									{/if:AudioPlaylistHasThumbnail}
									<span class="total">{AudioPlaylistAudioCount} tracks</span>
									<h3>{AudioPlaylistTitle}</h3>
								</a></li>
							{/block:AudioPlaylistView}
							</ul>
						</div>
					{/module:AudioPlaylistList}
				{/page:AudioPlaylistView}

				{page:AudioView}
					{module:AudioView}
						<div id="main-content">
							{block:AudioView}
								<div class="single-info">
									{if:AudioCanBeSold}
									<div class="buy-link">
										{AudioAddToCartLink audioId="{AudioId}" text="Buy Now"}<br />
										{if:AudioCanNamePrice}min {/if:AudioCanNamePrice}${AudioPrice}
									</div>
									{/if:AudioCanBeSold}
									{if:AudioCanBeDownloadedForFree}
									<div class="buy-link">
										{AudioFreeDownloadLink audioId="{AudioId}" text="Download"}<br />
										{AudioFreeDownloadQuality}
									</div>
									{/if:AudioCanBeDownloadedForFree}
									<h2>{AudioTitle}</h2>
									<p>{AudioArtist}</p>

									<div class="description">
										{AudioDescription}
										<p>{if:AudioHasRecordedDate}
											<strong>Recorded</strong> on {AudioRecordedDate format="F n, Y"}
										{/if:AudioHasRecordedDate}

										{module:BuyLinkList}
											<span class="buy-links">{Block:BuyLinkView}<a href="{BuyLink}">{BuyLinkTitle}</a>{/Block:BuyLinkView}</span>
										{/module:BuyLinkList}</p>
									</div>
								</div>

								<div id="jquery_jplayer" class="jp-jplayer"></div>
								<div id="jp_container" class="jp-audio jp-audio-single" data-url="{AudioStreamUrl}">
									<ul class="jp-controls">
										<li><a href="javascript:;" class="jp-play" tabindex="1"><span>play</span></a></li>
										<li><a href="javascript:;" class="jp-pause" tabindex="1"><span>pause</span></a></li>
									</ul>
									<div class="jp-current-time"></div>
									<div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div>
									<div class="jp-time-left"></div>
									<div class="clear"></div>
								</div>
								{if:AudioHasLyrics}
								<div class="lyrics">{AudioLyrics}</div>
								{/if:AudioHasLyrics}

								{if:HasTags}
								<section id="tags" class="audio-tags">
									<h2>Tags</h2>
									{module:TagList}
										{block:TagView}
											<span class="tag">{Tag}</span>
										{/block:TagView}
									{/module:TagList}
								</section>
								{/if:HasTags}
							{/block:AudioView}
						</div>
					{Else}
					<div class="nocontent">
						<p>Sorry, but this audio file was not found!</p>
					</div>
					{/module:AudioView}
				{/page:AudioView}

				{page:About}
					<div id="main-content">
						{module:AccountAbout}
							<div class="account-overview">
								<img alt="{AccountName}'s account photo" id="account-photo" src="{AccountPhotoUrl size="small"}" />
								<ul id="account-links">
									{block:AccountLink}
										<li><a href="{LinkUrl}" target="_blank">{LinkTitle}</a></li>
									{/block:AccountLink}
								</ul>
							</div>
							<div class="account-bio">
								{block:AccountAbout}
									{AccountAbout}
								{/block:AccountAbout}
							</div>
						{Else}
							<p>We're sure you'll find our story fascinating, but we haven't written it yet!</p>
						{/module:AccountAbout}
					</div>
				{/page:About}
				{page:Error404}
					<div class="nocontent">
						<p>Error 404: This page doesn't exist.</p>
					</div>
				{/page:Error404}
			</div>
			{JS}
		</body>
	</html>

### CSS
	/* HTML5 Doctor CSS Reset - http://html5doctor.com/html-5-reset-stylesheet/ */
	html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video { margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}
	body{line-height:1}
	p {word-wrap: break-word}
	article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
	nav ul{list-style:none}
	blockquote,q{quotes:none}
	blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}
	a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}
	ins{background-color:#ff9;color:#000;text-decoration:none}
	mark{background-color:#ff9;color:#000;font-style:italic;font-weight:bold}
	del{text-decoration:line-through}
	abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}
	table{border-collapse:collapse;border-spacing:0}
	hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}
	input,select{vertical-align:middle}


	/* General Styles */
	a {}
	a:hover {}
	a:focus {}
	p {}
	.clear { display: block; clear: both; }
	img { display: block; max-width: 100%; }

	/* Page styles */
	html {}
	body {}

	/* Navigation */
	#main-nav {}
	#main-nav li {}
	#main-nav li.current {}
	#main-nav li a {}

	/* 404 Error Styles */
	.nocontent {}
	.nocontent.post {}

	/* Content Styles */
	#main-content {}

	.post {}

	.post.blog {}
	.post.blog.repost {}

	.post.status {}
	.post.status.repost {}
	.post.status .status-quote-mark {}

	.post.event {}
	.post.event ul.events-list.compact {}

	.post.photo {}
	.post.photo img {}

	.post.photo-album {}

	.post.video {}

	.post.audio {}

	.post .post-body {}

	.post .repost {}
	.post .repost .repost-account-image {}
	.post .repost .repost-info {}

	.post .read-more {}

	.post .footer-info {}
	.post .footer-info a {}
	.post.footer-info .datetime-link {}

	#pagination {}
	#pagination a {}

	.post.individual {}
	.post.individual.blog {}
	.post.individual.status {}
	.post.individual.photo {}

	.single-item-navigation {}
	.single-item-navigation a {}

	/* Tags */
	#tags {}
	#tags.blog-post-tags {}
	#tags.store-tags {}
	#tags.event-tags {}
	#tags.video-tags {}
	#tags.video-playlist-tags {}
	#tags.audio-tags {}
	#tags.audio-playlist-tags {}

	#tags .tag {}

	/* Store */
	.store-blocks { list-style: none; }
	.store-blocks li {}
	.store-blocks li a { display: block; }
	.store-blocks li img {}
	.store-blocks li .title {}
	.store-blocks li .price {}

	.store-item-container {}
	.store-item-container .store-item-info {}
	.store-item-container .store-item-info h2 {}
	.store-item-container .store-item-info .buy-link {}
	.store-item-container .store-item-info .description.long {}
	.store-item-container .store-item-info .description.long .inlineImage {}

	/* Events */
	a#other-events {}

	.events-list { list-style: none; }
	.events-list li {}
	.events-list .event-date {}
	.events-list .event-venue {}
	.events-list .event-location {}
	.events-list .event-actions {}
	.events-list .event-actions .event-tickets {}
	.events-list .event-actions .event-more {}

	.event-datetime {}
	.event-datetime .event-month {}
	.event-datetime .event-day {}
	.event-datetime .event-year {}
	.event-datetime .event-datetime-sub {}

	.event-details {}
	.event-details + .event-details {}
	.event-details #event-header {}
	.event-details #event-supportingacts {}
	.event-details #event-price {}
	.event-details #event-tickets {}
	.event-details #event-description {}
	.event-details #event-description p {}

	/* Video */
	.playlists-block { list-style: none; }
	.playlists-block li {}
	.playlists-block li a { display: block; }
	.playlists-block li img {}
	.playlists-block li h3 {}
	.playlists-block li .total {}

	.video-container {}
	#playlistTitle {}
	#playlistTitle .title {}
	#playlistTitle .total {}

	.video-blocks {}
	.video-blocks li {}
	.video-blocks li.current {}
	.video-blocks li a {}
	.video-blocks li .image {}
	.video-blocks li .image img {}
	.video-blocks li span {}
	.video-blocks li.nowPlaying { display: none; }

	.video {}
	.video h2 {}
	.video h2 a {}
	.video p {}

	.playlist-blocks {}
	.playlist-blocks li {}
	.playlist-blocks li a {}
	.playlist-blocks li a img {}
	.playlist-blocks li a h3 {}
	.playlist-blocks li a span {}

	/* Photos */
	.album-blocks { list-style: none; }
	.album-blocks li {}
	.album-blocks li a {}
	.album-blocks li a img {}
	.album-blocks li a .title {}

	.photo-image {}
	.photo-title {}
	.photo-backtoalbum {}
	.photo-description {}

	#album-info {}
	#album-info #album-cover {}
	#album-info #album-title {}
	#album-info #album-last-updated {}
	#album-info #description {}
	#album-info #album-photo-count {}

	.photos-list { list-style: none; }
	.photos-list li {}
	.photos-list li a {}
	.photos-list li a img {}

	/* Audio */
	.playlist-info {}
	.playlist-info .buy-link {}
	.playlist-info .description {}
	.playlist-info .description p {}

	.single-info {}
	.single-info .buy-link {}
	.single-info .description {}
	.single-info .description p {}
	.lyrics {}

	.jp-audio {}
	.jp-audio-single {}
	.jp-audio-activity-stream {}
	.jp-current-time {}
	.jp-time-left {}
	.jp-progress { overflow: hidden; cursor: pointer; }
	.jp-play-bar { height: 15px; background: #000; }

	.playlist-tracks { list-style: none; }
	.playlist-tracks li {}
	.playlist-tracks li .number {}
	.playlist-tracks li .title {}
	.playlist-tracks li .links {}
	.playlist-tracks li .links a {}

	.empty-audio-playlist {}

	/* Account About */
	.account-overview {}
	.account-overview #account-photo {}
	.account-overview #account-links { list-style: none; }
	.account-overview #account-links li {}

	.account-bio {}
	.account-bio p {}

### JavaScript
	var firstClicked = false;
	$('document').ready(function()
	{
		$('.video-blocks li a').click(function(e)
		{
			e.preventDefault();
			$(this).parents('li').siblings('.current').removeClass('current').end().addClass('current');
			if ( firstClicked )
			{
				var pos = $('.video-container').offset();
				$('body').animate({ scrollTop: pos.top - 40});
			}
			else
			{
				firstClicked = true;
			}
			$('.video-container').html(sbVideoList[$(this).attr('data-id')]);
		}).first().click();

		$("#jquery_jplayer").jPlayer({
			swfPath: "//stagebloc.com/assets/js/jplayer/",
			wmode: "transparent",
			supplied: "mp3",
			cssSelectorAncestor: "#jp_container"
		})
		.bind($.jPlayer.event.timeupdate + " " + $.jPlayer.event.loadedmetadata, function(event)
		{
			var status = event.jPlayer.status;
			$('#jp_container .jp-time-left').html($.jPlayer.convertTime(status.duration - status.currentTime));
		})
		.bind($.jPlayer.event.ended, function(event)
		{
			if ( $('#playlist-tracks li.current').next().length )
			{
				$('#playlist-tracks li.current').next().click();
			}
			else
			{
				$('#playlist-tracks li.current').removeClass('current');
				$('#jquery_jplayer').jPlayer("clearMedia");
			}
		});

		$('#playlist-tracks li').click(function()
		{
			$('#jquery_jplayer').jPlayer("setMedia", { mp3: $(this).attr('data-url') }).jPlayer("play");
			$(this).siblings().removeClass('current').end().addClass('current');
		});

		if ( $('#playlist-tracks').length )
		{
			$('#jquery_jplayer').jPlayer("setMedia", { mp3: $('#playlist-tracks li').first().attr('data-url') });
			$('#playlist-tracks li').first().addClass('current');
		}
		else if ( $('.jp-audio-activity-stream').length )
		{
			 $('.jp-audio-activity-stream').each(function()
			 {
			 	var id = $(this).attr('data-id'),
			 		url = $(this).attr('data-url');

			 	$("#jquery_jplayer" + id).jPlayer({ ready: function() { $(this).jPlayer("setMedia", { mp3: url }); },
			 		swfPath: "//stagebloc.com/assets/js/jplayer/", wmode: "transparent", supplied: "mp3", cssSelectorAncestor: "#jp_container" + id })
				.bind($.jPlayer.event.timeupdate + " " + $.jPlayer.event.loadedmetadata, function(event)
				{ $('#jp_container' + id + ' .jp-time-left').html($.jPlayer.convertTime(event.jPlayer.status.duration - event.jPlayer.status.currentTime)); })
				.bind($.jPlayer.event.play, function() { $(this).jPlayer("pauseOthers"); });
			});
		}
		else if ( $('.jp-audio-single').length )
		{
			$('#jquery_jplayer').jPlayer("setMedia", { mp3: $('.jp-audio-single').attr('data-url') });
		}

		$('.jp-controls .jp-previous').click(function()
		{
			if ( $('#playlist-tracks li.current').prev().length )
				$('#playlist-tracks li.current').prev().click();
			else
				$('#playlist-tracks li').last().click();
		});
		$('.jp-controls .jp-next').click(function()
		{
			if ( $('#playlist-tracks li.current').next().length )
				$('#playlist-tracks li.current').next().click();
			else
				$('#playlist-tracks li').first().click();
		});

		$('#playlist-tracks li a').click(function(e)
		{
			e.stopPropagation();
		});
	});
	
# Deprecated
### block:AccountPhoto