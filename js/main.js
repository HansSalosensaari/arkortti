import { CSS3DObject } from "./CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;

const callButton = document.querySelector("#callbutton");
const emailButton = document.querySelector("#emailbutton");
const closeButton = document.querySelector("#closebutton");
const infobox = document.querySelector("#infobox");
const infomessage = document.querySelector("#infomessage");

callButton.addEventListener("click", callInfo);
emailButton.addEventListener("click", emailInfo);
closeButton.addEventListener("click", closeTab);

function callInfo() {
    infobox.classList.add("visible");
    infomessage.innerText = "Olen harrastamassa ankaraa \
    HTML-ohjelmointia, joten en vastaa juuri nyt puhelimeen!";
    setTimeout(() => {
        infobox.classList.remove("visible");
    }, 5000);
};

function emailInfo() {
    infobox.classList.add("visible");
    infomessage.innerText = "Lähetä minulle sähköpostia osoitteeseen \
    hans.salosensaari@student.lab.fi";
    setTimeout(() => {
        infobox.classList.remove("visible");
    }, 5000);
};

function closeTab() {
    infobox.classList.add("visible");
    infomessage.innerText = "Kiitos käynnistä ja tervetuloa uudelleen!";
    setTimeout(() => {
        window.location.href = "https://www.elab.fi";
    }, 3000);
};

async function startAR() {
    const mindARThreeJs = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../kortti.mind"
    });

    const { cssRenderer, renderer, cssScene, scene, camera } = mindARThreeJs;

    const arContainer = document.querySelector("#ar-container");
    const div = new CSS3DObject(arContainer);
    const anchor = mindARThreeJs.addCSSAnchor(0);
    anchor.group.add(div);

    anchor.onTargetFound = () => {
        arContainer.classList.add("ar-active");
    }

    anchor.onTargetLost = () => {
        arContainer.classList.remove("ar-active");
    }

    await mindARThreeJs.start();

    renderer.setAnimationLoop(render);
    function render() {
        cssRenderer.render(cssScene, camera);
    }
}
startAR();