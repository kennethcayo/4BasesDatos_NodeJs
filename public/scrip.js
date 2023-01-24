function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

de = document.querySelectorAll("#pruebah")
des = document.getElementById("pruebah")
de.forEach(element => {
    console.log(element.outerText)

});
//de=document.getElementById("pruebah").outerText
console.log(de)



const btnList = document.querySelectorAll('.editar')

btnList.forEach((btn, index) => {
    btn.addEventListener('click', event => {
        /*         console.log("ssssssssssssssssssssssS")
                console.log(btn.value)
                console.log(btn.parentElement)
                console.log(btn.parentNode)*/
        //console.log(index) 
        //alert(document.getElementById('tabla').tBodies[0].rows[0].cells[index].innerHTML);
        //console.log(btn.parentNode.parentNode)
        pru = btn.parentNode.parentNode
        console.log(prue = pru.querySelectorAll("td"))
        prue = pru.querySelectorAll("td")
        console.log(prue[0].innerText)

        // pu=document.getElementById('tabla').tBodies[0].rows[0].cells[0]
        des = document.getElementById(prue[0].innerText)
        //console.log(des.style.removeProperty(("display")))
        //des.style.removeProperty(("display"))
        var x = document.getElementById(prue[0].innerText);
        if (x.style.display === "none") {
            x.style.display = "contents";
        } else {
            x.style.display = "none";
        }



    })
})



// actualizar una aprte de la pagina
/* 
$(document).ready(function() {
    $('#recargarid').on('click', function() {
        $("#tablar").load('#recargarid');
        return false;
    });
});
 */

