function Update() {
	$.ajax({
		url: "http://feeds.feedburner.com/my-chrome?format=xml",
		dataType: "xml",
		success: function(xml) {
			var i = 0; a = []; n = 0;
			$(xml).find("item").each(function() {
				if (i < 8) {
					a[0] = $(this).find("pubDate").text();
					a[1] = $(this).find("category:first").text();
					a[2] = $(this).find("title").text();
					a[3] = $(this).find("guid").text();
					localStorage["n" + i] = JSON.stringify(a);
					var date1 = new Date(a[0]);
					var date2 = new Date(localStorage["lastUpdateDate"]);
					if (date1 - date2 > 0 && !localStorage["option_notification"]) {
						++n;
						Notification(a[0], a[2], a[3]);
					}
				}
				++i;
			});
			if (n > 0) {
				chrome.browserAction.setBadgeText({
					'text': n + ""
				});
			}
			localStorage["lastUpdateDate"] = new Date();
		}
	});
}

function Notification(d, t, l) {
	var notiOpt = {
		type : "basic",
		title: "ХРОМ.РФ",
		message: t,
		iconUrl: "128.png"
	};
	var notifications_arr = JSON.parse(localStorage["notifications_arr"]);
	notifications_arr["id" + localStorage["notification_id"]] = l;
	localStorage["notifications_arr"] = JSON.stringify(notifications_arr);

	chrome.notifications.create("id" + localStorage["notification_id"], notiOpt, function() {});
	++localStorage["notification_id"];
}