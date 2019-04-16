---
templateKey: blog-post
title: Drupal 8 Configuration management with Config Split
date: 2019-04-16T01:49:09.138Z
description: >-
  If you work with multiple environments like dev, stage and production, the
  Config Split module is a great way to automatically change the site
  configuration (settings, enabled modules) depending on what environment you're
  on. In this example we'll use Pantheon, but this can be made to work on Acquia
  as well, or any host that has multiple environments and custom environment
  variables to identify the environment.
tags:
  - config
  - Pantheon
---
We should export our config to a folder outside the docroot so that it’s easier to track changes to the website (and revert any bad changes). Instructions below adapted from <https://www.daggerhart.com/drupal-8-configuration-management-with-config-split/>.

Create a new folder called _config/sync_ in the root of the site (right below the web folder).

Edit _settings.php_ and add the following below the call to the _settings.pantheon.php_ file:

`/**`\
` * Place the config directory outside of the Drupal root.`\
` */`\
`$config_directories = array(`\
` CONFIG_SYNC_DIRECTORY => dirname(DRUPAL_ROOT) . '/config/sync',`\
`);`

In your Drupal site, go to /_admin/config/media/file-system_ and click Save. That will add a ._htacess_ file to the _config/sync_ folder.

From the command line, within the _web_ folder, run the following command to export all your current config:

`lando drush config:export`

If you get a prompt asking you to confirm the export, allow it.

The _sync_ folder should now contain all your existing config.

Commit it to the git repo and push to origin. If you have a site already hosted on Pantheon, you can use terminus to import the config there, or login and go to /admin/config/development/configuration, scroll all the way to the bottom and click Import to bring in all your config. Note: this will wipe out any changes you may have made to the Pantheon site, so if you need to keep them, make sure you duplicated those changes on your local site before exporting the config in step 4.

`terminus remote:drush mysite.dev -- config:import`

Be sure that any changes you make to configuration are exported and committed to your Git repo. Visit /admin/config/development/configuration to see if you have anything that needs exporting.

## Configuration Split

This is a contributed module (<https://www.drupal.org/project/config_split>) that allows you to have different config imported for different environments e.g. enable _devel_ module only on the dev environment and not on stage or prod. It is best to think of this as a way to conditionally **enable** modules/settings instead of conditionally **disabling** them.

Add this module to your site and enable it:

`composer require drupal/config_split`\
`lando drush en config_split`

You will see that it requires the _config_filter_ module as well, and you will be prompted to enable that too. Go ahead and allow it.

In the _config_ folder you created earlier, create a _splits_ folder and inside that create a folder for each environment you will use e.g. _dev, stage, prod_. Your folder structure should look like this:

Disable CSS and JS aggregation at _/admin/config/development/performance_, so that we have that off by default.

Export all your config and commit everything so that you have a clean slate for setting up the splits.
