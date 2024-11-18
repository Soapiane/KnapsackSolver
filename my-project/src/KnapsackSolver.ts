class KnapsackSolver {

    private maxWeight: number;
    private values: number[];
    private weights: number[];
    private itemsNb: number;
    private memo: number[][];
    private slection: number[][][];


    constructor(maxWeight: number, values: number[], weights: number[]) {

        this.maxWeight = maxWeight;
        this.values = values;
        this.weights = weights;
        this.itemsNb = values.length;
        this.memo = new Array(values.length + 1).fill(undefined).map(() => new Array(this.maxWeight + 1).fill(0));
        this.slection = new Array(values.length + 1).fill(undefined).map(() => new Array(this.maxWeight + 1).fill(undefined).map(() => new Array(this.itemsNb).fill(0)));

    }



    solve(): any {
        for (let i = 1; i <= this.itemsNb; i++) {
            for (let w = 1; w <= this.maxWeight; w++) {

                if (w < this.weights[i - 1] && i > 0) {
                    this.memo[i][w] = this.memo[i - 1][w];
                    this.slection[i][w] = Array.from(this.slection[i - 1][w]);
                } else {
                    if (this.memo[i - 1][w] < this.values[i - 1] + this.memo[i - 1][w - this.weights[i - 1]]) {

                        this.slection[i][w] = Array.from(this.slection[i - 1][w - this.weights[i - 1]]);
                        this.slection[i][w][i - 1] = 1;
                        this.memo[i][w] = this.values[i - 1] + this.memo[i - 1][w - this.weights[i - 1]]
                    } else {

                        this.slection[i][w] = Array.from(this.slection[i - 1][w]);
                        this.memo[i][w] = this.memo[i - 1][w];
                    }
                    // this.memo[i][w] = Math.max(this.memo[i - 1][w], this.values[i - 1] + this.memo[i - 1][w - this.weights[i - 1]]);
                }
            }
        }
        return {
            maxValue: this.memo[this.itemsNb][this.maxWeight],
            selection: this.slection[this.itemsNb][this.maxWeight],
            weight: this.weights.reduce((acc, curr, i) => acc + curr * this.slection[this.itemsNb][this.maxWeight][i], 0)
        };
    }

}

export default KnapsackSolver;