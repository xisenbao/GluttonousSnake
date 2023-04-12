//食物类
class Food {
    // HTMLElement 接口表示所有的 HTML 元素。一些 HTML 元素直接实现了 HTMLElement 接口，其它的间接实现 HTMLElement 接口。
    element: HTMLElement;

    constructor() {
        //! 告诉ts document.getElementById('food')不会是空的
        this.element = document.getElementById('food')!;
    }

    get X() {
        return this.element.offsetLeft;

    }
    get Y() {
        return this.element.offsetTop;
    }

    changePosition() {
        // 食物出现范围
        // x: 0-290
        // top:0 - 290
        //生成食物随机位置 因为🐍每次移动一格即10px 要求食物的坐标能整除10
        // Math.round(Math.random()*29)  //[0-29]
        let l = Math.round(Math.random()*29)*10;
        let t = Math.round(Math.random()*29)*10;

        this.element.style.left = l + 'px';
        this.element.style.top = t + 'px';

    }

}

// const food = new Food();
// // alert(food.X)
// // alert(food.Y)
// food.changePosition()

export default Food;
