export class Score {
    static score: number = 0;
    static highScore: number = 0;
    static titles: string[] = ["無名のケツ"];
    //スコアから称号を判定する
    static getTitle(score: number): string {
        let title: string = "";
        for (let i: number = 0; i < Score.titles.length; i++) {
            if (score < 300 * (i + 1)) {
                title = this.titles[i];
            }
        }
        if (title === "") {
            title = "神のケツ";
        }
        return title;
    }

    static getScoreText(): string {
        return "スコア：" + Score.score.toFixed(1) + "km";
    }
}