
import Snake from "./Snake";
import ScorePasnel from "./ScorePanel";
import Food from "./Food";
// 游戏控制类
class GameControl {
    snake:Snake;
    food:Food;
    scorePanel:ScorePasnel;

    direction:string = 'Right'; //键盘案件方向 （🐍移动方向）
    isOver:boolean = false; //游戏是否结束


    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePasnel(10,5);

        this.init();
    }

    //游戏初始化，调用后游戏开始
    init() {
        //让🐍动起来
        // document.addEventListener('keydown',this.keydownHandler) //this指向
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run();


    }

    keydownHandler(event:KeyboardEvent) {
        console.log(event.key);
        // ArrowLeft ArrowRight ArrowDown ArrowUp
        // ie: up dwon left right

        this.direction = event.key;
        console.log(this); //document 谁事件this指向谁
    }

    run() {
        // 根据移动方向改变snake位置 上 top- 下 top+ 左：left-，右 left+
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;            
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;

                    
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                            
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                        
                break;
        
            default:
                break;
        }

        this.handleEatFood(X,Y);

        try {            
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            console.log(error,'游戏结束');
            this.isOver = true;
            alert('游戏结束！')
            
            
        }

        !this.isOver && setTimeout(this.run.bind(this), 300 - 30*(this.scorePanel.level - 1));

    }
    //撞墙  🐍自己的事情，让🐍类处理
    // gameOver() {

    // }

    handleEatFood(X:number,Y:number):boolean {
        if(X === this.food.X && Y === this.food.Y){
            console.log('吃到食物');
            //食物被吃掉了 改变位置假装生成了新的食物
            this.food.changePosition();
            //长大
            this.snake.growUp();
            //加分
            this.scorePanel.addScore();

            return true;
        }
        return false;
    }


}

export default GameControl;