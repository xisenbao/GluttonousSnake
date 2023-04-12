

class ScorePasnel {
    score:number = 0;
    level:number = 1;

    maxLevel:number; //最大级别
    upScore:number; //每提高upScore分数升高一级

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel:number = 10, levelEle:number = 10) {
        this.maxLevel = maxLevel;
        this.upScore = levelEle;
        this.scoreEle = document.getElementById('sore-number')!;
        this.levelEle = document.getElementById('level-number')!;
    }

    //设置一个加分的方法
    addScore() {
        // this.score++;
        this.scoreEle.innerHTML = ++this.score + '';
        if(this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        // 等级高，snake移动速度快 需要限制
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }


}

// const ss = new ScorePasnel();
// for(let i=0; i<30; i++) {
//     ss.addScore();
// }

export default ScorePasnel;