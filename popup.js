$(function() {
	var oDate2 = new Date(localStorage["lastDate"]);
	for (var i = 0; i < 8; ++i) {
		a = JSON.parse(localStorage["n" + i]);
		if (i == 0)
			newDate = a[0];
		var oDate = new Date(a[0]);
		
		var elem = $(".i-0").clone(true, true);
		elem.find(".p-0").attr("id", "n" + i);
		if (oDate - oDate2 <= 0)
			elem.find(".p-1").hide();
		elem.find(".p-2").text(a[2]);
		elem.find(".p-3").text(
			(oDate.getDate() < 10 ? "0" : "") +
			oDate.getDate() + '.' +
			
			(oDate.getMonth() + 1 < 10 ? "0" : "") +
			(oDate.getMonth() + 1) + '.' +
			
			oDate.getFullYear() + "  " +
			
			(oDate.getHours() < 10 ? "0" : "") +
			oDate.getHours() + ':' + 
			
			(oDate.getMinutes() < 10 ? "0" : "") +
			oDate.getMinutes()
		);
		elem.children().appendTo(".i-1");
	}
	chrome.browserAction.setBadgeText({'text': ""});
	localStorage["lastDate"] = newDate;
	$(".p-0").click(function() {
		chrome.tabs.create({
			url: JSON.parse(localStorage[$(this).attr("id")])[3] + "&from=ext"
		});
	});
	$(".i-2").click(function() {
		chrome.tabs.create({url: "http://my-chrome.ru/?from=ext"});
	});
	$(".i-3").click(function() {
		$(".i-6").children().hide();
		$(".i-1").show();
		$(".g-0").removeClass("c-4");
		$(".i-3").addClass("c-4");
	});
	$(".i-4").click(function() {
		var printVersions = function() {
			$(".i-11").text(localStorage["versions0_3"] || "0.0.0.0");
			$(".i-12").text(localStorage["versions0_2"] || "0.0.0.0");
			$(".i-13").text(localStorage["versions0_1"] || "0.0.0.0");
			$(".i-14").text(localStorage["versions0_0"] || "0.0.0.0");

			$(".i-15").text(localStorage["versions4_3"] || "0.0.0.0");
			$(".i-16").text(localStorage["versions4_2"] || "0.0.0.0");
			$(".i-17").text(localStorage["versions4_1"] || "0.0.0.0");
			$(".i-18").text(localStorage["versions4_0"] || "0.0.0.0");

			$(".i-19").text(localStorage["versions5_2"] || "0.0.0.0");
			$(".i-20").text(localStorage["versions5_1"] || "0.0.0.0");
			$(".i-21").text(localStorage["versions5_0"] || "0.0.0.0");

			$(".i-22").text(localStorage["versions6_1"] || "0.0.0.0");
			$(".i-23").text(localStorage["versions6_0"] || "0.0.0.0");

			$(".i-24").text(localStorage["versions1_1"] || "0.0.0.0");
			$(".i-25").text(localStorage["versions1_0"] || "0.0.0.0");
		};
		printVersions();
		$.getJSON(
			'http://omahaproxy.appspot.com/all.json',
			{},
			function(json) {
				if (json) {
					localStorage["versions0_3"] = json[0].versions[3].version;
					localStorage["versions0_2"] = json[0].versions[2].version;
					localStorage["versions0_1"] = json[0].versions[1].version;
					localStorage["versions0_0"] = json[0].versions[0].version;

					localStorage["versions4_3"] = json[4].versions[3].version;
					localStorage["versions4_2"] = json[4].versions[2].version;
					localStorage["versions4_1"] = json[4].versions[1].version;
					localStorage["versions4_0"] = json[4].versions[0].version;

					localStorage["versions5_2"] = json[5].versions[2].version;
					localStorage["versions5_1"] = json[5].versions[1].version;
					localStorage["versions5_0"] = json[5].versions[0].version;

					localStorage["versions6_1"] = json[6].versions[1].version;
					localStorage["versions6_0"] = json[6].versions[0].version;

					localStorage["versions1_1"] = json[1].versions[1].version;
					localStorage["versions1_0"] = json[1].versions[0].version;
					
					printVersions();
				}
			}
		);
		$(".i-6").children().hide();
		$(".i-7").show();
		$(".g-0").removeClass("c-4");
		$(".i-4").addClass("c-4");
	});
	$(".i-5").click(function() {
		$(".i-6").children().hide();
		$(".i-8").show();
		$(".g-0").removeClass("c-4");
		$(".i-5").addClass("c-4");
	});
	var redrawNotificationOption = function() {
		if (localStorage["option_notification"])
			$(".i-9").addClass("strike")
		else
			$(".i-9").removeClass("strike")
	};
	redrawNotificationOption();
	$(".i-10").click(function() {
		if (localStorage["option_notification"])
			delete localStorage["option_notification"];
		else
			localStorage["option_notification"] = "false";
		redrawNotificationOption();
	});
});