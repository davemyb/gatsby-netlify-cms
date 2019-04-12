---
templateKey: blog-post
title: Getting Apigee Kickstart to work on Pantheon
date: 2019-04-12T01:15:11.196Z
description: >-
  Apigee Kickstart is a Drupal 8 install profile that creates a developer portal
  that syncs with Apigee Edge to showcase your APIs for developers to use. This
  post shows you how to create a composer managed site that is hosted on
  Pantheon and uses Lando for local development.
tags:
  - Pantheon
  - Install Profile
  - Apigee
---
To have a Pantheon-compatible install, we should have Drupal installed in a sub-folder called _web_. You can create your own _composer.json_ file, but the following is a good starting point (adapted from <https://pantheon.io/docs/guides/drupal-8-composer-no-ci>). This method removes the CircleCI config - feel free to leave it if that’s something you want to use. Pantheon has docs on using a CI workflow too: <https://pantheon.io/docs/guides/build-tools>.

_NOTE: You should install **terminus** to make your life easier when working with Pantheon (Mac/Linux only). See_ [_https://pantheon.io/docs/terminus/install_](https://pantheon.io/docs/terminus/install)_. Also make sure you’ve authenticated into terminus using Pantheon’s Machine Token (_[_https://pantheon.io/docs/machine-tokens/#addsearch=terminus_](https://pantheon.io/docs/machine-tokens/#addsearch=terminus)_)._

First create an empty site on Pantheon’s server:

```
terminus site:create [pantheon-site-name] 'My D8 Composer Site' empty
```

Clone Pantheon’s drops-8 repo and use it as your starting point for a Composer build:

```
git clone git@github.com:pantheon-systems/example-drops-8-composer.git [pantheon-site-name] 
```

```
cd [pantheon-site-name]
```

Next, change the git url to your Pantheon site’s git repo:

```
git remote set-url origin $(terminus connection:info [pantheon-site-name].dev --field=git_url)
```
