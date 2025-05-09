const input = document.getElementById('input');
const button = document.getElementById('enter');
const bottom = document.getElementsByClassName('bottom')[0];
const guess = document.getElementById('guesses');

let randomNum = Math.floor(Math.random()*100) + 1;
let count = 0;
console.log(randomNum)



button.addEventListener('click',function(){
    const num = Number(input.value.trim());
    if(isNaN(num) || num<1 || num>100){
        alert("Please enter a number between 1 to 100")
        return;
    }

    if(num === randomNum){
        count++;
        guess.innerText = count;
        bottom.innerHTML = ` <p> Congratulations! You guessed it right</p> <button id = 'again'> Play Again </button>`;
        
        const again = document.getElementById('again');
        again.style.cssText = "margin : 5px ; padding : 5px ";
        again.addEventListener('click',function(){
            randomNum = Math.floor(Math.random()*100) + 1;
            console.log(randomNum)
            count = 0;
            guess.innerText = count;
            bottom.innerHTML = "";
            input.value = '';
        })
        return;
    }
    else if(num < randomNum){
        count++;
        guess.innerText = count;
        bottom.innerHTML = `<p> The number you guesses is less than the actual number.`
    }
    else{
        count++;
        guess.innerText = count;
        bottom.innerHTML = `<p> The number you guesses is greater than the actual number.`
    }
})

input.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        button.click();
    }
})