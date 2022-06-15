// ---------horizontal-navbar-menu-----------
		var tabsNewAnim = $('#navbar-animmenu');
		var selectorNewAnim = $('#navbar-animmenu').find('li').length;
		var selectorNewAnim = $(".tabs").find(".selector");
		var activeItemNewAnim = tabsNewAnim.find('.active');
		var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
		var itemPosNewAnimLeft = activeItemNewAnim.position();
		$(".hori-selector").css({
			"left":itemPosNewAnimLeft.left + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
		$("#navbar-animmenu").on("click","li",function(e){
			$('#navbar-animmenu ul li').removeClass("active");
			$(this).addClass('active');
			var activeWidthNewAnimWidth = $(this).innerWidth();
			var itemPosNewAnimLeft = $(this).position();
			$(".hori-selector").css({
				"left":itemPosNewAnimLeft.left + "px",
				"width": activeWidthNewAnimWidth + "px"
			});
		});
// function load()
// {
// 	let getImage = document.getElementById('getImage');
// 	// var img = document.createElement('img');
// 	$.ajax({
//                     url: '/name',
//                     type: 'GET',
//                     success: function(data3){ 
//                         console.log("inside get method "+JSON.stringify(data3));
// 						// let s = JSON.stringify(data3);
// 						getImage.innerHTML = data3;
//                     },
//                     error: function(data) {
//                         alert(' second woops!'); //or whatever
//                     }
//                 }, false);
// 	// img.src = "../images/temp.jpg";
//             // document.getElementById('getImage').appendChild(img);
// }
function logout()
{
	let all = prompt("press 1 to logout from all devices and 0 for single device");
		 fetch('/logout', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer abcdxyz',
                    'Content-Type': 'application/json',
			 },
                body: JSON.stringify({ 'forLogout':all}),})
                .then((res) => {
                    return res.json();
                })
                .then((data) => console.log(data));
	
}