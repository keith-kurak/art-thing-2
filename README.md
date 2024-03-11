# Art Thing 2
A demo of Expo Router v3 with API Routes using the Cleveland Museum of Art Open Access API

App concept: you download this thing before visiting the museum to preview the art you'll see there and "fav" the works you would like to scope out when you visit.
## Stuff it does
- Lists departments inside the museum
- List all the works on display at the museum / where the API returns a photo for each department.
- Reads and writes "favorite" works.
- Shows all your favorited works on the "Favorites" tab.
- Shows directions and hours for the museum. If you visit the museum, let me know and I'll try to join you!
## Stuff inside
- The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling from local files
- The favorites functionality is done with Expo Router API routes. Look for the +api files, one to get/ set claps for individual works, and another to read them all back for the Favorites tab. It's all going to a local data store (really just a text file) to keep things simple and self-contained.
- Styling via Nativewind v4
## How to run
1. Run `npm install`
2. Run `npx expo start`

## Other fun stuff
### Local data mode
I'm using this app as a bit of a sandbox to demo other features, some of which require making a standalone build, and I don't really want to deploy the simple above API _yet_ (it would need stuff like... user segmentation and security, y'know!). So, I wanted a 100% offline version. You can turn that by setting the environment variable `EXPO_PUBLIC_USE_LOCAL_DATA=true`.

See the **data/hooks** folder for how the switching works. One cool thing about Tanstack Query is that you can quite easily use anything for the backing store- it doesn't have to be a server API. So, nothing changes with the screens or the data hooks interface itself, it's all internal to the Tanstack Query calls. Even invalidating data and forcing refresh of other screens works just fine.

To run in local data mode, run `npm start-local`.

## Keith's contact info
[Bird app](https://twitter.com/llamaluvr)
[LinkedIn](https://www.linkedin.com/in/keith-kurak/)
[Discord](https://chat.expo.dev)

