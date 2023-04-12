class Snake {
    snakeHeadEle:HTMLElement; //头
    snakeBodies: HTMLCollection; //身体

    snakeEle:HTMLElement; //snake容器

    constructor() {

        this.snakeEle = document.getElementById('snake')!;
        this.snakeHeadEle = document.querySelector('#snake > div')! as HTMLElement;
        // this.snakeBodies = document.querySelectorAll('#snake > div'); //返回的是Nodeist 节点列表，获取后的值是静态的
        this.snakeBodies = this.snakeEle.getElementsByTagName('div'); //返回collection

    }

    get X() {
        return this.snakeHeadEle.offsetLeft;

    }
    get Y() {
        return this.snakeHeadEle.offsetTop;
    }

    set X(value) {
        //每变化，改变的是Y
        if(this.X === value) return;
        //撞墙 x:0-290 y:0-290
        if(value < 0 || value >290) {
            throw new Error('Snake cracked!')
        }
        //控制🐍不能掉头 往左走的时候，不能往右
        if(this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetLeft === value){
            console.log('有两节身体以上 水平方向发生了掉头');
            //如果发生了掉头，应该让snake让原来的原来的原来的方向继续移动
            if(value > this.X) {
                //让snake往右边，发生了掉头，让往左继续走
                value = this.X - 10;

            }else {
                value = this.X + 10;
            }
            
        }


        //移动身体
        this.addAndMoveBody();
        this.snakeHeadEle.style.left = value + 'px';
        //有没有撞倒自己
        this.checkCrackSelf();


    }
    set Y(value) {
        if(this.Y === value) return;
        //撞墙 x:0-290 y:0-290
        if(value < 0 || value >290) {
            throw new Error('Snake cracked!')
        }
        //控制🐍不能掉头 往上走的时候，不能往下
        if(this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetTop === value){
            console.log('有两节身体以上 水平方向发生了掉头');
            //如果发生了掉头，应该让snake让原来的原来的原来的方向继续移动
            if(value > this.Y) {
                value = this.Y - 10;

            }else {
                value = this.Y + 10;
            }
            
        }
        //移动身体
        this.addAndMoveBody();
        this.snakeHeadEle.style.top = value + 'px';
        this.checkCrackSelf();

    }

    //身体增加一节
    growUp() {
        // The insertAdjacentElement() method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.
        // 'beforebegin': Before the targetElement itself.
        // 'afterbegin': Just inside the targetElement, before its first child.
        // 'beforeend': Just inside the targetElement, after its last child.
        // 'afterend': After the targetElement itself.
        // The beforebegin and afterend positions work only if the node is in a tree and has an element parent.
        const tempDiv = document.createElement("div");
        this.snakeEle.insertAdjacentElement("beforeend",tempDiv)

    }

    addAndMoveBody() {
        // 后面一截身体要移动到前面一截的位置 从🐍尾巴开始改
        for(let i = this.snakeBodies.length - 1; i>0; i--) {
            let X = (this.snakeBodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.snakeBodies[i-1] as HTMLElement).offsetTop;

            (this.snakeBodies[i] as HTMLElement).style.left = X + 'px';
            (this.snakeBodies[i] as HTMLElement).style.top = Y + 'px';
        }

    }
    //🐍头坐标和身体坐标有没有重复
    checkCrackSelf() {
        //获取所有身体，检查是否和头的坐标发生重叠
        for(let i=1; i<this.snakeBodies.length;i++) {
            let bd = this.snakeBodies[i] as HTMLElement;
            if(bd.offsetLeft === this.X && bd.offsetTop === this.Y) {
                throw new Error('Snake cracked!')               

            }
        }


    }

}
export default Snake;