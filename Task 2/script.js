const btn = document.querySelector('.btn-test')

btn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { coords } = position
            alert(`Your location: ${coords.latitude}, ${coords.latitude}`)
        })
    }
})