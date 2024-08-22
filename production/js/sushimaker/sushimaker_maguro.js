class Maguro extends Sushimaker{
    constructor() {
        super('maguro', 200, 30);
        this.initImg();

        this.setRice(19);
        this.setBaran(4, 4);
        this.setBaran(5, 4);
        this.setBaran(18, 4);
        this.setBaran(19, 4);
        this.setBaran(32, 4);
        this.setBaran(33, 4);
        this.setBaran(4, 14);
        this.setBaran(5, 14);
        this.setBaran(16, 14);
        this.setBaran(17, 14);
        this.setBaran(25, 14);
        this.setBaran(26, 14);
        this.setBaran(8, 19);
        this.setBaran(9, 19);
        this.setBaran(35, 19);
        this.setBaran(36, 19);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`maguro${i}`));
    }
}