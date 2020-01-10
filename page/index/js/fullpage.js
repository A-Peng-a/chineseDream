$(document).ready(function () {
    function mousemove1() {
        function Particle(x, y, radius) {

            this.init(x, y, radius);

        }
        Particle.prototype = {
            init: function (x, y, radius) {
                this.alive = true;

                this.radius = radius || 10;

                this.wander = 0.15;

                this.theta = random(TWO_PI);

                this.drag = 0.92;

                this.color = '#fff';

                this.x = x || 0.0;

                this.y = y || 0.0;

                this.vx = 0.0;

                this.vy = 0.0;

            },

            move: function () {

                this.x += this.vx;

                this.y += this.vy;

                this.vx *= this.drag;

                this.vy *= this.drag;



                this.theta += random(-0.5, 0.5) * this.wander;

                this.vx += sin(this.theta) * 0.1;

                this.vy += cos(this.theta) * 0.1;



                this.radius *= 0.96;

                this.alive = this.radius > 0.5;

            },

            draw: function (ctx) {

                ctx.beginPath();

                ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);

                ctx.fillStyle = this.color;

                ctx.fill();

            }

        };



        // ----------------------------------------

        // Example

        // ----------------------------------------



        var MAX_PARTICLES = 30; //粒子数量

        var COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900',

            '#FF4E50', '#F9D423'
        ];



        var particles = [];

        var pool = [];


        // 生成canver画布
        var demo = Sketch.create({

            container: document.getElementById('test')

        });

        demo.spawn = function (x, y) {



            if (particles.length >= MAX_PARTICLES)

                pool.push(particles.shift());

            particle = pool.length ? pool.pop() : new Particle();

            particle.init(x, y, random(5, 20)); //粒子大小



            particle.wander = random(0.5, 2.0);

            particle.color = random(COLOURS);

            particle.drag = random(0.9, 0.99);



            theta = random(TWO_PI);

            force = random(2, 8);



            particle.vx = sin(theta) * force;

            particle.vy = cos(theta) * force;



            particles.push(particle);

        };



        demo.update = function () {



            var i, particle;



            for (i = particles.length - 1; i >= 0; i--) {



                particle = particles[i];



                if (particle.alive)

                    particle.move();

                else

                    pool.push(particles.splice(i, 1)[0]);

            }

        };



        demo.draw = function () {

            demo.globalCompositeOperation = 'lighter';

            for (var i = particles.length - 1; i >= 0; i--) {

                particles[i].draw(demo);

            }

        };

        // 鼠标移动触发
        demo.mousemove = function () {

            var particle, theta, force, touch, max, i, j, n;

            // console.log(demo.touches);

            // for (i = 0, n = demo.touches.length; i < n; i++) {				

            touch = demo.touches[0], max = random(1, 4);

            for (j = 0; j < max; j++) {
                setTimeout(demo.spawn(touch.x, touch.y), 100);

            }

            // }

        };
    }
    $('#fullpage').fullpage({
        //导航
        menu: '#menu',
        lockAnchors: false,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fivePage', 'sixPage','seventPage'], //url后面的部分
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide', 'thirdPage', 'fourthPage','fivePage', 'sixPage', 'seventPage'], //右边导航圆点提示
        showActiveTooltip: false, //右边导航栏圆点显示当前页面的navigationTooltips
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //滚动
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true, //???????
        fitToSectionDelay: 1000, //??????
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        continuousVertical: false, //定义是否在最后一个区段向下滚动，或是否应该向下滚动到第一个区段，或如果在第一个区段向上滚动时是否应该滚动到最后一个区段。 不兼容loopTop，loopBottom或站点中存在的任何滚动条（scrollBar：true或autoScrolling：false）。
        loopHorizontal: true,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15, //移动端拖动的灵敏程度
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //fullPage.js的拓展
        continuousHorizontal: false, //fullPage.js的拓展。定义在最后一张幻灯片中向右滑动是否应该向右滑动到第一张幻灯片，或者如果在第一张幻灯片中向左滚动是否应向左滑动到最后一张。 不兼容loopHorizontal。
        scrollHorizontally: true, //  定义是否使用鼠标滚轮或触控板在滑块内水平滑动。
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,

        //可访问
        keyboardScrolling: true, //是否用键盘滚动
        animateAnchor: true, //定义给定锚点（＃）的站点的负载是否会随着动画滚动到其目的地或直接加载给定部分。
        recordHistory: true, //定义是否将网站的状态推送到浏览器的历史记录。 设置为true时，网站的每个部分/幻灯片将作为新页面，浏览器的后退和前进按钮将滚动部分/幻灯片以达到网站的上一个或下一个状态。 当设置为false时，URL将保持更改，但不会影响浏览器的历史记录。 使用autoScrolling：false时，该选项会自动关闭。

        //设计
        controlArrows: true,
        verticalCentered: true, //板块的内容是否居中展示
        sectionsColor: ['#333', '#0798ec', '#fc6c7c', '#fec401', '#fc6c7c'],
        paddingTop: '0em',
        paddingBottom: '40px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: {
            type: 'reveal',
            percentage: 62,
            property: 'translate'
        },
        cards: false,
        cardsOptions: {
            perspective: 100,
            fadeContent: true,
            fadeBackground: true
        },


        //自定义选择器
        sectionSelector: '.section',
        slideSelector: '.slide',

        lazyLoading: true,

        //事件
        onLeave: function (origin, destination, direction) {
            $("#test").remove();
            $(destination.item.children).prepend("<div id='test' style='position: absolute;top:0;left:0;z-index:10;'></div>");
            mousemove1();
            console.log(destination.item.children);
            
            var _this = destination;
            var aLi = $('.navigation ul li');
            // console.log(aLi[_this.index]);

            $('.navigation ul li').removeClass('active');
            $(aLi[_this.index]).addClass('active');
            // console.log(_this.index);
            var position = $(aLi[_this.index]).position();
            // console.log(position);
            var width = $(aLi[_this.index]).width();


            if (position.left >= pos) {
                line.animate({
                    width: ((position.left - pos) + width)
                }, 300, function () {
                    line.animate({
                        width: width,
                        left: position.left
                    }, 150);
                });
            } else {
                line.animate({
                    left: position.left,
                    width: ((pos - position.left) + wid)
                }, 300, function () {
                    line.animate({
                        width: width
                    }, 150);
                });
            }

            pos = position.left;
            wid = width;

        }, // 一旦用户离开某个节，过渡到新节，就会触发此回调。 返回“false”将在移动发生之前取消移动。
        afterLoad: function (origin, destination, direction) {}, //滚动结束之后，一旦加载了节，就会触发回调。
        afterRender: function () {
            $("#test").remove();
            $(".section1 .fp-tableCell").prepend("<div id='test' style='position: absolute;top:0;left:0;z-index:10;'></div>");
            mousemove1();
        }, //这个回调在页面结构生成后立即被触发。这是您要用来初始化其他插件的回调函数，或者触发任何需要文档准备就绪的代码
        afterResize: function (width, height) {}, // 调整浏览器窗口大小后，会触发此回调。 就在节被调整之后。
        afterResponsive: function (
            isResponsive) {}, // 在fullpage.js从正常模式变为响应模式或从响应模式变为正常模式之后，此回调将被触发。
        afterSlideLoad: function (section, origin, destination,
            direction) {}, // 滚动结束后，加载一个节的幻灯片后触发回调。
        onSlideLeave: function (section, origin, destination,
            direction) {} // 一旦用户离开幻灯片转到另一个幻灯片，就会触发此回调。返回false将在移动发生之前取消移动。
    });
    // setAllowScrolling();
    //初始化选中条的位置状态
    var line = $('<div />').addClass('line');
    line.appendTo($('.navigation'));
    var active = $('.navigation .active');
    var pos = 0;
    var wid = 0;
    if (active.length) {
        pos = active.position().left;
        wid = active.width();
        line.css({
            left: pos,
            width: wid
        });
    }
});