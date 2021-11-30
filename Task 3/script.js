const input = document.querySelector('input')
const geoBtn = document.querySelector('.cht-btn__geo')
const sendBtn = document.querySelector('.cht-btn__send')
const chatWindow = document.querySelector('.cht-window')

const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com')


geoBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { coords } = position
            chatWindow.innerHTML += `
            <div class="message-box__user">
                <div class="cht-window__user-message message">
                    <a target="_blank" href="https://www.openstreetmap.org/${coords.latitude}${coords.longitude}">Гео-локация</a>
                </div>
            </div>
              `
            
            websocket.send(`${coords.latitude},${coords.longitude}`)  
            websocket.onmessage = null
        })
    }
})
sendBtn.addEventListener('click', () => {
    if (input.value) {
        chatWindow.innerHTML += `
        <div class="message-box__user">
            <div class="cht-window__user-message message">
                <p>${input.value}</p>
            </div>
        </div>    
        `
        websocket.send(input.value)
        websocket.onmessage = (response) => {
            chatWindow.innerHTML += `
                <div class="message-box__server">
                    <div class="cht-window__user-server message">
                        <p>${response.data}</p>
                    </div>
                </div>
            `
        } 
    }
})


