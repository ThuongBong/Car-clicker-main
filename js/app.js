//Model
const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Audi A4 FWD 2019',
            imgSrc: '../img/Audi-A4-FWD-2019.jpg',
        },
        {
            clickCount: 0,
            name: 'BMW 330 RWD Sedan 2019',
            imgSrc: '../img/BMW-330-RWD-Sedan-2019.jpg',
        },
        {
            clickCount: 0,
            name: 'BMW 540d xDrive 2019',
            imgSrc: '../img/BMW-540d-xDrive-2019.jpg',
        },
        {
            clickCount: 0,
            name: 'Jaguar XF 20d Premium Sedan',
            imgSrc: '../img/Jaguar-XF-20d-Premium-Sedan.jpg',
        },
        {
            clickCount: 0,
            name: 'Mercedes-Benz CLA 250 Sedan 2019',
            imgSrc: '../img/Mercedes-Benz-CLA-250-Sedan-2019.jpg',
        },
    ],   
};
//Controller
const controller = {
    init() {
        //chọn phần tử ô tô đầu tiên
        model.currentCar = model.cars[0];

        //khởi tạo view
        carListView.init();
        carView.init();
    },

    getCurrentCar() {
        return model.currentCar;
    },

    getCars() {
        return model.cars;
    },

    //set xe hiện tại 
    setCurrentCar(car) {
        model.currentCar = car;
    },
    // tăng đếm
    incrementCounter() {
        model.currentCar.clickCount++;
        carView.render();
    },
};

//View
const carView = {
    init() {

        this.carEl = document.getElementById('car');
        this.carNameEl = document.getElementById('car-name');
        this.carImageEl = document.getElementById('car-img');
        this.countEl = document.getElementById('car-count');

        this.carImageEl.addEventListener('click',this.clickHandler);

        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
        const currentCar = controller.getCurrentCar();
        this.countEl.textContent = currentCar.clickCount;
        this.carNameEl.textContent = currentCar.name;
        this.carImageEl.src = currentCar.imgSrc;
        this.carImageEl.style.cursor = 'pointer';
    },
};

const carListView = {
    init() {
        this.carListEl = document.getElementById('car-list');
        this.render();
    },

    render() {
        let car;
        let el;
        let i;
        const cars = controller.getCars();

        this.carListEl.innerHTML ='';

        for (i = 0; i < cars.length; i++) {
            car = cars[i];

            el = document.createElement('li');
            el.className = 'list-group-item d-flex justify-content-between lh-condensed';
            el.style.cursor = 'pointer';
            el.textContent = car.name;
            el.addEventListener(
                'click',
                (function(carCopy) {
                    return function() {
                        controller.setCurrentCar(carCopy);
                        carView.render();
                    };
                })(car)
            );
            this.carListEl.appendChild(el);
        }
    },
};

controller.init();