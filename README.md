This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This guide explains: 

- Setup development environment for cloud database application 
- Compile and run the application
- Build the application 
- Deploy the application 

## Table of Contents

- [Instructions](#instructions)
- [Setup Dev Environment](#setup-dev-environment)
- [Compile and run the application](#compile-and-run-the-application)
- [Build the application](#build-the-application)

## Instructions

- Setup development environment for cloud database application 
- Compile and run the application
- Build the application 
- Deploy the application 
  

## Setup Dev Environment

1) Install <b>NodeJS (latest version)</b>. 
2) You may also need to install the <b>aws-cli (latest version)</b>

3) For ease-of-coding, you should also download VSCode, and its Github extension.

4) You also need to install <b> node-gyp v8.2.0 </b> using the npm globally (system-wise) as follows: 

```node
$ npm install node-gyp@8.2.0 -g 
```

5) Test the environment. Open the terminal / powershell / cmd and type the following: 

```bash
$ node -v
v14.18.1

$ npm -v 
6.14.17 

$ node-gyp.cmd -v # On Mac/Linux, use `node-gyp -v`
v8.2.0 
```

## Compile and Run the Application

Run the following commands from a terminal/powershell

```bash
$ git clone https://github.com/himotechglobal/capnolearner-web.git
$ cd capnolearner-web
$ npm install
```

At this point, if the npm process is not exited with an error code, then you have the JS libraries installed in the <i>node_modules</i> folder.

To the run the software in dev mode, use the following commands: 

```bash
$ cd capnolearner-web
$ npm run start
```


## Build the application

Run the following commands from a terminal/powershell

```bash
$ cd capnolearner-web
$ npm run build
```
At this point, if the npm process is not exited with an error code, then you have created builds files in the <i>build</i> folder.

Now you need to set up AWS Profile using follwoing commands.

```bash
$ aws set --profile <name of profile in package.json deploy scripts> 
```

After running this command it will ask you to enter access id and key obtained from AWS.

Then run the following command from a terminal/powershell to deploy the build file.

```bash
$ cd capnolearner-web
$ npm run deploy
```
