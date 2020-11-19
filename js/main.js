$(document).ready(function () {

    // let btn = $('.btn');
    // let inp = $('.task-input');
    let list = $('.task-list');
    let page = 1;
    let pageCount = 1;
    let searchValue = '';
    $('.search-inp').on('input', function(e){
        searchValue = e.target.value
        render()
    })

    render()
    function getPagination(){
        fetch('http://localhost:8001/todo')
        .then(res => res.json())
        .then(data => {
            pageCount = Math.ceil(data.length / 4)
            $('.pagination-page').remove()
            for(let i = pageCount; i >= 1; i--){
                $('.previous-btn').after(`<span class=" pagination-page">
            <button><a href="#" alt="...">${i}</a></button>
            </span>`)
        }
    })
    }
    $('body').on('click', '.pagination-page', function(event){
        page = event.target.innerText
        render()
    })
    render()

    $('#btn_fam').on('click', function () {
        for (let i = 0; i < 3; i++) {
            if (!$('.task-input-1').val() && i == 0) {
                $('.task-input-1').css('border-color', 'red')
            } else if (!$('.task-input-2').val() && i == 1) {
                $('.task-input-2').css('border-color', 'red')
            } else if (!$('.task-input-3').val() && i == 2) {
                $('.task-input-3').css('border-color', 'red')
            } else {
                let obj = {
                    name: $(".task-input-1").val(),
                    lastName: $(".task-input-2").val(),
                    number: $(".task-input-3").val(),
                    img: './img/unnamed.png'
                }
                postNewTask(obj)
                render()
                $(".task-input-1").val('')
                $(".task-input-2").val('')
                $(".task-input-3").val('')
            }
            return
        }
        render()
    })
    $('#btn_frend').on('click', function () {
        for (let i = 0; i < 3; i++) {
            if (!$('.task-input-1').val() && i == 0) {
                $('.task-input-1').css('border-color', 'red')
            } else if (!$('.task-input-2').val() && i == 1) {
                $('.task-input-2').css('border-color', 'red')
            } else if (!$('.task-input-3').val() && i == 2) {
                $('.task-input-3').css('border-color', 'red')
            } else {
                let obj = {
                    name: $(".task-input-1").val(),
                    lastName: $(".task-input-2").val(),
                    number: $(".task-input-3").val(),
                    img: './img/unnamed (1).png'
                }
                postNewTask(obj)
                $(".task-input-1").val('')
                $(".task-input-2").val('')
                $(".task-input-3").val('')
                render()
            }
            return
        }
        render()
    })
    $('#btn_job').on('click', function () {
        for (let i = 0; i < 3; i++) {
            if (!$('.task-input-1').val() && i == 0) {
                $('.task-input-1').css('border-color', 'red')
            } else if (!$('.task-input-2').val() && i == 1) {
                $('.task-input-2').css('border-color', 'red')
            } else if (!$('.task-input-3').val() && i == 2) {
                $('.task-input-3').css('border-color', 'red')
            } else {
                let obj = {
                    name: $(".task-input-1").val(),
                    lastName: $(".task-input-2").val(),
                    number: $(".task-input-3").val(),
                    img: './img/SIM-Contacts-Manager.png'
                }
                postNewTask(obj)
                console.log(obj.name);
                render()
                $(".task-input-1").val('')
                $(".task-input-2").val('')
                $(".task-input-3").val('')
            }
            return
        }
        render()
    })


    function postNewTask(obj) {
        fetch('http://localhost:8001/todo', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(() => render())
    }


    function render() {
        fetch(`http://localhost:8001/todo?_page=${page}&_limit=4&q=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                list.html('')
                getPagination(  )
                // console.log(data);
                data.forEach(item => {
                    // console.log(item.id)
                    list.append(`<li id="${item.id}">
                        <img style="position: relative; right:0; bottom:0; padding:0; width: 20px; height: 20px;" src="${item.img}" alt="">
                        ${item.name} ${item.lastName} ${item.number}
                        <button class ="btn-delete"></button>
                        <button class ="btn-edit"></button>
                    </li>`)
                });
            })
    }

    $('body').on('click', '.btn-delete', function (event) {

        // console.log(event.target.parentNode);
        let id = event.target.parentNode.id
        // console.log(id)
        fetch(`http://localhost:8001/todo/${id}`, { method: "DELETE" })
            .then(() => render())
    })

    
    $('body').on('click', '.btn-edit', function (event) {
        let id = event.target.parentNode.id;
        // console.log(event.target.parentNode.id)
        // console.log(id)
        fetch(`http://localhost:8001/todo/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.name)
                // console.log(data)
                $('.inp-edit1').val(data.name)
                $('.inp-edit2').val(data.lastName)
                $('.inp-edit3').val(data.number)
                $('.main-modal').css('display', 'block')
                $('.btn-save').attr('id', id)
            })
    })
    
    $('.btn-save').on('click', function (event) {
        let id = event.target.id

        let obj = {
                name: $('.inp-edit1').val(),
                lastName: $('.inp-edit2').val(),
                number: $('.inp-edit3').val()   
        }
        fetch(`http://localhost:8001/todo/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                render()
                $('.main-modal').css('display', 'none')
            })
    })
    
    $('.next-btn').on('click', function(){
        if(page>= pageCount)return
        page++
        render()
    })
    render()
    
    $('.previous-btn').on('click', function(){
        if (page<=1) return
        page--
        render()
    })
    render()
})

