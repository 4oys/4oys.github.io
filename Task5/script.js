window.addEventListener('DOMContentLoaded', function (event) {

const bd = [
    {
        id: 0,
        name: "Хлеб пшеничный",
        cost: 45
    },
    {
        id: 1,
        name: "Молоко 2.5%",
        cost: 80
    },
    {
        id: 2,
        name: "Яйца куриные (10 шт.)",
        cost: 120
    },
    {
        id: 3,
        name: "Сливочное масло 180 г",
        cost: 160
    },
    {
        id: 4,
        name: "Сыр российский 1 кг",
        cost: 550
    },
];


    document.querySelector("#button1").onclick = (event) => {

        event.preventDefault();

        const products = document.getElementsByName("number")[0].value;
        const selected_product = document.getElementsByName("select")[0].value;

        if (isValidValue(products)) {
            document.getElementById("result").innerHTML = "Cтоимость: " + bd[selected_product].cost * Number(products) + " рублей";
        }
        else {
            alert("Введите корректно");
        }
    };

});

function isValidValue(val) {
    return val.match(/^\d+$/) !== null;
}