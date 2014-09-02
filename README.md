open-health-inspection-twitter-bot
==================================

Automatically tweet the inspection results of restaurants in VA.

Uses env variables and can be run on heroku using scheduler

Requires
---
Node.js  
Heroku Toolbelt(Foreman)  
Twitter API key

```
git clone REPO
cd open-health-inspection-twitter-bot
npm install
cp .sampleenv .env
#fill out sample env
foreman start
#fires off one tweet
```
Note: Use heroku scheduler to have script run every X interval as desired.

license
=======
[Apache 2.0] (https://www.apache.org/licenses/LICENSE-2.0.html)
