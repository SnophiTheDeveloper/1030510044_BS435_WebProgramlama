const imgs =[
    cat="./public/cat.jpg",
    dog="./public/dog.jpg"
];

var flag = 0;

function findCat(imgid) {
    let index = Math.floor(Math.random()*2);

    document.getElementById(imgid).src=imgs[index];
    document.getElementById(imgid).onclick=null;
    if(document.getElementById(imgid).src.match(imgs[0]))
    {   
        document.getElementById("alanId").innerHTML="Tebrikler! Oyunu kazandınız. Tekrar oyun oynamak için <span class='link' onclick=\"window.location.reload();\">buraya</span> tıklayabilirsiniz";
        for(var i=0; i<3;i++)
        {document.getElementById("img"+i).onclick=null;}
    }
    else
    {
        flag++;
        if(flag==2)
        {
            document.getElementById("alanId").innerHTML="Üzgünüm! Oyunu kaybettiniz. Tekrar oyun oynamak için <span class='link' onclick=\"window.location.reload();\">buraya</span> tıklayabilirsiniz";
            for(var i=0; i<3;i++)
            {document.getElementById("img"+i).onclick=null;}
        }
    }
}