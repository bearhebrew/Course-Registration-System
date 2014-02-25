var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

function jsddm_open()
{  jsddm_canceltimer();
   jsddm_close();
   ddmenuitem = $(this).find('ul').css('visibility', 'visible');}

function jsddm_close()
{  if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function jsddm_timer()
{  closetimer = window.setTimeout(jsddm_close, timeout);}

function jsddm_canceltimer()
{  if(closetimer)
   {  window.clearTimeout(closetimer);
      closetimer = null;}}

$(document).ready(function()
{  $('#jsddm > li').bind('mouseover', jsddm_open)
   $('#jsddm > li').bind('mouseout',  jsddm_timer)});

document.onclick = jsddm_close;

jQuery(document).ready(function() {
	// Number of course searches
	var sc = 1;

	// Add click function to add button
	$('.add_button').click(function() {
		sc++;
		$('#search').prepend(courseSearchHTML());
		$('#course_search_' + sc).slideToggle("slow");
	});

	// Remove function
	$(this).on('click', '.remove_button', function() {
		sc--;
		$(this).parent().slideToggle("slow", function() {
			$(this).remove();
		});
	});

	function courseSearchHTML() {
		return '<div id="course_search_' + sc + '" class="course_search" style="display:none;"> <h3 class="course_search_title">Course Search #' + sc + ' Criteria</h3><hr class="form-separator" /> <p>Term:<select><option value ="spring14">Spring 2014</option><option value ="fall14">Fall 2014</option></select></p><p>Subject: <select><option value="" style="display:none;"></option><option value ="computerScience">Computer Science</option><option value ="softwareEngineering">Software Engineering</option></select></p><p>Course Number: <input class="search-field" type="text" name="course" size="10"></input></p><p>Section Number: <input class="search-field" type="text" name="section" size="10"></input></p><p>Course Type<select><option value="" style="display:none;"></option><option value ="cd">Cultural Diversity</option><option value ="gu">Global Understanding</option></select></p><hr class="form-separator" /><p>Days:<input class="days" type ="checkbox" name="day" value="monday"> Mon </input><input class="days" type ="checkbox" name="day" value="tuesday"> Tue </input><input class="days" type ="checkbox" name="day" value="wednesday"> Wed </input><input class="days" type ="checkbox" name="day" value="thursday"> Thurs </input><input class="days" type ="checkbox" name="day" value="friday"> Fri </input><input class="days" type ="checkbox" name="day" value="friday"> Sat </input></p><p>Instructor: <input class="search-field" type="text" name="instructor"></input></p><a href="javascript:void(0)" class="remove_button">Remove me</a></div>';
	}
});

// ---------------- Calendar ------------------- //
jQuery('document').ready(function() {

$('#calendar').fullCalendar({
header: {
left: false,
center: false,
right: false
},
defaultView: 'agendaWeek',
hiddenDays: [0],
allDaySlot: false,
minTime: 8,
maxTime: 23,
columnFormat: {
week: 'ddd'
}
});

$('.fc-today').removeClass('fc-state-highlight');

$('#calendar').droppable({
activeClass: "ui-state-highlight",
drop: function(event, ui) {
$('#results_wrap').prepend("<h2>Class added!</h2>");
var eventObject = {
title: "Cool Event",
allDay: false,
start: new Date("Wed, 12 Feb 2014 10:00:00 EST"),
end: new Date("Wed, 12 Feb 2014 13:00:00 EST")
}
$('#calendar').fullCalendar('renderEvent',eventObject, true);
ui.draggable.remove();
}
});

$('.result')
.draggable({
revert: true,
revertDuration: 100,
zIndex: 1000
})
.click(function(event) {
var tar = $(event.target);
if(tar.hasClass('title') || tar.parent().hasClass('title')) {
alert("Course details");
} else {
if(!$(this).is('.ui-draggable-dragging')) {
$('.check').toggleClass('checked');
$('#result_1').prop('checked',$('.check').is('.checked'));
}
}
});
});

function getMUHours(hours) {
return hours.split(":")[0];
}

function getDOWDate(dayofweek) {
var d = new Date(); // Gets the current date
var day = d.getDay();
d.setUTCHours(0,0,0,0);
switch(dayofweek) {
case 'M':
d.setDate((d.getDate() - day) + 1);
break;
case 'T':
d.setDate((d.getDate() - day) + 2);
break;
case 'W':
d.setDate((d.getDate() - day) + 3);
break;
case 'TR':
d.setDate((d.getDate() - day) + 4);
break;
case 'F':
d.setDate((d.getDate() - day) + 5);
break;
default:
console.log("Invalid dayofweek in getDOWDate()");
break;
}
return d;
}