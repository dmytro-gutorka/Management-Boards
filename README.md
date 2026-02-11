Important notes:
1. I pushed .env files in the repo, I know it's unsafe in production, but for the test task I dicided to pushed it here just in case.
2. Since I use free instance type on render.com it has a problem (quote from render doc): 
  "Free instances spin down after periods of inactivity...",
So the actual problem is - the first request to the server is quite long, therefore after sending the first request you better refresh the page for correct work 
P.S this problem exists only on a deplayed project, localy everything work fine
