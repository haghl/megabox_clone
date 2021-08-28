'use strict'
// 슬라이드 변수 선언
const   Container = document.querySelector('.slider_container'),
        Slider = document.querySelector('.slider'),
        Slide = document.getElementsByClassName('slide'),
        SlideCount = Slide.length,
        Pager = document.createElement('ul'),
        PrevBtn = document.querySelector('.prevbtn'),
        NextBtn = document.querySelector('.nextbtn'),
        PlayBtn = document.querySelector('.goslide'),
        PauseBtn = document.querySelector('.stopslide');

let CurrentIdx = 0,
    timer = 0;

//슬라이드 가로 배치
for(let i = 0; i < SlideCount; i++){
    Slide[i].style.left = 100 * i +'%';
    Pager.innerHTML += '<li></li>';
}
Pager.classList.add('pager');
Container.append(Pager);
// 클론 만들기(무한슬라이드 용)
const   FirstClone = Slide[0].cloneNode(true),// 첫 번째 슬라이드 클론
        LastClone = Slide[SlideCount - 1].cloneNode(true);// 마지막 슬라이드 클론

Slider.appendChild(FirstClone);
Slider.prepend(LastClone);
FirstClone.classList.add('clone');
LastClone.classList.add('clone');

LastClone.style.left = -100 + '%';
FirstClone.style.left = 100 * SlideCount + '%';
// 슬라이드 움직이기
function MoveSlide(idx){
    Slider.style.left = -100 * idx + '%';
    Slider.classList.add('animate');
    CurrentIdx = idx;
    for(let i = 0; i < Pager.children.length; i++){
        Pager.children[i].classList.remove('on');
    }
    CloneSlide(idx);
}
// 클론 배치
function CloneSlide(idx){
    if(idx === SlideCount){
        Pager.children[0].classList.add('on');
        setTimeout(() => {
            Slider.classList.remove('animate');
            Slider.style.left = '0%';
            CurrentIdx = 0;
        }, 400);
        setTimeout(() => {Slider.classList.add('on')}, 500);
    }else if(idx < 0){
        Pager.children[SlideCount - 1].classList.add('on');
        setTimeout(() => {
            Slider.classList.remove('animate');
            Slider.style.left = -100 * (SlideCount - 1) + '%';
            CurrentIdx = SlideCount - 1;
        }, 400);
        setTimeout(() => {Slider.classList.add('on')}, 500);
    }
    else{
        Pager.children[idx].classList.add('on');
    }
}
// 버튼 누르면 이동
for(let i = 0; i < SlideCount; i++){
    Pager.children[i].addEventListener('click', function(){
        MoveSlide(i);
    })
}
PrevBtn.addEventListener('click', function(){
    MoveSlide(CurrentIdx - 1);
})
NextBtn.addEventListener('click', function(){
    MoveSlide(CurrentIdx + 1);
})
// 자동
function AutoSlide(){
    timer = setInterval(() => {
        let next = (CurrentIdx + 1);
        MoveSlide(next);
    }, 3000);
}

PlayBtn.addEventListener('click', function(){
    AutoSlide();
    PlayBtn.classList.add('on');
    PauseBtn.classList.remove('on');
});
PauseBtn.addEventListener('click', function(){
    clearInterval(timer);
    PauseBtn.classList.add('on');
    PlayBtn.classList.remove('on');
});
// 첫화면
MoveSlide(0);
AutoSlide();
PlayBtn.classList.add('on');
// 슬라이드 끝

// 영화 예매 슬라이드
const   MovieTab = document.getElementsByClassName('movie_tab'),
        MovieSlide = document.getElementsByClassName('movie_container');

for(let i = 0; i < MovieTab.length; i++){
    MovieTab[i].addEventListener('click', (e) => {
        e.preventDefault();
        MovieOn(i);
    });
}
function MovieOn(i){
    for(let j = 0; j < MovieTab.length; j++){
        MovieTab[j].classList.remove('active');
        MovieSlide[j].style.display = 'none';
    }
    MovieTab[i].classList.add('active');
    MovieSlide[i].style.display = 'block';
}

// 영화 탭 메뉴 스와이퍼
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 24,
    breakpoints: {
        // when window width is >= 320px
        600: {
            slidesPerView: 1.4,
            spaceBetween: 24
        },
        // when window width is >= 480px
        768: {
            slidesPerView: 2,
            spaceBetween: 24
        },
        // when window width is >= 640px
        960: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});

MovieOn(0);
// 영화 예매 슬라이드 끝

// 공지사항 탭
const   NoticeTab = document.querySelector('.notice_tab');

for(let i = 0; i < NoticeTab.children.length; i++){
    NoticeTab.children[i].addEventListener('click', (e) => {
        e.preventDefault();
        for(let j = 0; j < NoticeTab.children.length; j++){
            NoticeTab.children[j].classList.remove('on');
        }
        NoticeTab.children[i].classList.add('on');
    });
}