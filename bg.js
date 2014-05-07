chrome.runtime.onInstalled.addListener(function() {
	if (!localStorage["lastDate"])
		localStorage["lastDate"] = new Date(0);
	if (!localStorage["lastUpdateDate"])
		localStorage["lastUpdateDate"] = new Date(0);
	localStorage["notifications_arr"] = "{}";
	localStorage["notification_id"] = "0";
	Update();
	chrome.alarms.create({periodInMinutes: 15});
});

chrome.runtime.onStartup.addListener(function() {
	localStorage["notifications_arr"] = "{}";
	localStorage["notification_id"] = "0";
	Update();
	chrome.alarms.create({periodInMinutes: 15});
});

chrome.alarms.onAlarm.addListener(function() {
	Update();
});

chrome.notifications.onClicked.addListener(function(id) {
	chrome.browserAction.setBadgeText({'text': ""});
	chrome.tabs.create({url: JSON.parse(localStorage["notifications_arr"])[id] + "&from=ext"});
	chrome.notifications.clear(id, function() {});
});

chrome.notifications.onClosed.addListener(function(id) {
	var notifications_arr = JSON.parse(localStorage["notifications_arr"]);
	delete notifications_arr[id];
	localStorage["notifications_arr"] = JSON.stringify(notifications_arr);
});