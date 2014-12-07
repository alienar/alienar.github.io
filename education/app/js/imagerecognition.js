var World = {
	loaded: false,

	init: function initFn() {
		/* Disable all sensors in "IR-only" Worlds to save performance. If the property is set to true, any geo-related components (such as GeoObjects and ActionRanges) are active. If the property is set to false, any geo-related components will not be visible on the screen, and triggers will not fire.*/
		AR.context.services.sensors = false;
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		// Initialize Tracker
		// Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
		// e.g. replace "pageOne" used for creating the AR.Trackeable2DOBject below, with the name of one of your new target images.
		this.tracker = new AR.Tracker("assets/alphabets.wtc", {
			onLoaded: this.worldLoaded
		});

		// Create overlay for page one
		var imgOne = new AR.ImageResource("assets/a.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			offsetX: -0.15,
			offsetY: 0
		});
		var pageOne = new AR.Trackable2DObject(this.tracker, "a", {
			drawables: {
				cam: overlayOne
			}
		});

		// Create overlay for page two
		var imgTwo = new AR.ImageResource("assets/b.png");
		var overlayTwo = new AR.ImageDrawable(imgTwo, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		var pageTwo = new AR.Trackable2DObject(this.tracker, "b", {
			drawables: {
				cam: overlayTwo
			}
		});
		
		// Create overlay for page three
		var imgThree = new AR.ImageResource("assets/c.png");
		var overlayThree = new AR.ImageDrawable(imgThree, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		var pageThree = new AR.Trackable2DObject(this.tracker, "c", {
			drawables: {
				cam: overlayThree
			}
		});
		
		// Create overlay for page four
		var imgFour = new AR.ImageResource("assets/d.png");
		var overlayFour = new AR.ImageDrawable(imgFour, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		var pageFour = new AR.Trackable2DObject(this.tracker, "d", {
			drawables: {
				cam: overlayFour
			}
		});
		
		
	},

	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight1 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
		var cssDivRight2 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
		document.getElementById('loadingMessage').innerHTML =
		"<div" + cssDivLeft + ">Scan Target &#35;1 (surfer) or &#35;2 (biker):</div>" +
			"<div" + cssDivRight1 + "><img src='assets/a.png'></img></div>" +
			"<div" + cssDivRight2 + "><img src='assets/b.png'></img></div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function() {var e =document.getElementById('loadingMessage'); e.parentElement.removeChild(e);}, 10000);
	}
};

World.init();