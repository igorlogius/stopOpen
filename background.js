
const extId = "stopOpen";
let stopOpen = false;
browser.browserAction.setBadgeBackgroundColor({color: "red"})
browser.browserAction.setBadgeText({"text": "off"}); // menu permission

browser.browserAction.onClicked.addListener((tab) => {
	stopOpen = !stopOpen;
	if(stopOpen){
		browser.browserAction.setBadgeText({"text": "on", "tabId": tab.id}); // menu permission
		browser.browserAction.setBadgeBackgroundColor({color: "green"})
	}else{
		browser.browserAction.setBadgeText({"text": "off", "tabId": tab.id}); // menu permission
		browser.browserAction.setBadgeBackgroundColor({color: "red"})
	}
});
/* not required, since new windows will open a new tab ... and closing that will also close the window
browser.windows.onCreated.addListener( async (window) => {
	if(stopOpen) {
		const wid = window.id;
		await browser.windows.remove(wid);
		browser.notifications.create(extId + wid, {
			"type": "basic",
			"iconUrl": browser.runtime.getURL("icon.png"),
			"title": extId + ':: Window', 
			"message":  'stopped a window from opening'
		});
	}
});
*/

browser.runtime.onInstalled.addListener( () => {
	stopOpen = false;
	browser.browserAction.setBadgeBackgroundColor({color: "red"})
	browser.browserAction.setBadgeText({"text": "off"}); 
});


browser.tabs.onCreated.addListener( async (tab) => {
	if(stopOpen) {
		const tid = tab.id;
		await browser.tabs.remove(tid);
		browser.notifications.create(extId + tid, {
			"type": "basic",
			"iconUrl": browser.runtime.getURL("icon.png"),
			"title": extId + ':: Tab', 
			"message":  'stopped a tab from opening'
		});
	}
});
