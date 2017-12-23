$(function(){
    $(".skills").typed({
        strings: ["Software Engineer. Programmer. Learner."],
        startDelay: 1000,
        showCursor: true,
        typeSpeed: 100,
        onStringTyped: function() {document.getElementsByClassName("typed-cursor")[0].className="empty";}
    });
});
