const angle1 = document.getElementById('angle1');
const angle2 = document.getElementById('angle2');
const angle3 = document.getElementById('angle3');

const side1 = document.getElementById('side1');
const side2 = document.getElementById('side2');
const side3 = document.getElementById('side3');

const button = document.getElementById('button');
const reset = document.getElementById('reset');

const result = document.getElementById('result');
const sides = document.getElementById('sides');
const sums = document.getElementById('sums');

const canvas = document.getElementById('triangleCanvas');
const ctx = canvas.getContext('2d');


function drawTriangle(a, b, c, angleA, angleB, angleC) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleFactor = 10;
    const ax = 50, ay = 650;
    const bx = ax + a * scaleFactor, by = ay;
    const angleARad = (Math.PI - ((angleB + angleA) * Math.PI / 180));
    const cx = ax + b * scaleFactor * Math.cos(angleARad);
    const cy = ay - b * scaleFactor * Math.sin(angleARad);


    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("∠C", ax - 10, ay + 10);
    ctx.fillText("∠B", bx + 5, by + 10);
    ctx.fillText("∠A", cx - 10, cy - 10);
}



[angle1, angle2, angle3, side1, side2, side3].forEach(input => {
    input.addEventListener('keypress', event => {
        const charCode = event.charCode || event.keyCode;
        if (charCode < 46 || charCode > 57) {
            event.preventDefault();
        }
    });

    input.addEventListener('paste', event => {
        const paste = event.clipboardData.getData('text');
        if (!/^\d+$/.test(paste)) {
            event.preventDefault();
        }
    });
});




const handleSideInput = () => {
    if (side1.value) {
        side2.disabled = true;
        side3.disabled = true;
    } else if (side2.value) {
        side1.disabled = true;
        side3.disabled = true;
    } else if (side3.value) {
        side1.disabled = true;
        side2.disabled = true;
    } else {
        side1.disabled = false;
        side2.disabled = false;
        side3.disabled = false;
    }
};
side1.addEventListener('input', handleSideInput);
side2.addEventListener('input', handleSideInput);
side3.addEventListener('input', handleSideInput);

reset.addEventListener('click', () => {
    result.innerHTML = '';
    sides.innerHTML = '';
    sums.innerHTML = '';
    angle1.value = '';
    angle2.value = '';
    angle3.value = '';
    side1.value = '';
    side2.value = '';
    side3.value = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    side1.disabled = false;
    side2.disabled = false;
    side3.disabled = false;
});



button.addEventListener('click', () => {
    const radian = (degree) => (degree * Math.PI) / 180;
    const angle1Value = parseFloat(angle1.value);
    const angle2Value = parseFloat(angle2.value);
    const angle3Value = parseFloat(angle3.value);
    let sideOne = parseFloat(side1.value);
    let sideTwo = parseFloat(side2.value);
    let sideThree = parseFloat(side3.value);





    if (isNaN(angle1Value) || isNaN(angle2Value) || isNaN(angle3Value)) {
        result.innerHTML = `<h1 class="text-red-500">Please enter valid numeric values.</h1>`;
        return;
    }
    const sum = angle1Value + angle2Value + angle3Value;
    if (sum === 180 && angle1Value > 0 && angle2Value > 0 && angle3Value > 0 && sideOne || sideTwo || sideThree) {

        if (sideOne || sideTwo || sideThree) {

            if (sideOne) {

                sideTwo = sideOne * Math.sin(radian(angle2Value)) / Math.sin(radian(angle1Value));
                sideThree = sideOne * Math.sin(radian(angle3Value)) / Math.sin(radian(angle1Value));
                sides.innerHTML = `<h1>Side A = ${sideOne}</h1><h1>Side B = ${Math.abs(sideTwo.toFixed(4))}</h1><h1>Side C = ${Math.abs(sideThree.toFixed(4))}</h1>`

                const area = (sideOne * sideTwo * Math.sin(radian(angle3Value))) / 2
                const perimeter = sideOne + sideTwo + sideThree
                const semiperimeter = (sideOne + sideTwo + sideThree) / 2
                sums.innerHTML = `<h1>Area = ${Math.abs(area.toFixed(4))}</h1><h1>Perimeter = ${Math.abs(perimeter.toFixed(4))}</h1><h1>Semiperimeter = ${Math.abs(semiperimeter.toFixed(4))}</h1>`;
            }
            else if (sideTwo) {

                sideOne = sideTwo * Math.sin(radian(angle1Value)) / Math.sin(radian(angle2Value));
                sideThree = sideTwo * Math.sin(radian(angle3Value)) / Math.sin(radian(angle2Value));
                sides.innerHTML = `<h1>Side A = ${Math.abs(sideOne.toFixed(4))}</h1><h1>Side B = ${sideTwo}</h1> <h1>Side C = ${Math.abs(sideThree.toFixed(4))}</h1>`

                const area = (sideOne * sideTwo * Math.sin(radian(angle3Value))) / 2
                const perimeter = sideOne + sideTwo + sideThree
                const semiperimeter = (sideOne + sideTwo + sideThree) / 2
                sums.innerHTML = `<h1>Area = ${Math.abs(area.toFixed(4))}</h1><h1>Perimeter = ${Math.abs(perimeter.toFixed(4))}</h1><h1>Semiperimeter = ${Math.abs(semiperimeter.toFixed(4))}</h1>`;
            }
            else if (sideThree) {

                sideTwo = sideThree * Math.sin(radian(angle2Value)) / Math.sin(radian(angle3Value));
                sideOne = sideThree * Math.sin(radian(angle1Value)) / Math.sin(radian(angle3Value));
                sides.innerHTML = `<h1>Side A = ${Math.abs(sideOne.toFixed(4))}</h1><h1>Side B = ${Math.abs(sideTwo.toFixed(4))}</h1> <h1>Side C = ${sideThree}</h1>`

                const area = (sideOne * sideTwo * Math.sin(radian(angle3Value))) / 2
                const perimeter = sideOne + sideTwo + sideThree
                const semiperimeter = (sideOne + sideTwo + sideThree) / 2
                sums.innerHTML = `<h1>Area = ${Math.abs(area.toFixed(4))}</h1><h1>Perimeter = ${Math.abs(perimeter.toFixed(4))}</h1><h1>Semiperimeter = ${Math.abs(semiperimeter.toFixed(4))}</h1>`;
            }
            drawTriangle(sideOne, sideTwo, sideThree, angle1Value, angle2Value, angle3Value);
        }




        // For Equilateral Triangle
        if (angle1Value === 60 && angle2Value === 60 && angle3Value === 60) {
            result.innerHTML = `<h1>This is an Equilateral triangle</h1>`;
        }
        // For every Right angle triangle
        else if (angle1Value === 90 || angle2Value === 90 || angle3Value === 90) {
            if (angle1Value === 90 && angle2Value === 45 && angle3Value === 45 || angle2Value === 90 && angle1Value === 45 && angle3Value === 45 || angle3Value === 90 && angle2Value === 45 && angle1Value === 45) {
                result.innerHTML = `<h1>This is a Right Isosceles triangle</h1>`;
            }
            else {
                result.innerHTML = `<h1>This is a Right Scalene triangle</h1>`;
            }
        }
        // For Isosceles Triangle
        else if (angle1Value === angle2Value || angle2Value === angle3Value || angle3Value === angle1Value) {
            if (angle1Value > 90 && angle2Value === angle3Value || angle2Value > 90 && angle1Value === angle3Value || angle3Value > 90 && angle2Value === angle1Value) {
                result.innerHTML = `<h1>This is an Obtuse Isosceles triangle</h1>`;
            }
            else if (angle1Value < 90 && angle2Value === angle3Value || angle2Value < 90 && angle1Value === angle3Value || angle3Value < 90 && angle2Value === angle1Value) {
                result.innerHTML = `<h1>This is an Acute Isosceles triangle</h1>`;
            }
        }
        // For Scalene Triangle 
        else if (angle1Value !== angle2Value && angle2Value !== angle3Value && angle3Value !== angle1Value) {

            if (angle1Value > 90 || angle2Value > 90 || angle3Value > 90) {
                result.innerHTML = `<h1>This is an Obtuse Scalene triangle</h1>`;
            }
            else if (angle1Value < 90 && angle2Value < 90 && angle3Value < 90) {
                result.innerHTML = `<h1>This is an Acute Scalene triangle</h1>`;
            }
        }
    }

    // Invalid sum of all angles
    else {
        result.innerHTML = `<h1 class="text-red-500">Please give angles properly and at least one side.</h1>`;
    }
});