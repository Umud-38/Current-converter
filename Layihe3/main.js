// navbar select
const navbarActive = document.querySelectorAll("header ul li")

navbarActive.forEach(element => {
   element.addEventListener('click', () => {
      navbarActive.forEach(element => {
         element.classList.remove('active')
      })
      element.classList.add('active')
   })
})

// navbar responsive
const hamburger = document.querySelector('.hamburger')
const navBar = document.querySelector('header ul')
hamburger.addEventListener('click', () => {
   if(navBar.style.display == 'flex') {
      navBar.style.display = 'none'
   }
   else {
      navBar.style.display = 'flex'
   }
})

let x = window.matchMedia("(max-width: 880px)")
x.addListener(() => {

if (x.matches) {
   navBar.style.display = "none";
} else {
   navBar.style.display = "flex";
}
})

// main
// variables
const currencyIn = document.querySelectorAll('.box-left .currency li')
const currencyOut = document.querySelectorAll('.box-right .currency li')
const moneyIn = document.querySelector('.box-left .money')
const moneyOut = document.querySelector('.box-right .money')
const constMoneyLeft = document.querySelector('.box-left .const-money')
const constMoneyRight = document.querySelector('.box-right .const-money')
const container = document.querySelector('main .container')

let base = 'RUB', symbols = 'USD', ratio, ratio2;

// Fetch
// moneyIn.value = 1
function getFetch() {
   if(base == symbols) {
      constMoneyLeft.innerHTML = `1 ${base} = 1 ${base}`
      constMoneyRight.innerHTML = `1 ${symbols} = 1 ${symbols}`
      return moneyOut.value = moneyIn.value;
   }

   async function fetches(url) {
      const response = await fetch(url)
      const data = await response.json()
      return data; 
   }

   Promise.all([
      fetches(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`),
      fetches(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
   ])
   .then(arr => {
      ratio = arr[0].rates[symbols]
      ans(arr[0])
      ratio2 = arr[1].rates[base]
      ans2(arr[1])
   })
   .catch(err => {
      alert('An Error Occurred!')
   })
}
getFetch()

// checkLeft
function choiceIn(elem) {
   currencyIn.forEach(elem => {
      elem.classList.remove('active')
   })
   elem.classList.add('active')
   return getFetch();
}
currencyIn.forEach(elem => elem.addEventListener('click', () => { 
   base = elem.innerHTML
   return choiceIn(elem)
}) )

// checkRight
function choiceOut(elem) {
   currencyOut.forEach(elem => {
      elem.classList.remove('active')

   })
   elem.classList.add('active')
   return getFetch();
}
currencyOut.forEach(elem => elem.addEventListener('click', () => { 
   symbols = elem.innerHTML
   return choiceOut(elem)
}) )

// check
function ans() {
   if(base == symbols)
      return moneyOut.value = moneyIn.value
   moneyOut.value = moneyIn.value * ratio;
   constMoneyLeft.innerHTML = `1 ${base} = ${ratio} ${symbols}`
}

function ans2() {
   constMoneyRight.innerHTML = `1 ${symbols} = ${ratio2} ${base}`
}

// (,) to (.)
function point(e) {
   if (e.key === ','){
      // get old value
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const oldValue = e.target.value;
      // replace point and change input value
      const newValue = oldValue.slice(0, start) + '.' + oldValue.slice(end)
      e.target.value = newValue;

      // replace cursor
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      e.preventDefault();
  }
}

function number(e) {
   let buttons = {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '0': '0',
      '.': '.',
      ',': ','
   }
    
   if(e.key !== buttons[e.key]) {
      e.preventDefault()
      return false
   }
}

moneyIn.addEventListener('keypress', (e) => {
   if(moneyIn.value.indexOf('.') != -1) {
      if((e.key === '.') || (e.key === ',')) {
         e.preventDefault()
         return false
      }
   }
   number(e)
   point(e)
})
moneyOut.addEventListener('keypress', (e) => {
   if(moneyOut.value.indexOf('.') != -1) {
      if((e.key === '.') || (e.key === ',')) {
         e.preventDefault()
         return false
      }
   }
   number(e)
   point(e)
})

// operation
moneyIn.addEventListener('keyup', (e) => {
   ans()
   if((moneyIn.value.length == 1) && (moneyIn.value[0] == '.'))
      moneyOut.value = '0.'
})

moneyOut.addEventListener('keyup', () => {
   if(base == symbols)
      return moneyIn.value = moneyOut.value
   moneyIn.value = moneyOut.value * ratio2;
   if((moneyOut.value.length == 1) && (moneyOut.value[0] == '.'))
      moneyIn.value = '0.'
})