var userSigningIn; //which player is signing in

window.onload = function() {
	// Event Listeners
	$('.new-game-button').click(showNewGamePage);
	$('.home-button').click(showHomePage);
	$('#submit-options-button').click(startGame);
	$('#submit-login-button').click(function() {
		userSigningIn = 1;
		submitLogin();
	});
	$('#game-history-button').click(showHistoryPage);
	$('#logout-button').click(logout);
	$('#chooseTokenModal').on('show.bs.modal', onTokenModalOpened);
	$('#prev-board-button').click(clickPrevBoard);
	$('#next-board-button').click(clickNextBoard);
	$('#p1-pass-button').click(clickPass);
	$('#p2-pass-button').click(clickPass);

	loadGameHistory();
	loadTokenSelectionModal();
}

function showHomePage() {
	$('.initially-hidden').hide();
	if (player1.username)	// if logged in, show username
		$('#username-button').parent().parent().show();
	$('#home-page').show();
	pageSwitched();
}

function showNewGamePage() {
	$('.page-section').hide();
	$('#game-setup-page').show();
	$('#logo').show();
	pageSwitched();
}

function showGamePage() {
	$('.page-section').hide();
	$('#history-controls').hide();
	$('#game-page').show();
	$('#logo').show();
	pageSwitched();
	replay = false;
}

function showHistoryPage() {
	$('.page-section').hide();
	$('#history-page').show();
	$('#logo').show();
	pageSwitched();
}

// gets called whenever pages are switched
function pageSwitched() {
	$('#alert').hide();
}


function startGame() {
	board.setSize(parseInt($('input[name="board-size-radio"]:checked').val()));
	currPlayer = 1;

	if (primary === 2) {
		primary = 1
		swapPlayerTokens();
	}  

	renderNewGameBoard();
	updatePlayerInfo();
	showGamePage();
}

function submitLogin() {
	var form = document.getElementById("login-form").elements;
	var username = form["username"].value;
	var password = form["password"].value;

	if (username.substring(0, 5) === "temp_") {
		alert("Please choose a username which does not start with 'temp_'");
		return;
	}

	auth(username, password, function(saveCredentialToCookie, result) {
		switch(result) {
			case -1:
				alert("You're already logged in!");
				break;
			case 0:
				alert("We couldn't find that password", "Oops...");
				break;
			case 1:
			case 3:
			case 4:
				if (userSigningIn == 1) {
					player1.username = username;
				} else {
					player2.username = username;
				}
				initialize(username, password, true);
		}
	});
}

function login() {
	$('#login-button').parent().parent().hide();
	$('#username-button').html(player1.username + '<b class="caret"></b>');
	$('#username-button').parent().parent().show();
	updatePlayerInfo();
	loadTokenSelectionModal();
}

function logout() {
	delCredentialCookie();
	location.reload();
}

/**
 * Creates an alert
 * @param text {string} alert message
 * @param header {string} optional, bolded text before message
 */
function alert(text, header) {
	var div = document.createElement("div");
	div.className = "alert alert-warning alert-dismissible fade in";
	div.setAttribute("role", "alert");

	var closeBtn = document.createElement("button");
	closeBtn.setAttribute("type", "button");
	closeBtn.setAttribute("class", "close");
	closeBtn.setAttribute("data-dismiss", "alert");
	closeBtn.setAttribute("arial-label", "Close");

	var closeImg = document.createElement("span");
	closeImg.setAttribute("aria-hidden", "true");
	closeImg.innerHTML = "&times;";

	closeBtn.appendChild(closeImg);
	div.appendChild(closeBtn);

	if (header) {
		var heading = document.createElement("strong");
		heading.innerHTML = header;

		div.appendChild(heading);
	}

	var message = document.createElement("span");
	message.innerHTML = text;

	div.appendChild(message);

	$('#alert').html(div);
	$('#alert').show();
}