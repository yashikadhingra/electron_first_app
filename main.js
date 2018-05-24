const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow,Menu,ipcMain} = electron;

// Module to create native browser window.
   // const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let addWindow;

//Listen for app to be ready
app.on('ready', function(){
	//create new window
	mainWindow = new BrowserWindow({});
	//load html into window
	mainWindow.loadURL(url.format({
		pathname:path.join(__dirname,'index.html'),
		protocol:'file',
		slashes:true
	}));
	//Quit app when closed


mainWindow.on('close',function(){
	app.quit();
});
	// build menu from template
	global.mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	//Insert menu
	Menu.setApplicationMenu(mainMenu);
});
ipcMain.on('user-data',function(e,item){

	mainWindow.webContents.send('user-data',item);
	addWindow.close();
});
 
 // Initialize Firebase

 //create menu template
const mainMenuTemplate =[
	{
		label:'File',
		enabled:false,
		submenu:[
		{
			label:'Add item',
			enabled:false,
			click(){
				createAddWindow();
			}
		},
		{
			label:'Clear Items',
			enabled:false
			
		},
		{
			label:'Quit',
			enabled:false,
			accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
			click(){
				app.quit();
			}
		}		
		]
	}
];

//If mac,add empty object to menu
if(process.platform == 'darwin'){
 mainMenuTemplate.unshift({});
}
// Add developer tool item if not in production
if(process.env.NODE_ENV !== 'production'){
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu:[
		{
			label:'Toggle DevTools',
			accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
			click(item,focusedWindow){
			focusedWindow.toggleDevTools();
			}
		},
		{
			role:'reload'
		}
		]
	});
}


