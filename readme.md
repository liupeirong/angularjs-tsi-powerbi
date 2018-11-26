# Introduction
This is a crude sample that demonstrates how to embed Azure Time Series Insights (TSI) and Power BI charts in an AngularJS (Angular v1) application. It's aimed to show what's possible rather than best practices in programming in AngularJS. It uses AngularJS Azure Active Directory library to sign the user in and makes calls to TSI and Power BI on user's behalf.  While it can be a multi-tenant app and anyone with a valid Azure AD account can sign in, only users who have access to the target TSI environment and Power BI reports can see the charts.

# Notes
1.  This is a static web app with no server side code.  So there's no secure way to store secrets, such as the credential of an admin of TSI or Power BI Embedded. Power BI embedding is implemented as [User Owns Data](https://github.com/Microsoft/PowerBI-Developer-Samples#user-owns-data-samples)
2.  If you host this app in a subfolder of your web site rather than the root ('/'), you need to access it with a trailing slash of the subfolder, for example (https<nolink>://mysite.com/mysample/). A [hosted instance](https://pliustaticweb.z5.web.core.windows.net/angularadal/) can be found on Azure Storage static web site. 
3.  If you want to run it in your environment, just update the configurations in [env.js](env.js).
4.  To debug it in VSCode, install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and [IIS Express](https://marketplace.visualstudio.com/items?itemName=warren-buckley.iis-express), run the command ```IIS Express: Start Web Site``` from VSCode, and then go to the Debug pane of VSCode to launch or attach to Chrome. 

# TODO
Create a Angular 6 version of this app with backend so that we can embed visuals and reports for end users.