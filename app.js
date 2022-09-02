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
const displyNav = async() => {
    const data = await loadData()
    const nav = document.getElementById('nav-detail')
    data.forEach(data => {
        const {category_id, category_name} = data
        // console.log(category_id)
        const li = document.createElement('li')
        li.classList.add('nav-item')
        li.innerHTML = `
            <a onclick="displyDetail(${category_id})" class="nav-link px-4" href="#">${category_name}</a>
        `
        nav.appendChild(li)
    });
}
displyNav()

const displyDetail = async(id) => {
    const x = 0
    const str = `${x}${id}`;
    const data = await DetailData(str)
    console.log(data)
    const careDetail = document.getElementById('card')
    careDetail.textContent = ''
    data.forEach(data => {
        const {image_url, title, details, author, total_view} = data
        const {img, name} = author
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="row my-5 py-3 bg-light rounded">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${details.slice(0, 450)}...</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-4">
                <div class="d-flex align-items-center w-25">
                    <img src="${img}" class="w-25 rounded-circle mr-2" alt="">
                    <h5 class="my-2">${name}</h5>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-eye ml-2"></i>
                    <p class="ml-2 m-auto">${total_view}</p>
                </div>
                <div>
                    <button onclick="" type="button" class="btn btn-primary">Primary</button>
                </div>
            </div>
            </div>
        </div>
        `
        careDetail.appendChild(div)
    })
}
displyDetail()