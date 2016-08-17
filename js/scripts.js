$(document).ready(function(){
	var elementsCount = $(".loader_element").length;
	var currentElement = 0;
	currentColor = 0;
	var colors = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"];
	
	function getCurrentElement() {
		if(currentElement == elementsCount) {
			currentElement = 0
		}
		return currentElement++;
	}
	
	function getColor(){			
		
		if(currentColor >= colors.length) {
			currentColor = 0;
		}
		
		return colors[currentElement == elementsCount ? currentColor++ : currentColor];
	};
	
	setInterval(function() {
		$($(".loader_element")[getCurrentElement()]).css("background-color", getColor());
	}, 1000);
});