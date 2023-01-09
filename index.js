(function() {
	const sendBtn = document.querySelector('#send');
	const messages = document.querySelector('#messages');
	const messageBox = document.querySelector('#messageBox');
	
	let ws;
	const name = prompt('Connect yourself to start talking : ');
	showMessage(`Thanks for joining us ${name} !`);
	
	function showMessage(msg) {
		messages.textContent += `\n\n${msg}`;
		messages.scrollTop = messages.scrollHeight;
		messageBox.value = '';
	}
	
	function init() {
		if (ws) {
			ws.onerror = ws.onopen = ws.onclose = null;
			ws.close();
		}
		
		ws = new WebSocket('ws://localhost:30000');
		ws.onopen = () => {
			ws.send(`${name} connected`);
			console.log('Connection opened !'); 
		}
		ws.onmessage = ({ data }) => showMessage(data);
		ws.onclose = function() {
			ws = null;
		}
	}

	sendBtn.onclick = function() {
		if (!ws) {
			showMessage("No WebSocket connection")
			return ;
		}
		
		ws.send(`${name} : ${messageBox.value}`);
		showMessage(`You : ${messageBox.value}`);
	}
	
	init();
})();