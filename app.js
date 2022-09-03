const loadData = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try{
        const res = await fetch(url)
        const data = await res.json()
        return(data.data.news_category)
    }
    catch (error){
        console.log(error)
    }
}
const DetailData = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        return(data.data)
    }
    catch (error){
        console.log(error)
    }
}
const modalData = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        return(data.data[0])
    }
    catch (error){
        console.log(error)
    }
}
const displyNav = async() => {
    const data = await loadData()
    const nav = document.getElementById('nav-detail')
    nav.innerHTML = `
        <li><a class="nav-link px-4 mx-2" href="#">Home</a>
    `
    data.forEach(data => {
        const {category_id, category_name} = data
        const li = document.createElement('li')
        li.classList.add('nav-item')
        li.innerHTML = `
            <a onclick="displyDetail('${category_id}')" id="nav" class="nav-link px-4 mx-2" href="#">${category_name}</a>
        `
        nav.appendChild(li)
    });
}
displyNav()

const displyDetail = async(id) => {
    document.getElementById('spinner').classList.remove('d-none')
    const data = await DetailData(id)
    if(data.length > 0){
        document.getElementById('items').innerText = `${data.length}  items found for category Entertainment`
    }else{
        document.getElementById('items').innerText = `Now found for category Entertainment`
    }
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
                        <div class="d-flex align-items-center w-50 gap-2">
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
    console.log(data)
    const modalDetail = document.getElementById('exampleModal')
    modalDetail.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data ? data.title : 'Not Found Title'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${data ? data.image_url : 'Not Found image' }" alt="Not Found image" class="img-fluid rounded-start">
      <div class="d-flex align-items-center w-50 gap-2">
        <img src="${data ? data.author.img : 'Not Found image'}" class="w-25 rounded-circle mr-2" alt="Not Found image">
        <h6 class="my-2">${data?.author?.name ? data.author.name : 'Not Found Name'}</h6>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    `
}
newsDetail()

// const num = [20, 22, 5, 45, 15]
// num.sort(function(a,b){
//     return a - b
// })
// console.log(num)