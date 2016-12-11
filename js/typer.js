$(function(){
    $(".name").typed({
        strings: ["Ken Luy"],
        startDelay: 0,
        showCursor: true,
        typeSpeed: 100,
        onStringTyped: function() {document.getElementsByClassName("typed-cursor")[0].className="empty";}
    });
    $(".skills").typed({
        strings: ["Software Engineer. Hacker. Learner."],
        startDelay: 2000,
        showCursor: true,
        typeSpeed: 100,
        onStringTyped: function() {document.getElementsByClassName("typed-cursor")[0].className="empty";}
    });
});
