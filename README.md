# Instagram Widget

Easily add a "latest photos" type slideshow to your website.

You'll need to get an authemtication token from your instagram account in order to do that first though:

1. Log in instagram andf [register as a developer][dev]
1. Register a new "client" (Sandbox Mode is good enough)
1. Copy your "Client ID"
1. Make sure you setup the "Valid redirect URIs" under the Security tab
1. Authenticate you client by going to https://api.instagram.com/oauth/authorize/?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token
1. Once you authenticate, you'll be redirected to your redirect URL and the token will be appended to it
1. Add your token to the `AUTH_TOKEN` constant


[dev]:https://www.instagram.com/developer/
