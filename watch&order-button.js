document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("watch-promo-btn").addEventListener("click", function () {
         
        //.scrollIntoView to video
         document.getElementById("promo-iframe").scrollIntoView({
            behaviour:"smooth",
            block: "center"});
        
        let iframe = document.getElementById("promo-iframe");
        let videoSrc = "https://www.youtube.com/embed/OgzeQf5i7TY?autoplay=1"; 
        iframe.src = videoSrc;
    });

    document.getElementById("ordernow").addEventListener("click", function () {
         
        //.scrollIntoView to video
         document.getElementById("Prircing-cards").scrollIntoView({
            behaviour:"smooth",
            block: "start"});    
      
    });

});
