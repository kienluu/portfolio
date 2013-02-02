## Compile for production
This code will compile the javascript and sass files:
```
./production-build.js
```

## Compile sass for dev
Compile with debug info when developing.  If using this with Chrome (Canary)
sass support, there will be a link to go straight to the file in chromes dev tools
with the ability to edit and update sass live (no page reload needed).
```
compass watch --debug
```

## GAE mysql & database setup
Install cloud sql commandline tools [here](https://developers.google.com/cloud-sql/docs/commandline)
Move the files to /usr/local/bin or somewhere in you sys PATH.

```bash
$ sudo chmod +x /usr/local/bin/google_sql.sh
$ google_sql.sh 'kienluu-sql:alpha'
sql> CREATE DATABASE $project_name DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
sql> CREATE USER '$project_name'@'localhost' IDENTIFIED BY '$project_name;
sql> GRANT ALL ON $project_name.* TO '$project_name'@'localhost';
sql> FLUSH PRIVILEGES;
sql> exit;
IS_APP_ENGINE=True SETTINGS_MODE=prod ./manage.py syncdb
```

Import or run sql on the cloud sql instance with the commandline tool:
```
google_sql.sh 'kienluu-sql:alpha' portfolio --user=portfolio --pass=portfolio < portfolio.sql
```

## Running the manage commands with different settings

Example for using gae_settings.ini
```
APPENGINE_PRODUCTION=True ./manage.py migrate
# equivalent to
IS_APP_ENGINE=True SETTINGS_MODE=prod
```

Example for using gae_local_settings.ini
```
IS_APP_ENGINE=True ./manage.py migrate
```

If these are not set then local_settings.ini is used instead.


