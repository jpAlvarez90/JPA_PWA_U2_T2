let contextSW = '/JPA_PWA_U2_T2/sw.js'
let url = window.location.href

let player = $('#player')
let front_camera = $('#front_camera')
let back_camera = $('#back_camera')
let photo_camera = $('#photo_camera')

let photo_text = ""

const camera = new Camera(player[0])

front_camera.on('click', () => {
    console.log('Camera front')
    photo_text = "Camara Frontal"
    camera.front_camera_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la camara')
        }
    })
})

back_camera.on('click', () => {
    console.log('Camera back')
    photo_text = "Camara Posterior"
    camera.back_camera_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la camara')
        }
    })
})

photo_camera.on('click', () => {
    console.log('Camera off')
    camera.camera_off()
    let photo = camera.take_photo()
    let img = create_img_node(photo, photo_text)
    $('#photo_list').append(img)
})

function create_img_node(image, photo_text) {

    let card = $(`
    <div class="mx-auto py-5">
        <img class="mx-auto rounded" style="width: 300px; height: 300px;" src="${image}">
        <h1 class="text-2xl font-thin pt-3 text-center">${photo_text}</h1>
    </div>
    `)
/*
    let img = document.createElement('img')
    img.src = image
    img.width = 300
    img.height = 300
*/
    return card
}

if (navigator.serviceWorker) {
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        contextSW = '/sw.js'
    }
    navigator.serviceWorker.register(contextSW)
}