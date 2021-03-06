
let solution_mode = 1;
let Pi = "192.168.1.84";
$(document).ready(function(){
	menuClick();
	tabChange();
	tabActive();
	$("#select_box option:eq(0)").attr("selected","selected");
	//turn_off_solution();
	//set_current_date();
	/*
	var ctx = document.getElementById('myChart').getContext('2d');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			label: '',
			labels: ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30','9:00', '9:30', '10:00', '10:30', '11:00', '11:30'],
			datasets: [{
				data: [-10, 10, 0, -5, 10, 15,-20,-10, 10, 0, -5, 10, 15,-20,],
				borderColor: "white",
				backgroundColor: 'rgb(255, 99, 132)',
				borderWidth: 3,
				fill:false, // line의 아래쪽을 색칠할 것인가? 
				lineTension:0.1, // 값을 높이면, line의 장력이 커짐.
			}],
			
		},
		options: {
			legend:"",
			fill:false,
			scales: {
				yAxes: [{
					stacked: false
				}]
			}
		}
	});
	*/
	change_chart();
})


function showPopup(pop_id){
	var popup = $('#'+pop_id);
	popup.show()
}

function hidePopup(pop_id){
	var popup = $('#'+pop_id);
	popup.hide()
}

function menuClick(){
	var menu = $('header .btn-menu');
	var close = $('header .btn-close');
	var logout = $('header .btn-logout');
	var remote = $('header .btn-remote');
	var mode = $('header .btn-mode');
	var main = $('header .btn-choice-mode');
	var detail_air = $('header .btn-air');
	var data = $('header .btn-data');
	var home = $('header .btn-home');
	menu.on('click' , function(){
		$('.nav').fadeIn('fast');
	})
	close.on('click' , function(){
		$('.nav').fadeOut('fast');
	});
	logout.on('click' ,function(){
		$('.nav').fadeOut('fast');
		showPopup('Logout');
		
	})
	remote.on('click' ,function(){
		location.href='/remoteControl';
	})
	mode.on('click' ,function(){
		location.href='/modeControl';
	})

	main.on('click' ,function(){
		location.href='/main';
	})

	detail_air.on('click' ,function(){
		location.href='/detailair';
	})

	data.on('click' ,function(){
		location.href='/dataHistory';
	})
	home.on('click' ,function(){
		location.href='/main';
	})
}

function tabChange(){
	var tabList = $('.tab-list li');
	var tabItem = $('.tab-item');

	tabList.on('click' , function(){
		var idx = $(this).index();
		
		// console.log( tabItem.eq(idx))
		
		$(this).addClass('active').siblings().removeClass('active');
		tabItem.removeClass('active')
		tabItem.eq(idx).addClass('active')
		

	})
}

function myFunction() {
	let input, filter, ul, li, a, i
	input = document.getElementById("mySearch")
	filter = input.value.toUpperCase()
	ul = document.getElementById("myMenu")
	li = ul.getElementsByTagName("li")
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("a")[0]
		if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = ""
		} else {
			li[i].style.display = "none"
		}
	}
}

function tabActive(){
	var modeSettingList = $('.mode-setting ul li');
	var popupList = $('.reservation ul li');

	modeSettingList.on('click' , function(){
		var idx = $(this).index();
		modeSettingList.removeClass('active')
		modeSettingList.eq(idx).addClass('active')
		if(idx === 0){
			$.ajax({
				url: "/modeControl/normal", //url
				type: "get", //get, post 방식
				async: true, // true:비동기, false:동기
				success: function(data){
					alert('일반모드 구동!');
				},
				error: function(json){
					alert('일반모드 구동 에러');
				}
			});
		}
		else if(idx === 1){
			$.ajax({
				url: "/modeControl/infacts", //url
				type: "get", //get, post 방식
				async: true, // true:비동기, false:동기
				success: function(data){
					alert('영유아모드 구동!');
				},
				error: function(json){
					alert('영유아모드 구동 에러');
				}
			});
		}
		else if(idx === 2){
			$.ajax({
				url: "/modeControl/senior", //url
				type: "get", //get, post 방식
				async: true, // true:비동기, false:동기
				success: function(data){
					alert('노인모드 구동!');
				},
				error: function(json){
					alert('노인모드 구동 에러');
				}
			});
		}
		else if(idx === 3){
			$.ajax({
				url: "/modeControl/sleep", //url
				type: "get", //get, post 방식
				async: true, // true:비동기, false:동기
				success: function(data){
					alert('수면모드 구동!');
				},
				error: function(json){
					alert('수면모드 구동 에러');
				}
			});
		}
		else if(idx === 4){
			location.href='/modeControl/turnOffSolution';
		}
	})
	
	popupList.on('click' , function(){
		var idx = $(this).index();
		popupList.removeClass('active')
		popupList.eq(idx).addClass('active')
	})
}


function turn_off_solution(command){
	let year = $('#reservation-year').val();
	let month = $('#reservation-month').val();
	let day = $('#reservation-day').val();
	let hour = $('#reservation-hour').val();
	let minute = $('#reservation-minute').val();

	let data = {
		year : year,
		month : month,
		day : day,
		hour : hour,
		minute : minute
	};
	if(command === 'reservation'){
        fetch("http://localhost" + '/reservationcontrol/turnOffSolution/on', {
            method: 'post',
            body:    JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                "Access-Control-Allow-Origin": "*",
            },

        })
            .then(res => {
					alert('예약 완료!');
					res.json({});
			})
            .then(json => {
            	console.log(json);
			})
			.catch(res => {
				alert('예약 실패!');
			})
		location.href='/modeControl';
	}
	else if(command === 'cancel'){
		fetch("http://localhost" + '/reservationcontrol/turnOffSolution/off', {
			method: 'post',
			body:    JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				"Access-Control-Allow-Origin": "*",
			},

		})
			.then(res => {
				alert('예약 취소!');
			})
			.then(json => {
				console.log(json);
			})
			.catch(res => {
				alert('예약 취소 실패!');
			})
		location.href='/modeControl';
	}

}

function set_current_date(pop_id){
	
	let date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = (date.getMinutes() + 1) % 60;

	$("#reservation-year").val(year.toString()).prop("selected", true);
	$("#reservation-month").val(month.toString()).prop("selected", true);
	$("#reservation-day").val(day.toString()).prop("selected", true);
	$("#reservation-hour").val(hour.toString()).prop("selected", true);
	$("#reservation-minute").val(minute.toString()).prop("selected", true);
	showPopup(pop_id);
}

function Main_Ai(){
	if(document.getElementById('btn-reservation').style.visibility == "visible"){
		document.getElementById('btn-reservation').style.visibility = "hidden";
		$.ajax({
			url: "/modeControl/normal", //url
			type: "get", //get, post 방식
			async: true, // true:비동기, false:동기
			success: function(data){
				alert('일반모드 구동!');
			},
			error: function(json){
				alert('일반모드 구동 에러');
			}
		});
	}
	else{
		document.getElementById('btn-reservation').style.visibility = "visible";
		$.ajax({
			url: "/modeControl/off", //url
			type: "get", //get, post 방식
			async: true, // true:비동기, false:동기
			success: function(data){
				alert('일반모드 종료!');
			},
			error: function(json){
				alert('일반모드 구동 에러!');
			}
		});
	}

	

}

function reservation_mode_click(mode) {
	solution_mode = mode;
}

function turn_on_solution(command){

	let year = $('#reservation-year').val();
	let month = $('#reservation-month').val();
	let day = $('#reservation-day').val();
	let hour = $('#reservation-hour').val();
	let minute = $('#reservation-minute').val();

	let data = {
		year : year,
		month : month,
		day : day,
		hour : hour,
		minute : minute,
		mode : solution_mode
	};

	if(command === 'reservation'){
		fetch("http://localhost" + '/reservationcontrol/turnOnSolution/on', {
			method: 'post',
			body:    JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				"Access-Control-Allow-Origin": "*",
			},

		})
			.then(res => {
				//alert('예약 완료!');
				alert(solution_mode);
				res.json({});
			})
			.then(json => {
				console.log(json);
			})
			.catch(res => {
				alert('예약 실패!');
			});
		$('#Reservation_popup').fadeOut('fast');
	}
	else if(command === 'cancel'){
		fetch("http://localhost" + '/reservationcontrol/turnOnSolution/off', {
			method: 'post',
			body:    JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				"Access-Control-Allow-Origin": "*",
			},

		})
			.then(res => {
				alert('예약 취소!');
			})
			.then(json => {
				console.log(json);
			})
			.catch(res => {
				alert('예약 취소 실패!');
			})
		$('#Reservation_popup').fadeOut('fast');
	}

}
