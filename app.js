const loadData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    return(data.data.news_category)
}
const DetailData = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const data = await res.json()
    return(data.data)
}
const modalData = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    const data = await res.json()
    return(data.data[0])
}
const displyNav = async() => {
    const data = await loadData()
    const nav = document.getElementById('nav-detail')
    data.forEach(data => {
        const {category_id, category_name} = data
        const li = document.createElement('li')
        li.classList.add('nav-item')
        li.innerHTML = `
            <a onclick="displyDetail('${category_id}')" class="nav-link px-4 mx-3" href="#">${category_name}</a>
        `
        nav.appendChild(li)
    });
}
displyNav()

const displyDetail = async(id) => {
    document.getElementById('spinner').classList.remove('d-none')
    const data = await DetailData(id)
    document.getElementById('items').innerText = `${data.length}  items found for category Entertainment`
    const careDetail = document.getElementById('card')
    careDetail.textContent = ''
    data.forEach(data => {
        const {image_url, title, details, author, total_view, _id} = data
        const {img, name} = author
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="col">
              <div class="card" style="height: 625px;">
                <img src="${image_url}" class="img-fluid rounded-start" style="max-height: 500px;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 350)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <div class="d-flex align-items-center w-25 gap-2">
                            <img src="${img}" class="w-25 rounded-circle mr-2" alt="">
                            <h6 class="my-2">${name ? name : 'Not Found Name'}</h6>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fa-solid fa-eye ml-2"></i>
                            <p class="ml-2 m-auto">${total_view ? total_view : 'Not Found View'}</p>
                        </div>
                        <div>
                            <button onclick="newsDetail('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Detail
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        `
        careDetail.appendChild(div)
    })
    document.getElementById('spinner').classList.add('d-none')
}

const newsDetail = async(newsId) =>{
    const data = await modalData(newsId)
    const modalDetail = document.getElementById('exampleModal')
    modalDetail.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data ? data.title : 'Not Found Title'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${data ? data.image_url : 'Not Found image' }" alt="" class="img-fluid rounded-start">
      <p class="mt-3">${data ? data.details.slice(0, 200)
        : 'Not Found Tital'}...</p>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    `
}
newsDetail()