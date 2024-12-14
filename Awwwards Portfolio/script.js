const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstpageanim(){
    let tl = gsap.timeline();

tl.from(".nav",{
    // height:50,
    y:30,
    opacity:0
})

tl.to(".boundingelem",{
    y:0,
    ease:Expo.easeInOut,
    duration:1.7,
    stagger:.2,
    delay:-1
})
tl.from(".headfooter",{
    y:10,
    opacity:0,
    ease:Expo.easeInOut,
    duration:1.5,
    delay:-1
})

}

let xscale = 1;
let yscale = 1;

let xprev = 0;
let yprev = 0;

function SkewingTheCursorFollower(){
    window.addEventListener("mousemove",function(dets){

        this.clearTimeout();
        let xdiff = xprev-dets.x
        let ydiff = yprev-dets.y

        xscale = gsap.utils.clamp(.8,1.2,xdiff)
        yscale = gsap.utils.clamp(.8,1.2,ydiff)

        xprev = dets.x;
        yprev = dets.y;

        // console.log(xdiff , ydiff);
        
        cursorfollowing(xscale,yscale);
       
        setTimeout(function(){
            document.querySelector(".cursor").style.transform = `translate(${dets.x+10}px,${dets.y+10}px) scale(1,1)`
    
        },100)

    })
    }   

let crsr = document.querySelector(".cursor");

function cursorfollowing(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        crsr.style.transform = `translate(${dets.x+20}px,${dets.y+20}px) scale(${xscale},${yscale})`
    })
}




document.querySelectorAll(".elem").forEach(function(elem){

    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mousemove",function(dets){   
        let diff = dets.clientY-elem.getBoundingClientRect().top;
        diffrot = dets.x-rotate;
        rotate = dets.x;
        gsap.to(elem.querySelector("img"),{
            opacity : 1,
            ease: Power3,
            top:diff,
            left:dets.x,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.8)
            // top:dets.x,
            // left:dets.y,
        });
    });
    elem.addEventListener("mouseenter",function(dets){   
        gsap.to(elem.querySelector("h1, h4"),{
            opacity:.2,
            x:60,
            // delay:0.2,
            // duration:0.8,
            ease: Power3,
        })
        gsap.to(elem.querySelector(" h4"),{
            opacity:.2,
            // x:60,
            // delay:0.2,
            // duration:0.8,
            ease: Power3,
        })

        crsr.innerHTML = "VIEW",
        gsap.to(crsr,{
            width: "80px",
            height: "80px",
            backgroundColor: "rgba(255, 255, 255)",
            mixBlendMode: "normal",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:"black"
        })




    });
    

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity : 0,
            ease: Power3,
            
        });

        gsap.to(elem.querySelector("h1"),{
            opacity:1,
            x:0,
            ease: Power3,
        })

        gsap.to(elem.querySelector(" h4"),{
            opacity:1,
            // x:60,
            // delay:0.2,
            // duration:0.8,
            ease: Power3,
        })


        crsr.innerHTML = "",
        gsap.to(crsr,{
            width: "15px",
            height: "15px",
            // backgroundColor: "rgba(255, 255, 255, 0.745)",
           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:""
        })

    });

});





firstpageanim();
cursorfollowing();
SkewingTheCursorFollower();