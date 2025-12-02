document.addEventListener("DOMContentLoaded", function() {

    let base1 = 500;  // Замена масла
    let base2 = 700;  // Ремонт двигателя
    let base3 = 400;  // Шиномонтаж


    let count = document.getElementById("count");
    let options_block = document.getElementById("options_block");
    let property_block = document.getElementById("property_block");
    let options_select = document.getElementById("options_select");
    let property_checkbox = document.getElementById("property_checkbox");
    let result = document.getElementById("result");

    count.oninput = calculate;
    options_select.onchange = calculate;
    property_checkbox.onchange = calculate;

    let types = document.getElementsByName("type");
    for (let i = 0; i < types.length; i++) {
        types[i].onchange = changeType;
    }

    function getSelectedType() {
        for (let i = 0; i < types.length; i++) {
            if (types[i].checked) {
                return Number(types[i].value);
            }
        }
        return 0;
    }

    function changeType() {
        let t = getSelectedType();

        if (t == 1) {
            options_block.classList.add("hidden");
            property_block.classList.add("hidden");
        }
        if (t == 2) {
            options_block.classList.remove("hidden");
            property_block.classList.add("hidden");
        }
        if (t == 3) {
            options_block.classList.add("hidden");
            property_block.classList.remove("hidden");
        }

        calculate();
    }

    function calculate() {
        let n = Number(count.value);

        
        if (!Number.isInteger(n) || n <= 0) {
            alert("Введите натуральное число");
            result.innerHTML = "Стоимость: 0 рублей"
        }

        let type = getSelectedType();
        let price = 0;

        if (type == 1) {
            price = base1;
        }

        if (type == 2) {
            price = base2;
            price += Number(options_select.value); 
        }

        if (type == 3) {
            price = base3;
            if (property_checkbox.checked) {
                price += 150; 
            }
        }

        result.innerHTML = "Стоимость: " + (price * n) + " рублей";
    }

});