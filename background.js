
const extId = "stopOpen";

let stopOpen = false;

browser.browserAction.setBadgeBackgroundColor({color: "red"})
browser.browserAction.setBadgeText({"text": "off"}); 

browser.browserAction.onClicked.addListener((tab) => {
	stopOpen = (!stopOpen);
	if(stopOpen){
		browser.browserAction.setBadgeText({"text": "on", "tabId": tab.id}); 
		browser.browserAction.setBadgeBackgroundColor({color: "green"})
	}else{
		browser.browserAction.setBadgeText({"text": "off", "tabId": tab.id}); 
		browser.browserAction.setBadgeBackgroundColor({color: "red"})
	}
});

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
			"title": extId, 
			"message":  'stopped tab from opening'
		});
	}
});
