# Home
Hello there. You are about to embark on an epic journey through StageBloc's theming engine documentation. It may sound scary, but if you have a basic understanding of HTML, CSS, or JavaScript, you should not have any issues.

### Fork us on GitHub!
All of StageBloc's documentation are up on GitHub for you to fork, modify, and improve. Join us over there to request features, add suggestions, and report bugs. What are you waiting for? [Git to it!](https://github.com/stagebloc/docs)

## Code Style Guidelines
Here are a few tips and tricks that we have when writing a theme. These are just some loose guidelines---don't follow them if necessary.

* Use semicolons in JavaScript. We do compress JavaScript before we upload it to our CDN, which may cause issues from time to time.

# Pages

## Available Pages
Note: Not all pages are required. Define pages that make sense for your theme, and the rest will be taken care of by the engine. No links will be broken.

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

### AccountName

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
Get a relative url to a particular section of the site.

Supported: Audio, Events, EventsPast, Blog, Statuses, Photos, Videos, Home  
Example: `<a href="{Link-Videos}">See my killer video about how to weave baskets underwater!</a>`  
Example return: `<a href="/account-name/videos">See my killer videos about how to weave baskets underwater!</a>`

## Variables with Options

### ActivityDate, AudioPlaylistReleaseDate, AudioRecordedDate, CreatedDate, EventEndDate, EventStartDate, ModifiedDate, PublishedDate
Show the date of various objects
  
format
:	the format of the date according to [PHP date() function](http://php.net/date) *defaults to n/j/y*  
: if set to "relative", returns time ago such as "5 seconds ago"
: if set to "gmdate", returns a GMT date in PHP date format 'Y-M-d h:i A' (see using `{EventList}` in the ActivityStream)

### AdminListLikeCount
Shows the amount of likes the collective admins for an account have

oneItemText
:	the text to append to the count if it happens to be 1

numerousItemText
:	the text to append to the count if it is anything other than 1

### AudioAddToCartLink
Creates a link that, when clicked, will add the item to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag *defaults to "Add To Cart"*

audioid
:	the ID of the audio you want to add to the user's cart *required*

class
:	the class to assign to the `<a>` tag

### AudioFreeDownloadLink
Creates a link that, when clicked, will download an audio file (unless it requires a follow to download, in which a modal will first show up)

text
:	the text to be put inside the `<a>` tag *defaults to "Download"*

audioid
:	the ID of the audio you want to download *required*

class
:	the class to assign to the `<a>` tag

### AudioPlaylistAddToCartLink
Creates a link that, when clicked, will add the audio playlist to the user's cart on StageBloc

text
:	the text to be put inside the `<a>` tag *defaults to "Add To Cart"*

preorderText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist *defaults to "Pre-order"*

preorderSoldOutText
:	the text to be put inside the `<a>` tag when a preorder is set up for the playlist and it has sold out (if it has a limit on the amount of orders) *defaults to "Pre-order Sold Out"*

audioplaylistid
:	the ID of the audio you want to add to the user's cart *required*

class
:	the class to assign to the `<a>` tag

### AudioPlaylistFreeDownloadLink
Creates a link that, when clicked, will download an audio playlist (unless it requires a follow to download, in which a modal will first show up) *Note: This will check to make sure a playlist is capable of being downloaded for free as well*

text
:	the text to be put inside the `<a>` tag *defaults to "Download"*

audioplaylistid
:	the ID of the audio playlist you want to download *required*

class
:	the class to assign to the `<a>` tag

### SecureEmail
Securely put a mailto: link in a theme  

address
:	the email address *required*

text
:	the text inside the `<a>` tag *defaults to address*

### LikeLink
Add a link to like a specific item  

likeText
:	the text to show when the item hasn't yet been liked by the viewer *defaults to "Like"*

unlikeText
:	the text to show when the item has been liked by the viewer *defaults to "Unlike"*

class
:	the class to give the `<a>` tag

### RepostLink
Add a link to repost a specific item  

repostText
:	the text to show when the item hasn't yet been reposted by the viewer *defaults to "Repost"*

unrepostText
:	the text to show when the item has been reposted by the viewer *defaults to "Unrepost"*

class
:	the class to give the `<a>` tag

# If Statements
If statements will check if a certain statement is true, and if it is, add the code inside. We also support the use of `{if:Else}` delimiters that will add a different code block if false. For example:
	
	{if:EventHasMinimumAge}
		This event requires that you are over the age of {EventAge} to enter.
	{if:Else}
		This event allows people (and aliens disguised as people) of any age to enter.
	{/if:EventHasMinimumAge}

Most if statements will only function in certain modules or blocks.

### if:ActivityIs[%type]
Use this if statement to compare if a certain activity list item is of a certain type.

Supported types: Audio, Blog, BlogRepost, Event, Photo, PhotoAlbum, Status, StatusRepost, Video  
Recommended modules: ActivityStreamList

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

### if:ReadMore
Checks if the current excerpt is trimmed to length of 600 characters (give or take, depending on HTML tags).

Recommended blocks: ActivityStreamView, BlogView  
Recommended pages: ActivityStreamList, BlogList

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
Renders if there is a defined bio text for the account.

AccountAbout
:	the bio text

AccountAboutCleaned
:	the bio text stripped of all tags except: `<span><em><strong><a><u><i><b>`

### block:AccountLink

LinkUrl
:	The URL

LinkTitle
:	The name of the link

### block:AccountPhoto

PhotoSource-Thumb
:	A square thumbnail, 130x130

PhotoSource-Small
:	Photo with max width of 250

PhotoSource-Medium
:	Photo with max width of 500

PhotoSource-Large
:	Photo with max width of 800

PhotoSource-Original
:	The originally uploaded photo.

	Use PhotoSource-Large when possible

## ActivityStreamList
Events are grouped in the activity stream.

supported
:	a comma separated list of supported content types. defaults to all. available: audio, blog, blog_reposts, events, photos, statuses, status_reposts, videos

groupPhotos
:	should photos be grouped into album updates. defaults to true

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
	* Photos albums: 
	* Video:
	* Audio:

ActivityCSSClass
:	the relevant classes from this list: repost, blog, status, event, video, audio, photo

ActivityDateTime
:	the time and date modified (photo albums), created (events, videos, audio), or published (blogs, statuses)

	See ### LINK how to format date variables ###

ActivityExcerpt
:	a trimmed version of {ActivityBody}, roughly 600 characters, taking into account HTML

ActivityExcerptCleaned
:	a trimmed version of {ActivityBody} stripped of all HTML except: `<span><em><strong><a><u><i><b>`

ActivityUrl
:	the permalink to the content's individual page

ActivityPhotoCount
:	number of photos added to a photo album item

ActivityPhotoUrl-[%size]
:	if content is a singular photo (see module options) and a photo, get photo url in size thumb, small, medium, large, or original

RepostedContentTimeAgo
:	if reposted, how long ago in relative time

RepostedFromAccountName
:	if reposted, what was the original account

RepostedFromAccountPhotoUrl
:	if reposted, what was the original account's photo

RepostedFromAccountUrl
:	if reposted, what was the original content permalink url

## BlogList
A listing of blogs.  

## BlogView
A view for a single blog post. Meant to be used with {Page:BlogView}

### block:BlogPost
AuthorName
:	author's name

AuthorPhotoUrl
:	url to a 130x130px user photo. if one isn't available, we'll use a default placeholder

BlogPostTitle
:	the content's title

BlogPostId
:	the content's id

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

## EventList
A listing of events.  

### Options

limit
: the amount of events to list per page *defaults to 50*

upcoming
: whether or not to show upcoming events *defaults to true*

past
: whether or not to show past events *defaults to false* Also see {if:HasPastEvents}

order
: the other to show the events in *defaults to asc*

### Variables  

TotalEvents
: the amount of events loaded based on your values for upcoming and/or past

## EventView
A view for a single event. Meant to be used with {Page:EventView}

### block:EventView

EventAges
:	will return either "Any Age" or "[%Age]+" (meaning this age and up). Also see {if:EventHasMinimumAge}

EventCity 
:	the city in which the event is taking place

EventState
:	the state in which the event is taking place

EventDescription
:	the description of the event

EventUrl
:	a permalink to the event's individual page

EventLocation
:	a string constructed by StageBloc based on the information available for the location. if in the USA, it will return "city, state", otherwise it will return "city, state, country"

EventPrice
:	the event for the price. Also see {if:EventHasPrice}

EventTitle
:	the title for the event. Also see {if:EventHasTitle}

TicketsBuyLink
:	a link to where tickets for this event can be purchased

VenueName
:	the name of the venue where this event is taking place

SupportingActs
:	a comma separated listing of the supporting acts for the event. Also see {if:EventHasSupportingActs}

VenueWebsiteUrl
:	the URL to the venue where the event is taking place. Also see {if:VenueHasWebsite}

## Navigation
Display all the links to active, defined content sections. *Note: If you do not have the page defined in your theme, the link will not show to that section, however the section will still work with our ###LINK fallback no content page layout###.*

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

PreviousPage
:	link to next page

## PhotoAlbumList
A listing of photo albums for the account

## PhotoAlbumView
A view for a single photo album. *Meant to be used with {Page:PhotoAlbumView}*

### block:PhotoAlbumView
Cover
:	a 130x130 pixel image of the cover for the album or a default image if the album doesn't have a cover set

CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the album to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the photo album

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
Options  
albumid
: an album id of which to limit the returned photos to *defaults to none*

## PhotoView
A view for a single photo. *Meant to be used with {Page:PhotoView}*  
Options  
photoid
: an ID for which photo to show *defaults to the one given to {Page:PhotoView} if in that {Page}*

### block:PhotoView

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

## StatusView
A view for an individual status. *Meant to be used with {Page:StatusView}*

### block:StatusPost

AuthorName
:	the author of the status

AuthorPhotoUrl
:	a 130x130 pixel image of the author of the photo or a placeholder if the photo doesn't exist

StatusText
:	the actual text of the status post

## TagList
A listing of tags for the current content item
Options  
limit
:	an amount to limit the tags for the item by

### block:TagView
Tag
:	the actual tag

## VideoList
A listing of videos.

videoplaylistid
:	a video playlist id to limit the videos to. *defaults to none*

limit
:	a limit on the amount of returned videos

order
:	the order in which to show the videos. *defaults to asc*

featured
:	whether or not to show the just featured video *defaults to false*

## VideoView
A view for a single video. *Meant to be used with {Page:VideoView}*  
Options  
videoid
: an ID for which video to show *defaults to the one given to {Page:VideoView} if in that page

### block:VideoView
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

VideoPlaylistCoverPhotoUrl
:	a 130x130px photo of the cover image for the video playlist or a default one if none exist

CreatedByPhotoUrl, ModifiedByPhotoUrl
:	a URL to the photo for who created/modified the video playlist to be used in an `<img src="" />` tag

CreatedByName, ModifiedByName
:	the name of the user who created/modified the video playlist

## AudioList
A listing of audio objects  

### Options

audioplaylistid
:	a audio playlist id to limit the videos to. *defaults to none*

limit
:	a limit on the amount of returned audio objects

order
:	the order in which to show the videos. *defaults to asc*

### Variables

TotalAudio:
:	the total amount of audio objects for the account

## AudioView
A view for a single audio object. *Meant to be used with {Page:AudioView}*  

audioid
: an ID for which audio to show *defaults to the one given to {Page:AudioView} if in that page

### block:AudioView
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

## AudioPlaylistList
A listing of audio playlists  

featured
:	whether or not to just show the featured audio playlist *defaults to false*

featuredfirst
:	whether or not to show the featured audio playlist first in the listing

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

AudioPlaylistCoverPhotoUrl
:	a 130x130 pixel playlist cover image or a default one if there is no cover set

AudioPlaylistArtist
:	the artist for the audio playlist

AudioPlaylistLabel
:	the label for the audio playlist

AudioPlaylistPrice
:	the price for the playlist *Note: if there is a pre-order currently active for the playlist, it'll use that price instead*

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

## FollowingList
A list of accounts that this account's admins are following

### block:FollowingView

FollowingAccountName
:	the name of the account being following

FollowingAccountUrl
:	the URL of the account being followed

## BuyLinkList
A listing of buy links for a the following modules: AudioView, AudioPlaylistView

### block:BuyLinkView

BuyLink
:	the actual link

BuyLinkTitle
:	the title for the buy link

BuyLinkPrice
:	the price of the material for the buy link

BuyLinkCurrency
:	the currency of the material in the buy link

# SB Nav
SB Nav is the little control box that appears in a corner of the screen. It allows users to log in; follow and unfollow accounts; and edit, like, repost, and buy content. As a theme author, you can change a few things.

## {SBNav position=""}
You can set the sbnav position with the {SBNav} variable. Place it anywhere in your theme and SB Nav will be placed in the specified corner.

position
:	which corner to be placed in. accepts two words in any order, separated by a space. top, bottom, left, right

## SB Nav color scheme
When submitting a theme, you can select a default color scheme that you feel best matches and fits in. Users have the option to override this in their account's theme management section.

# Example Theme

