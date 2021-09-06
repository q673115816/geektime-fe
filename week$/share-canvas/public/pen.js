export default class Pen {
    constructor() {
        this.shape = {
            name: 'pen',
            list: []
        }
    }

    input(point) {
        this.shape.list.push(point)
    }


}